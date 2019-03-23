import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation/index';
import LandingPage from '../Landing/index';
import SignUpPage from '../SignUp/index';
import SignInPage from '../SignIn/index';
import PasswordForgotPage from '../PasswordForget/index';
import HomePage from '../Home/index';
import AccountPage from '../Account/index';
import AdminPage from '../Admin/index';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
    <Router>
        <div>
            <Navigation />
            <hr />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgotPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
    </Router>
)



export default withAuthentication(App);