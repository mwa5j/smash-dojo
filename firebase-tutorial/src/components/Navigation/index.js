import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css'

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }

        </AuthUserContext.Consumer>
    </div>
    
)

const NavigationAuth = () => (
    <div className="container">
        <div>
            <label className="logo"></label>
            <ul className="listContainer">
                <li className="li">
                    <Link className="link" to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li className="li">
                    <Link className="link" to={ROUTES.HOME}>Home</Link>
                </li>
                <li className="li">
                    <Link className="link" to={ROUTES.ACCOUNT}>Account</Link>
                </li>
                <li className="li">
                    <Link className="link" to={ROUTES.ADMIN}>Admin</Link>
                </li>
                <li className="li">
                    <SignOutButton />
                </li>
            </ul>
        </div>
    </div>
)

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
)


export default Navigation;