import React from 'react';
import classes from './MatchBasicDiv.module.css';
import Placement from './Placement';
import MatchDateAndMode from './MatchDateAndMode';
import MatchBasicInfo from './MatchBasicInfo';

const MatchBasicDiv = props => {
    /* Basic div for display the general information about match, this component have a onClick handler that
     * will be used for redirect to the MatchResult page in case the user want to get more specific information about the match. */
    const { teamPlacement, gameDate, mode, kdRatio, kills, deaths, damageDone, matchID, scorePerMinute } = props.data;
    const gameSearch = () => {
        props.onSearch(matchID);
    };
    return (
        <div className={classes.match__div} onClick={gameSearch}>
            <Placement placement={teamPlacement}></Placement>
            <div className={classes.match__head_info}>
                <MatchDateAndMode mode={mode} date={gameDate}></MatchDateAndMode>
                <MatchBasicInfo top={"K/D"} bottom={kdRatio.toFixed(2)}></MatchBasicInfo>
                <MatchBasicInfo top={"Kills"} bottom={kills}></MatchBasicInfo>
            </div>
            <div className={classes.match__tail_info}>
                <MatchBasicInfo top={"Deaths"} bottom={deaths}></MatchBasicInfo>
                <MatchBasicInfo top={"damageDone"} bottom={damageDone}></MatchBasicInfo>
                <MatchBasicInfo top={"scorePerMinute"} bottom={scorePerMinute.toFixed(2)}></MatchBasicInfo>
            </div>

        </div>
    );

};

export default MatchBasicDiv;
