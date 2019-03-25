import React, { Component } from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange'

import { withFirebase } from '../Firebase';
import { withAuthorization, AuthUserContext } from '../Session';

class AccountPage extends Component {
    render(){
        return(
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                    <h1>Account: { this.props.firebase.auth.currentUser.email }</h1>
                    <PasswordForgetForm />
                    <PasswordChangeForm />
                </div>
                )}
            </AuthUserContext.Consumer>

        )
    }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(withFirebase(AccountPage));