exports.updateUserStats = (user, last20GamesStats) => {
    const possibleNewGamesArray = updateGamesArray(user, last20GamesStats);
    console.log("Trying to update with new games.");
    if (!possibleNewGamesArray) {  // the case we dont need to update maybe we can avoid him before ?
        console.log("Should not update");
        return;
    }
    const updatedLastGamesArray = possibleNewGamesArray.concat(user.lastGamesStats);
    console.log("Should be updated");
    if(updatedLastGamesArray.length > 100 ) {
        return updatedLastGamesArray.slice(0, 100);
    }
    return updatedLastGamesArray;
};


// last20Games need to be "gamesArray" from the axios request.
const updateGamesArray = (user, last20GamesStats) => {
    const lastGameFromLast20SavedArray = user.lastGamesStats[0];
    lastSavedGameDateInUtc = new Date(lastGameFromLast20SavedArray.gameDate).getTime();
    if (new Date(last20GamesStats.gamesArray[0].gameDate).getTime() === lastSavedGameDateInUtc) {
        return null;
    }
    const newGamesArray = findNewGames(lastSavedGameDateInUtc, last20GamesStats.gamesArray);
    return newGamesArray;
};

const findNewGames = (lastSavedGameDateInUtc, newLastGamesArray) => {
    const result = [];
    newLastGamesArray.forEach((game) => {
        if (new Date(game.gameDate).getTime() > lastSavedGameDateInUtc) {
            result.push(game);
        }
        else {
            return result;
        }
    });
    return result;

};