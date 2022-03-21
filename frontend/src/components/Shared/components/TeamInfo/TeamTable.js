import React from 'react';
import './TeamTable.css';

const TeamTable = props => {
    const tableHead = theadBuilder(props.playersData[0], props.wantedStats);
    const tableBody = tbodyBuilder(props.playersData, props.wantedStats);
    console.log("RADDIDIDID");
    console.log(props.playersData);
    return (
        <div class="teamTable">
            <table>
                {tableHead}
                {tableBody}
            </table>
        </div>

    );
};
export default TeamTable;

const theadBuilder = (playerData, wantedStats) => {
    const ths = [];
    ths.push(<th class="placement"></th>);
    ths.push(<th class="gamerTag">Username</th>);
    for (const [key, value] of Object.entries(playerData)) {
        if (key !== 'username' && wantedStats.includes(key)) {
            ths.push(<th class="cellValue">{key}</th>);
        };
    };
    return (
        <thead>
            <tr>
                {ths}
            </tr>
        </thead>
    );
};

const tbodyBuilder = (playersData, wantedStats) => {
    const trArray = [];
    playersData.forEach((playerData, index) => {
        trArray.push(trBuilderForTableBody(playerData, index, wantedStats));
    });
    return (
        <tbody>
            {trArray}
        </tbody>
    );
};

const trBuilderForTableBody = (dataObj, index, wantedStats) => {
    const tds = [];
    tds.push(<td class="placement">{index+1}</td>);
    tds.push(<td class="gamerTag">{dataObj.username}</td>);
    for (const [key, value] of Object.entries(dataObj)) {
        if (key !== 'username' && wantedStats.includes(key)) {
            tds.push(<td class="cellValue">{value}</td>);
        };
    };
    return (
        <tr>
            {tds}
        </tr>
    );
};


