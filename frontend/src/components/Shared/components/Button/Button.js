import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = props => {
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={classes.button + " " + props.parentClass}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={classes.button}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
