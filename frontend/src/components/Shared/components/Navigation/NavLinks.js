import { NavLink } from 'react-router-dom';
import React from 'react';
import classes from './NavLinks.module.css';
import Button from '../Button/Button';

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
                    <Button to={'/Login'} parentClass={classes.button}>Login</Button>
                )}

                {!isLoggedIn && (
                    <Button to={'/Signup'} parentClass={classes.button}>Signup</Button>
                )}
                {isLoggedIn && (
                    <Button to={'/Logout'} parentClass={classes.button}>Logout</Button>
                )}
            </div>
            
        </React.Fragment>
    );
};

export default NavLinks;