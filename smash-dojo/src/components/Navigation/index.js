import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/Navigation.css'

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
    <ul className="ul">
        <li className="li">
            <Link className="link" to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li className="li">
            <Link className="link" to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li className="li">
            <Link className="link" to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li className="li">
            <Link className="link" to={ROUTES.HOME}>Home</Link>
        </li>
    </ul>
)

const NavigationNonAuth = () => (
    <ul className="ul">
        <li className="li">
            <Link className="link" to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li className="li">
            <Link className="link" to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
)


export default Navigation;