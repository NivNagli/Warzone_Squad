import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classes from './PlayerSearch.module.css';

// Components imports:
import SearchUser from '../../Shared/components/Input/SearchUser';
import Button from '../../Shared/components/Button/Button';
import LoadingSpinner from '../../Shared/components/UI/LoadingSpinner';
import ErrorMessage from '../../Shared/components/UI/ErrorMessage';

// custom and built-in hooks imports:
import { useHttpClient } from '../../Shared/hooks/http-hook';
import {playerSearchAttempt} from '../../../Middlewares/backend-requests'; 

// The component:
const PlayerSearch = () => {
    // States for the player-name and platform & onChange method implementation.
    const [enteredPlatform, setEnteredPlatform] = useState('psn');
    const [enteredUsername, setEnteredUsername] = useState('');
    const [whileSearch, setWhileSearch] = useState(false); // This state will prevent spamming from the user while searching
    let history = useHistory();
    const onChangeSearchFields = (inputs) => {
        setEnteredPlatform((inputs.platform));
        setEnteredUsername(inputs.username);
    };
    // This 4 variables will serve us to handle the search attempt.
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => { }, [error]);

    const searchSubmitHandler = async event => {
        event.preventDefault();
        setWhileSearch(true); // Will set the search button into disabled
        let userFound = false;
        try {
            const reqData = await playerSearchAttempt(enteredUsername, enteredPlatform, sendRequest);
            if(reqData) {
                userFound = true;
                clearError();
                setWhileSearch(false);
                history.push({
                    pathname:`/playerSearch/${enteredUsername}/${enteredPlatform}`,
                    state : {username : enteredUsername, platform : enteredPlatform}
                });
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in search page, err = ${e}`);
        }
        if(!userFound) {
            setWhileSearch(false);
        };
       
    };

    return (
        <React.Fragment>
            {error && <ErrorMessage error={error} />}
            <form className={classes.search_form} onSubmit={searchSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                
                <h2 className={classes.search_h2}>Search Player Profile</h2>
                <SearchUser updateSearchFields={onChangeSearchFields} />
                <Button type="submit" disabled={!enteredUsername || whileSearch} parentClass={classes.search_button}>
                    Search
                </Button>
            </form>
        </React.Fragment>
    );
};

export default PlayerSearch;