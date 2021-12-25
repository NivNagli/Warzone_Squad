import classes from './homePage.module.css';
import PlayerSearch from './PlayerSearch';
import React from 'react';
import img from '../../../photos/test2.jpeg';
const homePage = () => {
    return (
        <React.Fragment>
            <span className={classes.main_span}>Welcome To WarzoneSquad </span>
            <PlayerSearch />
            <span className={classes.secondary_span}>The Data Based On Each Player's Last 100 Games</span>
            <img src={img} alt="homePagePicture" className={classes.homePage_img}></img>

        </React.Fragment>
    );
};

export default homePage;