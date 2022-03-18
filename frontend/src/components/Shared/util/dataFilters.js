/* This file will contain filters functions that will be applied on specific data sources */

export const lifeTimeFilter = dataObj => {
    const wantedData = ["wins", "kills", "kdRatio", "downs", "topTwentyFive", "topTen", "revives", "topFive", "timePlayed", "gamesPlayed", "scorePerMinute", "deaths"];
    const toFixed = ["kdRatio", "scorePerMinute"];
    const res = {};
    for (const [key, value] of Object.entries(dataObj)) {
        if(wantedData.includes(key)) {
            if(toFixed.includes(key)) {
                res[[key]] = value.toFixed(2);
            }
            else if(key === "timePlayed") {
                let timeInDays = Math.floor((value / (3600 * 24)));
                let timeInHours = Math.floor((((value / (3600 * 24)) - timeInDays) * 24));
                timeInDays = timeInDays.toFixed(0);
                res[[key]] = `${timeInDays} Days ${timeInHours} Hours`;
            }
            else {
                res[[key]] = value;
            }
        }
    }
    return res;
};

export const allWeeklyFilter = dataObj => {
    const wantedData = ["kills", "kdRatio", "killsPerGame", "avgLifeTime", "damageDone", "damageTaken", "distanceTraveled", "timePlayed", "matchesPlayed", "scorePerMinute", "deaths", "assists"];
    const toFixed = ["kdRatio", "scorePerMinute", "headshotPercentage", "killsPerGame", "distanceTraveled", "avgLifeTime"];
    const res = {};
    for (const [key, value] of Object.entries(dataObj)) {
        if(wantedData.includes(key)) {
            if(toFixed.includes(key)) {
                res[[key]] = value.toFixed(2);
            }
            else if(key === "timePlayed") {
                let timeInDays = Math.floor((value / (3600 * 24)));
                let timeInHours = Math.floor((((value / (3600 * 24)) - timeInDays) * 24));
                timeInDays = timeInDays.toFixed(0);
                res[[key]] = `${timeInDays} Days ${timeInHours} Hours`;
            }
            else {
                res[[key]] = value;
            }
        }
    }
    return res;
};