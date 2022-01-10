import React, { useState } from 'react';
import classes from './PlayerSearch.module.css';

import SearchUser from '../../Shared/components/Input/SearchUser';
import Button from '../../Shared/components/Button/Button';

const PlayerSearch = () => {
    const [enteredPlatform, setEnteredPlatform] = useState('psn');
    const [enteredUsername, setEnteredUsername] = useState('');
    const onChangeSearchFields = (inputs) => {
        setEnteredPlatform((inputs.platform));
        setEnteredUsername(inputs.username);
    };

    const placeSubmitHandler = async event => { // TODO: In the future we should send req here.
        event.preventDefault();
        console.log("Will need to send http request here to the server and afterwards to re render the result with the History Hook");
        console.log(`Input In Search Form => username = ${enteredUsername}, platform = ${enteredPlatform}`);
    };



    return (
        <React.Fragment>
            <form className={classes.search_form} onSubmit={placeSubmitHandler}>
                <h2 className={classes.search_h2}>Search Player Profile</h2>
                <SearchUser updateSearchFields={onChangeSearchFields} />
                <Button type="submit" disabled={!enteredUsername} parentClass={classes.search_button}>
                    Search
                </Button>
            </form>
        </React.Fragment>
    );
};

export default PlayerSearch;