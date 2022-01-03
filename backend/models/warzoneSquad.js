const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const squadSchema = new Schema({
    /*
     * In order to not to create identical squads in the database i will edit the 'id' field which will contain the squad teammates with their
     * game profile id's from the database sorted in alphabetical order and we will use the chained string of their id's as the squad id.
     */
    _id : {
        type: String,
        required: true
    },

    // An array which will contain the stats after we sorted them according to the shared games only for the squad members
    playersSharedGamesStats : [{
        type : Object,
        required : true
    }],

    // This will hold the general stats for each game which include : gameID, placement, squad total kills at that game. 
    sharedGamesGeneralStats : [{
        type: Object,
        required : true
    }],

    // Will use this field to check if we need to try update the squad stats.
    lastTimeUpdated : {
        type : Number,
        required: true
    }
});

module.exports = mongoose.model('warzoneSquad', squadSchema);