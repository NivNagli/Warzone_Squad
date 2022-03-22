import React from 'react';
import './TeamTable.css';

const TeamTable = props => {
    const tableHead = theadBuilder(props.playersData[0], props.wantedStats);
    const tableBody = tbodyBuilder(props.playersData, props.wantedStats);
    return (
        <div className="teamTable">
            <header className="table__header">
                <h1 className="table__h1">Placement: {props.tableHeader}</h1>
            </header>
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
    ths.push(<th className="placement"></th>);
    ths.push(<th className="gamerTag">Username</th>);
    for (const [key, value] of Object.entries(playerData)) {
        if (key !== 'username' && wantedStats.includes(key)) {
            ths.push(<th className="cellValue">{key}</th>);
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
    tds.push(<td className="placement">{index+1}</td>);
    tds.push(<td className="gamerTag">{dataObj.username}</td>);
    for (const [key, value] of Object.entries(dataObj)) {
        if (key !== 'username' && wantedStats.includes(key)) {
            tds.push(<td className="cellValue">{Number.isInteger(value) ? value : value.toFixed(2)}</td>);
        };
    };
    return (
        <tr>
            {tds}
        </tr>
    );
};


