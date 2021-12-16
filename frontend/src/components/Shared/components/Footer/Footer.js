import React from 'react';

import classes from './Footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = props => {
    return (
        <div className={classes.footer}>
            <ul>
                <li><a href="https://www.facebook.com/nivnagli/" target="_blank"><i className="fa fa-facebook fa-fw"></i></a></li>
                <li><a href="https://www.twitter.com/" target="_blank"><i className="fa fa-twitter fa-fw"></i></a></li>
                <li><a href="https://github.com/NivNagli" target="_blank"><i className="fa fa-github fa-fw"></i></a></li>
                <li><a href="https://www.linkedin.com/in/niv-nagli-59204b208/" target="_blank"><i className="fa fa-linkedin fa-fw"></i></a></li>
                <li>
                    <NavLink className="fa fas fa-copyright fa-fw" to="/"></NavLink>
                </li>
                
            </ul>
            <p>WarzoneSquad Written By Niv Nagli</p>
        </div>
    );
};
// <li><a href="https://www.codepen.com/" target="_blank"><i class="fa fas fa-copyright fa-fw"></i></a></li>
export default Footer;