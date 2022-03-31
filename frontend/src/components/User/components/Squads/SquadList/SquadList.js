import React, { useEffect } from 'react';
import classes from './SquadList.module.css';
import SquadBasicDiv from './SquadBasicDiv';
import AddSquadButton from '../AddSquadButton';

const SquadList = props => {
    /* As the name sound like this component will be a div that contain list of Squades, for each Squad 
     * we send a async function that send a get request to the server and search for the Squad information
     * in case we found that Squad we redirect to the SquadResult page of that Squad. */
    if (!props.squadsArray.length) {
        return (
            <div className={classes.squad__list}>
                <h2 className={classes.squad_list_h2}> {"You don't have any squads yet."} </h2>
            </div>
        );
    }
    else {
        const Squads = [];
        for (let i = 0; i < props.squadsArray.length; i++) {
            Squads.push(<SquadBasicDiv data={props.squadsArray[i]} key={props.squadsArray[i].SquadName}></SquadBasicDiv>);
        }
        return (
            <div className={classes.squad__list}>
                <h2 className={classes.squad_list_h2}> {props.squadListHeader} </h2>
                {Squads}
                <div className={classes.squad__add}>
                    <AddSquadButton token={props.token}></AddSquadButton>
                </div>
            </div>
        );
    }
};

export default SquadList;