import React, { useState } from 'react';

import Input from '../../Shared/components/Input/Input';
import Button from '../../Shared/components/Button/Button';
import classes from './Signup.module.css';
import OptionSelector from '../../Shared/components/Input/OptionSelector';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';

const Signup = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
      password_verification: {
        value: '',
        isValid: false
      },
      username: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const [enteredPlatform, setEnteredPlatform] = useState('psn');

  const placeSubmitHandler = async event => { // TODO: In the future we should send req here.
    event.preventDefault();
    console.log(`FROM SignUp Submit : Entered inputs = ${formState.inputs.username.value} Entered Platform = ${enteredPlatform}`);
  };

  const selectChanged = (val) => {// TODO: will need that to send the correct platform.
    setEnteredPlatform(val.target.value);
  };
  
  const optionsValues = ["psn", "xbl", "battle"];
  const optionsDescriptions = ["Playstation", "Xbox", "Battle.net"];

  return (
    <React.Fragment>
      <form className={classes.signup_form} onSubmit={placeSubmitHandler}>
        <Input
          id="email"
          element="input"
          type="text"
          label="E-Mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid e-mail."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          label="Password"
          type="password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="password_verification"
          element="input"
          label="Password Verification"
          type="password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="The password is not identical."
          onInput={inputHandler}
          compareVal={formState.inputs.password.value}
        />
        <Input
          id="username"
          element="input"
          label="Platform Username"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid username."
          onInput={inputHandler}
        />
        <OptionSelector optionsValues={optionsValues} optionsDescriptions={optionsDescriptions} center={true} selectChanged={selectChanged}/>
        <Button type="submit" disabled={!formState.isValid}>
          Signup
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Signup;
