import React, { useState, useEffect } from 'react';
import className from './PlayerSearchResult.module.css';
import { useLocation } from "react-router-dom";
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { useHistory } from "react-router-dom";
import ErrorMessage from '../../Shared/components/UI/ErrorMessage';
import { Redirect } from 'react-router-dom'
import { playerSearchAttempt } from '../../../Middlewares/backend-requests';
import GeneralStatsTable from '../../Shared/components/Tables/GeneralStatsTable';
import PlayerBasicInfo from '../../Shared/components/PlayersInfo/PlayerBasicInfo';
import { lifeTimeFilter, allWeeklyFilter } from '../../Shared/util/dataFilters';


const PlayerSearchResult = (props) => {
    let test;
    const location = useLocation();
    const [userFound, setUserFound] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [userData, setData] = useState(null);
    useEffect(() => {
    }, [test])

    if (!location.state) {
        return <Redirect to='/' />
    }
    const getUserData = async () => {
        try {
            const reqData = await playerSearchAttempt(location.state.username, location.state.platform, sendRequest);
            if (reqData) {
                clearError();
                console.log("RAGA");
                console.log(reqData);
                setData(reqData);
                return 1;
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in search result page, err = ${e}`);
        }

    };

    if (!userFound) {
        test = getUserData();
        if (test) {
            setUserFound(true);
        }
    }
    // let test = getUserData();
    console.log(location.state.username + " " + location.state.platform);
    console.log(`Test = ${test}`);
    if (!userData) {
        return <div></div>;
    }
    else {
        const filteredLifetimeStats = lifeTimeFilter(userData.data.generalStats.br_lifetime_data);
        let filteredWeeklyStats;
        if(userData.data.generalStats.weeklyStats) {
            console.log("A");
            if(userData.data.generalStats.weeklyStats.all){
                console.log("Aa");
                filteredWeeklyStats = allWeeklyFilter(userData.data.generalStats.weeklyStats.all);
            }
        }
        console.log(`gaga : ${userData.data.generalStats.br_lifetime_data}`);
        if(filteredWeeklyStats) {
            return (
                <React.Fragment>
                    <PlayerBasicInfo name={location.state.username}></PlayerBasicInfo>
                    <GeneralStatsTable header={"Lifetime Stats"} data={filteredLifetimeStats}></GeneralStatsTable>
                    <GeneralStatsTable header={"Weekly Stats"} data={filteredWeeklyStats}></GeneralStatsTable>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <GeneralStatsTable header={"Lifetime Stats"} data={filteredLifetimeStats}></GeneralStatsTable>
                </React.Fragment>
            );
        }
    }
    // return (
    //     <React.Fragment>
    //         {error && <ErrorMessage error={error} />}
    //     </React.Fragment>
    // );
};

export default PlayerSearchResult;

    // const playerSearchAttempt = async (username, platform) => { //TODO: Delete this when finalizing, this was made before the "backend-request" middleware.
    //     try {
    //         /* Using our http custom hook in order to send the request and update the 'isLoading', 'error'
    //          * States that the hook produce for us */
    //         let url = `${API_PREFIX}/profile/username/${username}/platform/${platform}`;
    //         if(platform === 'battle') {
    //             url = makeBattleUrl(username);
    //         };
    //         const responseData = await sendRequest(
    //             url, // URL
    //             'GET', // METHOD
    //             { // BODY
    //             },
    //             { // HEADERS
    //             },
    //             "Searched Failed, Check username and platform and try again, [SPP]." // DEFAULT ERROR MSG SPP = server problem possibility.
    //         );
    //         return responseData; // The case the user enter valid credentials.
    //     }
    //     catch (e) {
    //         console.log(`err__login = ${e}`); // The case the user entered invalid credentials / server problem.
    //         return null;
    //     }
    // };
