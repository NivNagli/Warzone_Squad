import { NavLink } from 'react-router-dom';
import React from 'react';
import classes from './NavLinks.module.css';

const NavLinks = props => {
    const isLoggedIn = false;

    return (
        <React.Fragment>
            <div className={classes.nav_links}>
                <ul className={classes.nav_list}>
                    <li>
                        <NavLink className={classes.nav__link} to="/" exact>
                            Compare
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={classes.nav__link} to="/" exact>
                            Search
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className={classes.nav_buttons}>
                {!isLoggedIn && (
                    <button className={classes.button} >Login</button>
                )}

                {!isLoggedIn && (
                    <button className={classes.button} >Signup</button>
                )}
                {isLoggedIn && (
                    <button className={classes.button} >Logout</button>
                )}
            </div>
            
        </React.Fragment>
    );
};

export default NavLinks;