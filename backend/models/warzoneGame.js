const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    _id : {
        type: String,
        required: true
    },

    gameStats : {
        type : Object,
        required: true
    },

    signedUsers : [{
        type : Schema.Types.ObjectId,
        ref : 'warzoneUser'
    }]
});

module.exports = mongoose.model('warzoneGame', gameSchema);