import React from 'react';
import classes from './MatchBasicDiv.module.css';
const MatchBasicDiv = props => {
    if(props.bottom) {
        return (
            <div className={classes.match__div}>
                <span className={classes.match__top}>{props.top}</span>
                <span className={classes.match__bottom}>{props.bottom}</span>
            </div>
        );
    }
    else {
        return (
            <div className={classes.match__div}>
                <span className={classes.match__top}>{props.top}</span>
            </div>
        );
    }

};

export default MatchBasicDiv;