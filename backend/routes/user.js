const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user');

router.post(
    '/signup',

    [
        check('email')
        .normalizeEmail()
        .isEmail(),

        check('password')
        .isLength({min : 5}),

        check('username')
        .isLength({min : 1}),

        check('platform')
        .isLength({min : 1})
    ],

    userController.signup
);

router.post(
    '/login',

    [
        check('email')
        .normalizeEmail()
        .isEmail(),

        check('password')
        .isLength({min : 5})
    ],

    userController.login
);

router.post(
    '/add-squad',

    [
        check('usernames')
        .not()
        .isEmpty(),

        check('platforms')
        .not()
        .isEmpty(),

        check('userID')
        .isLength({min : 1})
    ],

    userController.addSquad
);

module.exports = router;