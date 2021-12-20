import React from 'react';
import classes from './OptionSelector.module.css';
const OptionSelector = props => {
    const onChangeHandler = (event) => {
        props.selectChanged(event);
    }
    const options = [];
    if (props.optionsValues.length !== props.optionsDescriptions.length) {
        console.log("Must pass the same amount of values and descriptions!");
        return <p>
            Must pass same amount of values and descriptions!
        </p>
    }
    for(let i =0 ;i < props.optionsValues.length ; i++) {
        options.push(<option key={i} value={props.optionsValues[i]}>{props.optionsDescriptions[i]}</option>)
    }
    return (
        <React.Fragment>
            <div className={props.center ? classes.platform_div : ""}>
                <select className={classes.platform_select} onChange={onChangeHandler}>
                    {options}
                </select>
            </div>
        </React.Fragment>
    );
};

export default OptionSelector;