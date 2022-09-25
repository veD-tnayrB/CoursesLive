import * as React from 'react';
import Logo from '../logo';
import Routes from './Routes';
import User from './user';
import './navbar.scss';

function Navbar() {

    return (
        <nav className="primary-navbar">
            <ul>
                <li>
                    <Logo />
                </li>

                <div className="actions-container">
                    <Routes />
                    <User />
                </div>
            </ul>
        </nav>
    )
}

export default Navbar;