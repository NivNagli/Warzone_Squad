const mongoose = require('mongoose');
const axios = require('axios');
const warzoneUserUtils = require('../modelUtils/warzoneUserUtils');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true
    },

    platform : {
        type: String,
        required: true
    },

    lastGamesStats : {
        type : Object,
        required: true
    },

    generalStats : {
        type : Object,
        required: true
    },

    lastTimeUpdated : {
        type : Number,
        required: true
    }

});

userSchema.methods.updateStats = async function() {
    try {
        updatedStats = await this.getUpdatedStats();
        if(!updatedStats) return null;
        this.lastGamesStats = updatedStats.lastGamesStats
        this.generalStats = updatedStats.generalStats;
        return this.save();
    }

    catch(err) {
        console.log(`Failed to update the stats for the user ${this.username} in ${this.platform} platform in 'updateStats' method.`);
        console.log(err);
        return;
    }
};

userSchema.methods.getUpdatedStats = async function() {
    try {
        const configs = this.buildConfigs(this.username, this.platform);
        const playerDataRequestBarrier = [];
        playerDataRequestBarrier.push(axios(configs[0]));
        playerDataRequestBarrier.push(axios(configs[1]));
        const playerStats = await Promise.all(playerDataRequestBarrier);
        const updatedLastGamesArrayStats = warzoneUserUtils.updateUserStats(this, playerStats[0].data.data);
        if(!updatedLastGamesArrayStats) {
            return;
        }
        return {
            "lastGamesStats" : updatedLastGamesArrayStats,
            "generalStats" : playerStats[1].data.data
        };
    }
    catch(err) {
        console.log(`Failed to update the stats for the user ${this.username} in ${this.platform} platform in 'getUpdatedStats' method.`);
        console.log(err);
        return;
    }
};

userSchema.methods.buildConfigs = function(username, platform) {
    const configForLast20GamesStats =
    {
        method: 'get',
        url: `${process.env.API_PREFIX}/extract/lastGamesStats/${platform}/${username}`,
        headers: {}
    };

    const configForLifetimeAndWeeklyStats =
    {
        method: 'get',
        url: `${process.env.API_PREFIX}/extract/generalStats/${platform}/${username}`,
        headers: {}
    };
    return [configForLast20GamesStats, configForLifetimeAndWeeklyStats];
};

module.exports = mongoose.model('warzoneUser', userSchema);