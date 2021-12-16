const mongoose = require('mongoose');
const WarzoneUser = require('../models/warzoneUser');

exports.updateUsersData = async () => {
    /************************************************************************************************
     * This method will try to update all the warzone profiles in the database that did not attempt to update their data, in a specific time window that we will define here.
     * In order for all requests to be processed simultaneously to improve efficiency I use here 'request barrier' aka 'usersUpdateRequestsBarrier' 
     * that we will release once all requests are ready to be sent.
    /************************************************************************************************/
    const updateIntervalInMilSec = 900000;
    const nextUpdateWindowTime = new Date().getTime() - updateIntervalInMilSec;
    const usersUpdateRequestsBarrier = [];
    const usersDbCursor = await WarzoneUser.find({"lastTimeUpdated" : {$lt: nextUpdateWindowTime}});
    let numOfUsersUpdateAttempts = 0;
    usersDbCursor.forEach(user => {
        user.lastTimeUpdated = new Date().getTime();
        usersUpdateRequestsBarrier.push(user.updateStats());
        numOfUsersUpdateAttempts++;
        if (new Date().getTime() - user.lastTimeUpdated > updateIntervalInMilSec) {
            console.log("Need to fix the update interval because we should not be here!");
        }
    });
    const releaseBarrier = Promise.all(usersUpdateRequestsBarrier);
    console.log(`an update attempt as been done for ${numOfUsersUpdateAttempts} users.`);
};