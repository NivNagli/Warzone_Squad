import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../Shared/components/Input/Input';
import Button from '../../Shared/components/Button/Button';
import PlatformSelector from '../../Shared/components/Input/PlatformSelector';
import classes from './Login.module.css';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../Shared/util/validators';
import { useForm } from '../../Shared/hooks/form-hook';

const LoginPage = () => {
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

  const placeSubmitHandler = async event => {
    event.preventDefault();
  };

  const selectChanged = (val) => {
    console.log(val.target.value);
  };

  return (
    <React.Fragment>
      <form className={classes.place_form} onSubmit={placeSubmitHandler}>
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
          errorText="Please enter a valid password (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="username"
          element="input"
          label="Platform Username"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid password (at least 5 characters)."
          onInput={inputHandler}
        />
        <PlatformSelector center={true} selectChanged={selectChanged} />
        <Button type="submit" disabled={!formState.isValid}>
          Signup
        </Button>
      </form>
    </React.Fragment>
  );
};

export default LoginPage;
