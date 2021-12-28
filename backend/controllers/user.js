const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const User = require('../models/user');
const gameProfile = require('../models/warzoneUser');

exports.signup = async (req, res, next) => {
    /* First we will check if we received errors from the route with the help of express-validator third party package */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }
    req.body.username = req.body.username.toLowerCase();
    const { email, password, username, platform } = req.body;


    /* Check if there is already a existing user for this email address */
    let checkForExistingUser;
    try {
        checkForExistingUser = await User.findOne({ email: email });
    }
    catch (err) {
        console.log(err);
        const error = new HttpError(
            'Signing up failed, please try again later1.',
            500
        );
        return next(error);
    }

    if (checkForExistingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    /* Try to create the new user after all the checks process are done and valid. */

    // I'm going to create hash value from the password in order to not expose the original passwords in case of a leak in the database ... 
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch (err) {
        const error = new HttpError('Failed to create a new user, please try again', 500);
        next(error);
    }

    /* 
        Now I'm going to check if someone already searched for this user in our site and if so i will use the existing game profile from the
        database, or create a new game profile if not found one in the database.
    */

    let existingProfile;
    try {
        existingProfile = await gameProfile.findOne({ username: username, platform: platform });
    }
    catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        console.log(err);
        return next(error);
    }

    /* The case we dont have existing profile in the database i will create a new one and save him */
    if (!existingProfile) {
        let newGameProfileID;
        try {
            const newGameProfileID = await createAndSaveNewGameProfile(username, platform);
            const createdUser = new User({
                email,
                password: hashedPassword,
                username,
                platform,
                gameProfile: newGameProfileID
            });
            await createdUser.save();
            const token = jwt.sign(
                { userId: createdUser.id, email: createdUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );
            console.log("New user in the site just created and saved in the database.");
            res
                .status(201)
                .json({ userId: createdUser.id, gameProfileId: newGameProfileID, token: token });
            return;
        }
        catch (err) {
            console.log(err);
            let description = 'Signing up failed, please make sure that the username and platform are belongs to a public profile at activision website.';
            if (newGameProfileID) {  // The case we succeed to create a new game profile but fail to save him / create the jwt token.
                description = 'Signing up failed, please try again later.';
            }
            const error = new HttpError(description, 500);
            return next(error);
        }
    }
    /* The case we already have a game profile with the information that we received from the user */
    else {
        try {
            const createdUser = new User({
                email,
                password: hashedPassword,
                username,
                platform,
                gameProfile: existingProfile.id
            });
            await createdUser.save();
            const token = jwt.sign(
                { userId: createdUser.id, email: createdUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );
            console.log("New user in the site just created and saved in the database.");
            res
                .status(201)
                .json({ userId: createdUser.id, gameProfileId: existingProfile.id, token: token });
            return;

        }
        catch (err) {
            console.log(err);
            const error = new HttpError(
                'Signing up failed, please try again later.',
                500
            );
            return next(error);
        }

    }

};

const createAndSaveNewGameProfile = async (username, platform) => {
    /* 
    This method will get username and platform, and will use our api with request to the 'profile' route and will try to create a new profile.
    in case of successful creation, we will return the new profile ID to save him into the user's account, in case of failure, we will catch the
    error in the place this method was called.
    */
    const configForCreateUser =
    {
        method: 'get',
        url: `${process.env.API_PREFIX}/profile/username/${username}/platform/${platform}`,
        headers: {}
    };
    let createProfileResult;
    createProfileResult = await axios(configForCreateUser);
    return createProfileResult.data.profileID;
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    };

    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        const error = new HttpError("Logging in failed, please try again later.", 500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError("Invalid credentials, could not log you in.", 403);
        return next(error);
    }

    let passwordIsValid = false;
    try {
        passwordIsValid = await bcrypt.compare(password, existingUser.password);
    }
    catch (err) {
        const error = new HttpError("Logging in failed, please check your credentials and try again.");
        return next(error);
    }

    if (!passwordIsValid) {
        const error = new HttpError("Invalid credentials, could not log you in.", 403);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
    }
    catch (err) {
        const error = new HttpError("Logging in failed, please try again later.", 500);
        return next(error);
    }
    console.log("Login succeed!");
    res
    .status(200)
    .json({ userId: existingUser.id, gameProfileId: existingUser.gameProfile, token: token });
};