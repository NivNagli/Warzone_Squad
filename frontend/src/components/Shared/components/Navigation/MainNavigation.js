import NavLinks from './NavLinks';
import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
const MainNavigation = props => {
    return (
        <React.Fragment>
            {
                <nav className={classes.navbar}>
                    <div>
                        <h1 >
                            <NavLink className={classes.navbar__link} to="/">
                                <div className={classes.logo_holder}>
                                    <h3>Warzone</h3>
                                    <p>Squad</p>
                                </div>
                            </NavLink>
                        </h1>
                    </div>
                    <NavLinks />
                </nav>
            }
        </React.Fragment>
    );
};
export default MainNavigation;