import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { Redirect } from 'react-router-dom'
import { playerSearchAttempt } from '../../../Middlewares/backend-requests';
import GeneralStatsTable from '../../Shared/components/Tables/GeneralStatsTable';
import PlayerBasicInfo from '../../Shared/components/PlayersInfo/PlayerBasicInfo';
import { lifeTimeFilter, allWeeklyFilter } from '../../Shared/util/dataFilters';
import MatchList from '../../Shared/components/MatchInfo/MatchList';

const PlayerSearchResult = (props) => {
    let userDataFound; // Flag that will help to determine when the user data is loaded.
    const location = useLocation(); // Will use the useLocation hook, to get the state that include the input we got from the player search component.
    const [userFound, setUserFound] = useState(false);  // Another flag that will operate as boolean flag to determine that the user data is loaded
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [userData, setData] = useState(null);  // This is the variable which will hold the response from our database for the user search.

    useEffect(() => {
    }, [userDataFound]);  // This useEffect will monitor the userDataFound flag and will re-render the page when he change.

    if (!location.state) {  // If we didn't came from the 'PlayerSearch' component we need to redirect.
        return <Redirect to='/' />
    }
    const getUserData = async () => {
        // Async function that will send a get request to the database with the user information.
        try {
            const reqData = await playerSearchAttempt(location.state.username, location.state.platform, sendRequest);
            if (reqData) {
                clearError();
                setData(reqData);
                return 1;
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in search result page, err = ${e}`);
        }

    };

    if (!userFound) {
        // In case the user is not found yet we need to send request to the database.
        userDataFound = getUserData();
        if (userDataFound) {
            setUserFound(true);
        }
    }

    if (!userData) {
        // The case we didn't receive yet the user information.
        return <div></div>;
    }
    else {
        // First we will filter the information first the 'all time' information and then the 'weekly' in case he exists.
        const filteredLifetimeStats = lifeTimeFilter(userData.data.generalStats.br_lifetime_data);
        let filteredWeeklyStats;
        if (userData.data.generalStats.weeklyStats) {
            if (userData.data.generalStats.weeklyStats.all) {
                filteredWeeklyStats = allWeeklyFilter(userData.data.generalStats.weeklyStats.all);
            }
        }
        if (filteredWeeklyStats) {
            // Display with the weekly state, in case they are exists.
            return (
                <React.Fragment>
                    <PlayerBasicInfo name={location.state.username}></PlayerBasicInfo>
                    <GeneralStatsTable header={"Lifetime Stats"} data={filteredLifetimeStats}></GeneralStatsTable>
                    <GeneralStatsTable header={"Weekly Stats"} data={filteredWeeklyStats}></GeneralStatsTable>
                    <MatchList matches={userData.data.lastGamesStats} numOfMatches={20}></MatchList>
                </React.Fragment>
            );
        }
        else {
            // The case the player did not play in this week.
            return (
                <React.Fragment>
                    <PlayerBasicInfo name={location.state.username}></PlayerBasicInfo>
                    <GeneralStatsTable header={"Lifetime Stats"} data={filteredLifetimeStats}></GeneralStatsTable>
                    <MatchList matches={userData.data.lastGamesStats} numOfMatches={20}></MatchList>
                </React.Fragment>
            );
        }
    }
};

export default PlayerSearchResult;
