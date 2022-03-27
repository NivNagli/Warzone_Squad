import React from 'react';
import classes from './BenefitMessage.module.css';

const BenefitMessage = props => {
    return (
        <div className={classes.benefit_message__div}>
            <p className={classes.benefit_message__title}>&#9888; {props.title}</p>
            <p className={classes.benefit_message__main}>{props.message}</p>
            <p className={classes.benefit_message__main_sub}>{props.subMessage}</p>
        </div>
    );
};

export default BenefitMessage;

// to keep teams in the site system, which we take care of monitoring their information from the day they were created and therefore the information is based beyond the last 100 games
// &#9888; For registered users only