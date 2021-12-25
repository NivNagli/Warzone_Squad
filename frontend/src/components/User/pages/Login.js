import React from 'react';


import Input from '../../Shared/components/Input/Input';
import Button from '../../Shared/components/Button/Button';
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
      }
    },
    false
  );

  const placeSubmitHandler = async event => {
    event.preventDefault();
    console.log("Will need to send http request here to the server and afterwards to re render the result with the History Hook");
    console.log(`Input In Login Form => E-Mail = ${formState.inputs.email.value}, Password = ${formState.inputs.password.value}`);
  };

  return (
    <React.Fragment>
      <form className={classes.login_form} onSubmit={placeSubmitHandler}>
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
        <div className={classes.div4button}>
          <Button type="submit" disabled={!formState.isValid} parentClass={classes.login_button}>
            Login
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginPage;
