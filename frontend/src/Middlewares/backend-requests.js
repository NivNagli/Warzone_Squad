import API_PREFIX from '../sharedUrls';

/* As the name sounds like this is where all the requests protocol will be written in order to avoid
 * unnecessary re writing the same request protocol twice. */

const makeBattleUrl = (username) => {
    let splittedUsername = username.split('#');
    if (splittedUsername.length === 2) {
        return `${API_PREFIX}/profile/username/${splittedUsername[0] + "%2523" + splittedUsername[1]}/platform/battle`;
    };
    // The case someone enter invalid username.
    return `${API_PREFIX}/profile/username/${"invalidTemplate" + "%2523" + "YouDontDeserveTheSearch"}/platform/battle`;
};

const makeBattleUsername = (username) => {
    let splittedUsername = username.split('#');
    if (splittedUsername.length === 2) {
        return `${splittedUsername[0] + "%2523" + splittedUsername[1]}`;
    };
    return "InvalidUserName";
}

export const signupAttempt = async (email, password, username, platform, sendRequest) => {
    /* This method will serve use to send request to the server and will handle the response
     * accordingly. */
    try {
        let fixedUsername = username;
        if (platform === 'battle') {
            fixedUsername = makeBattleUsername(username);
        }
        const responseData = await sendRequest(
            `${API_PREFIX}/user/signup`, // URL
            'POST', // METHOD
            { // BODY
                email: email,
                password: password,
                username: fixedUsername,
                platform: platform
            },
            { // HEADERS
            },
            "Signup Failed, Check credentials and try again, [SPP]." // DEFAULT ERROR MSG SPP = server problem possibility.
        );
        return responseData; // The case the user enter valid credentials.
    }
    catch (e) {
        console.log(`err__login = ${e}`); // The case the user entered invalid credentials / server problem.
        return null;
    }
};

export const playerSearchAttempt = async (username, platform, sendRequest) => {
    try {
        /* Using our http custom hook in order to send the request and update the 'isLoading', 'error'
         * States that the hook produce for us */
        let url = `${API_PREFIX}/profile/username/${username}/platform/${platform}`;
        if (platform === 'battle') {
            url = makeBattleUrl(username);
        };
        const responseData = await sendRequest(
            url, // URL
            'GET', // METHOD
            { // BODY
            },
            { // HEADERS
            },
            "Searched Failed, Check username and platform and try again, [SPP]." // DEFAULT ERROR MSG SPP = server problem possibility.
        );
        return responseData; // The case the user enter valid credentials.
    }
    catch (e) {
        console.log(`err__login = ${e}`); // The case the user entered invalid credentials / server problem.
        return null;
    }
};

const fixBattleUsernames = (usernames, platforms) => {
    platforms.forEach((platform, index) => {
        if (platform === 'battle') {
            usernames[index] = makeBattleUsername(usernames[index]);
        }
    });
};

export const playersCompareAttempt = async (usernames, platforms, sendRequest) => {
    try {
        const usernamesCopy = [...usernames]; // In order not to effect the original users array. 
        fixBattleUsernames(usernamesCopy, platforms);
        const url = `${API_PREFIX}/squad/compare`;
        const reqBody = {
            usernames: usernamesCopy,
            platforms: platforms
        };
        const responseData = await sendRequest(
            url, // URL
            'POST', // METHOD
            reqBody,
            { // HEADERS
            },
            "Compare Failed, Check usernames and platforms and try again, [SPP]." // DEFAULT ERROR MSG SPP = server problem possibility.
        );
        return responseData; // The case the user enter valid credentials.
    }
    catch (e) {
        console.log(`err__login = ${e}`); // The case the user entered invalid credentials / server problem.
        return null;
    }
};

export const matchSearchAttempt = async (matchID, sendRequest) => {
    try {
        const url = `${API_PREFIX}/match/${matchID}`;
        const reqBody = {};
        const responseData = await sendRequest(
            url, // URL
            'GET', // METHOD
            reqBody,
            { // HEADERS
            },
            "Failed to find the game data, Please try again, [SPP]." // DEFAULT ERROR MSG SPP = server problem possibility.
        );
        return responseData; // The case the user enter valid credentials.
    }
    catch (e) {
        console.log(`err__login = ${e}`); // The case the user entered invalid credentials / server problem.
        return null;
    }
};

export const getUserData = async (token, sendRequest) => {
    try {
        const url = `${API_PREFIX}/user/get-user-data`;
        const reqBody = {};
        const responseData = await sendRequest(
            url, // URL
            'GET', // METHOD
            reqBody,
            { // HEADERS
                Authorization: 'Bearer ' + token
            },
            "Failed to find the player profile, Please try again, [SPP]." // DEFAULT ERROR MSG SPP = server problem possibility.
        );
        return responseData; // The case the user enter valid credentials.
    }
    catch (e) {
        console.log(`err__login = ${e}`); // The case the user entered invalid credentials / server problem.
        return null;
    }
};

export const addSquad = async (token, usernames, platforms, squadName, sendRequest) => {
    try {
        const usernamesCopy = [...usernames]; // In order not to effect the original users array. 
        fixBattleUsernames(usernamesCopy, platforms);
        const url = `${API_PREFIX}/user/add-squad`;
        const reqBody = {
            usernames: usernamesCopy,
            platforms: platforms,
            squadName: squadName
        };
        const responseData = await sendRequest(
            url, // URL
            'POST', // METHOD
            reqBody,
            { // HEADERS
                Authorization: 'Bearer ' + token
            },
            "Failed to add the squad, Please try again, [SPP]." // DEFAULT ERROR MSG SPP = server problem possibility.
        );
        return responseData; // The case the user enter valid credentials.
    }
    catch (e) {
        console.log(`err__login = ${e}`); // The case the user entered invalid credentials / server problem.
        return null;
    }
};

