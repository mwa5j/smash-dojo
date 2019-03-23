import React, { Component } from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange'

class AccountPage extends Component {
    render(){
        return(
            <div>
                <h1>Account</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        )
    }
}

export default AccountPage;