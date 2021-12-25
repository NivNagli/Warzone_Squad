import Input from '../Input/Input';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import React, { useEffect, useState } from 'react';
import classes from './SearchUser.module.css';
import OptionSelector from './OptionSelector';
const SearchUser = props => {
    const optionsValues = ["psn", "xbl", "battle"];
    const optionsDescriptions = ["Playstation", "Xbox", "Battle.net"];
    const [enteredPlatform, setEnteredPlatform] = useState('psn');

    const [formState, inputHandler] = useForm(
        {
            username: {
                value: '',
                isValid: false
            }
        },
        false
    );
    // TODO: לעבור על זה שוב ולראות שזה אכן מתאים למה שאני צריך ולרשום הערה לגבי מה שזה עושה
    useEffect(() => props.updateSearchFields({ username: formState.inputs.username.value, platform: enteredPlatform }), [enteredPlatform, formState.inputs.username.value, props]);
    const selectChanged = (val) => {
        /* TODO: I will need to update the state of that platform in the form where this component
         Will be because in the end we will want to send the most updated platform the user pick */
        setEnteredPlatform(val.target.value);
    };

    return (
        <React.Fragment>
            <div className={classes.searchUser_div}>
                <Input
                    id="username"
                    element="input"
                    label="Platform Username"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid username."
                    onInput={inputHandler}
                />
                <OptionSelector optionsValues={optionsValues} optionsDescriptions={optionsDescriptions} center={true} selectChanged={selectChanged} />
            </div>
        </React.Fragment>
    );
};

export default SearchUser;