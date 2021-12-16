const axios = require('axios');
const WarzoneUser = require('../models/warzoneUser');
const controllersUtils = require('./controllersUtils');

exports.getUser = async (req, res, next) => {
    const platform = req.params.platform;
    let username;
    if (platform === 'battle') {
        username = controllersUtils.fixBattleName(req.params.username);
    }
    else {
        username = req.params.username;
    }

    /* I have written down a description & possibleCause that will help us get around problems 
    according to the steps of the code */
    let description = "Failed to access the database";
    let possibleCause = "Check the DB status";

    /* pre-prepares the config structure in case we need to send request to get game stats
       from activision. */
    const configForLast100GamesStats =
    {
        method: 'get',
        url: `${process.env.API_PREFIX}/extract/lastGamesStats/${platform}/${username}/5`,
        headers: {}
    };

    const configForLifetimeAndWeeklyStats =
    {
        method: 'get',
        url: `${process.env.API_PREFIX}/extract/generalStats/${platform}/${username}`,
        headers: {}
    };

    try {
        const gameProfile = await WarzoneUser.findOne({ username: username, platform: platform });
        if (!gameProfile) {
            description = "Last Games extract failed";
            possibleCause = "check the username & platform and the extract controller";

            /* Im making promise 'barrier' in order to run the 2 requests in parallel */
            const playerDataRequestBarrier = [];
            playerDataRequestBarrier.push(axios(configForLast100GamesStats));
            playerDataRequestBarrier.push(axios(configForLifetimeAndWeeklyStats));
            const playerStats = await Promise.all(playerDataRequestBarrier);
            const last100GamesStatsArray = playerStats[0].data.data.gamesArray;
            const lifetimeAndWeeklyStats = playerStats[1].data.data;
            description = "Failed attempt to save the data in the database";
            possibleCause = "Check the DB status";
            const newGameProfile = new WarzoneUser({
                username: username,
                platform: platform,
                lastGamesStats: last100GamesStatsArray,
                generalStats: lifetimeAndWeeklyStats,
                lastTimeUpdated : new Date().getTime()
            });
            await newGameProfile.save();
            console.log("New game profile object created in the database");
            res.status(200).json({ lastGamesStats: last100GamesStatsArray, generalStats: lifetimeAndWeeklyStats});
        }
        else {
            res.status(200).json({ lastGamesStats: gameProfile.lastGamesStats, generalStats: gameProfile.generalStats });
        }
    }
    catch (err) {
        console.log("getUser controller method failed!");
        console.log(err);
        try {
            const errorCode = error.response.status;
            res.status(errorCode).json(controllersUtils.errorDescriptionBuilder(errorCode, description, possibleCause));
            return;
        }
        catch (error) {
            res.status(500).json(controllersUtils.errorDescriptionBuilder(500, description, possibleCause));
        }
    }
};