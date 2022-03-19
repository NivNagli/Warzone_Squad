import React from 'react';
import classes from './MatchList.module.css';
import MatchBasicDiv from './MatchBasicDiv';

const MatchList = props => {
    const matches = [];
    if (!props.numOfMatches) {
        // The case we didn't get the number of matches that need to be displayed.
        if (props.matches.length > 20) {
            for (let i = 0; i < 20; i++) {
                matches.push(<MatchBasicDiv data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
            }
        }
        else {
            for (let i = 0; i < props.matches.length; i++) {
                matches.push(<MatchBasicDiv data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
            }
        }
    }
    else {
        if (props.numOfMatches > props.matches.length) {
            for (let i = 0; i < props.matches.length; i++) {
                matches.push(<MatchBasicDiv data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
            }
        }
        else {
            for (let i = 0; i < props.numOfMatches; i++) {
                matches.push(<MatchBasicDiv data={props.matches[i]} key={props.matches[i].matchID}></MatchBasicDiv>);
            }
        }

    }
    return (
        <div className={classes.match__list}>
            <h2 className={classes.match_list_h2}> Last Games: </h2>
            {matches}
        </div>
    );
};

export default MatchList;