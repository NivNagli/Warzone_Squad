import React from 'react';
import classes from './MatchBasicDiv.module.css';
import Placement from './Placement';
import MatchDateAndMode from './MatchDateAndMode';
import MatchBasicInfo from './MatchBasicInfo';

const MatchBasicDiv = props => {
    const { teamPlacement, gameDate, mode, kdRatio, kills, deaths, damageDone, matchID, scorePerMinute } = props.data;
    const test = () => {
        alert(matchID);
    };
    return (
        <div className={classes.match__div} onClick={test}>
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
