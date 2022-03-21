import React, { useState, useEffect } from 'react';
import className from './PlayerSearchResult.module.css';
import { useLocation } from "react-router-dom";
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { useHistory } from "react-router-dom";
import ErrorMessage from '../../Shared/components/UI/ErrorMessage';
import { Redirect } from 'react-router-dom'
import { matchSearchAttempt } from '../../../Middlewares/backend-requests';
import TeamTable from '../../Shared/components/TeamInfo/TeamTable';
import LoadingSpinner from '../../Shared/components/UI/LoadingSpinner';

const MatchSearchResult = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => { }, [error]);
    let history = useHistory();
    let matchFlag;
    const location = useLocation();
    const [matchFound, setMatchFound] = useState(false);
    const [matchData, setData] = useState(null);
    useEffect(() => {
    }, [matchFlag])

    if (!location.state) {
        return <Redirect to='/' />
    }
    const getMatchData = async () => {
        try {
            const reqData = await matchSearchAttempt(location.state.matchID, sendRequest);
            if (reqData) {
                clearError();
                console.log("BOBO");
                console.log(reqData);
                setData(reqData);
                return 1;
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in search result page, err = ${e}`);
        }

    };

    if (!matchFound) {
        matchFlag = getMatchData();
        if (matchFlag) {
            setMatchFound(true);
        }
    }
    if (!matchData) {
        return <div></div>;
    }
    else {
        const teams = [];
        matchData.data.matchStats.forEach(dataObj => {
            teams.push(<TeamTable playersData={dataObj} wantedStats={["kills", "deaths"]}></TeamTable>)
        });
        return (
            <React.Fragment>
                {isLoading && <LoadingSpinner asOverlay />}
                {error && <ErrorMessage error={error} />}
                {teams}
            </React.Fragment>
        );
    }
};

export default MatchSearchResult;