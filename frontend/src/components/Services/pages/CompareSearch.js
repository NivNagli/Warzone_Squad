import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classes from './CompareSearch.module.css';

// Components imports:
import SearchUser from '../../Shared/components/Input/SearchUser';
import Button from '../../Shared/components/Button/Button';
import OptionSelector from '../../Shared/components/Input/OptionSelector';
import LoadingSpinner from '../../Shared/components/UI/LoadingSpinner';
import ErrorMessage from '../../Shared/components/UI/ErrorMessage';

// custom and built-in hooks imports:
import { useHttpClient } from '../../Shared/hooks/http-hook';
import {playersCompareAttempt} from '../../../Middlewares/backend-requests';

const CompareSearch = () => {
    const [enteredPlatformUser1, setEnteredPlatformUser1] = useState('psn');
    const [enteredUsernameUser1, setEnteredUsernameUser1] = useState('');
    const onChangeSearchFieldsUser1 = (inputs) => {
        setEnteredPlatformUser1((inputs.platform));
        setEnteredUsernameUser1(inputs.username);
    };

    const [enteredPlatformUser2, setEnteredPlatformUser2] = useState('psn');
    const [enteredUsernameUser2, setEnteredUsernameUser2] = useState('');
    const onChangeSearchFieldsUser2 = (inputs) => {
        setEnteredPlatformUser2((inputs.platform));
        setEnteredUsernameUser2(inputs.username);
    };

    const [enteredPlatformUser3, setEnteredPlatformUser3] = useState('psn');
    const [enteredUsernameUser3, setEnteredUsernameUser3] = useState('');
    const onChangeSearchFieldsUser3 = (inputs) => {
        setEnteredPlatformUser3((inputs.platform));
        setEnteredUsernameUser3(inputs.username);
    };

    const [enteredPlatformUser4, setEnteredPlatformUser4] = useState('psn');
    const [enteredUsernameUser4, setEnteredUsernameUser4] = useState('');
    const onChangeSearchFieldsUser4 = (inputs) => {
        setEnteredPlatformUser4((inputs.platform));
        setEnteredUsernameUser4(inputs.username);
    };
    /* 4 potential users states for the search field results */
    // =================================================================

    const [whileSearch, setWhileSearch] = useState(false); // This state will prevent spamming from the user while searching
    let history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => { }, [error]);

    // options values for number of players select component.
    const optionsValues = [2, 3, 4];
    const optionsDescriptions = ["2 Players", "3 Players", "4 Players"];

    /* State that will hold the number of players select and afterwards a function who will responsible for update this state */
    const [enteredNumberOfPlayers, setEnteredNumberOfPlayers] = useState(2);
    const selectChanged = (val) => {
        setEnteredNumberOfPlayers(val.target.value);
    };

    /* Setting form validation state and also make a function inside useEffect for update the state condition */
    const [formIsValid, setFormIsValid] = useState(false);
    useEffect(() => {
        if (enteredNumberOfPlayers === 2 || enteredNumberOfPlayers === '2') {
            setFormIsValid(enteredUsernameUser1 && enteredUsernameUser2);
        }
        else if (enteredNumberOfPlayers === 3 || enteredNumberOfPlayers === '3') {
            setFormIsValid(enteredUsernameUser1 && enteredUsernameUser2 && enteredUsernameUser3);
        }

        else if (enteredNumberOfPlayers === 4 || enteredNumberOfPlayers === '4') {
            setFormIsValid(enteredUsernameUser1 && enteredUsernameUser2 && enteredUsernameUser3 && enteredUsernameUser4);
        }
        else {
            console.log("Invalid number of users entered!");
            setFormIsValid(false);
        }

    }, [enteredNumberOfPlayers, enteredUsernameUser1, enteredUsernameUser2, enteredUsernameUser3, enteredUsernameUser4]);

    const placeSubmitHandler = async event => { // TODO: In the future we should send req here.
        event.preventDefault();
        setWhileSearch(true); // Will set the search button into disabled
        let userFound = false;
        console.log("Will need to send http request here to the server and afterwards to re render the result with the History Hook");
        console.log(`Info By users : [1] : ${enteredUsernameUser1} ${enteredPlatformUser1} [2] : ${enteredUsernameUser2} ${enteredPlatformUser2} 
        [3] : ${enteredUsernameUser3} ${enteredPlatformUser3} [4] : ${enteredUsernameUser4} ${enteredPlatformUser4}`);

        try {
            const usernames = [enteredUsernameUser1, enteredUsernameUser2, enteredUsernameUser3, enteredUsernameUser4].slice(0, enteredNumberOfPlayers);
            const platforms = [enteredPlatformUser1, enteredPlatformUser2, enteredPlatformUser3, enteredPlatformUser4].slice(0, enteredNumberOfPlayers);
            const reqData = await playersCompareAttempt(usernames, platforms, sendRequest);
            console.log(reqData); // TODO: Delete this print while finalizing.
            if(reqData) {
                userFound = true;
                userFound = 
                clearError();
                setWhileSearch(false);
                console.log(reqData);
                // history.push({
                //     pathname:`/playerSearch/${enteredUsername}/${enteredPlatform}`,
                //     state : {username : enteredUsername, platform : enteredPlatform}
                // });
            }
        }
        catch (e) {
            console.log(`Some unknown error occurred in search page, err = ${e}`);
        }
        if(!userFound) {
            setWhileSearch(false);
        };

    };

    const playersDataArray = [
        <SearchUser updateSearchFields={onChangeSearchFieldsUser1} key="User1FromCompare" />,
        <SearchUser updateSearchFields={onChangeSearchFieldsUser2} key="User2FromCompare" />,
        <SearchUser updateSearchFields={onChangeSearchFieldsUser3} key="User3FromCompare" />,
        <SearchUser updateSearchFields={onChangeSearchFieldsUser4} key="User4FromCompare" />
    ]
    return (
        <React.Fragment>
            {error && <ErrorMessage error={error} />}
            <form className={classes.compare_form} onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}

                <div className={classes.players_select_div}>
                    <h3 className={classes.compare_header}>Select Number Of Players</h3>
                    <OptionSelector optionsValues={optionsValues} optionsDescriptions={optionsDescriptions} center={true} selectChanged={selectChanged} />
                </div>
                {playersDataArray.slice(0, enteredNumberOfPlayers)}
                <div className={classes.div4button}>
                    <Button type="submit" disabled={!formIsValid || whileSearch} parentClass={classes.compare_button}>
                        Compare
                    </Button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default CompareSearch;