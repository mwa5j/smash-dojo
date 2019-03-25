import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp/index';
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase } from '../Firebase/context';
import * as ROUTES from '../../constants/routes';

class SignInPage extends Component {
    render(){
        return(
            <div>
                <h1>Sign In</h1>
                <SignInForm />
                <PasswordForgetLink />
                <SignUpLink />
               
            </div>
        )
    }
}

const INIT_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = {...INIT_STATE}
    }

    onSubmit = (e) => {
        const { email, password} = this.state

        e.preventDefault()
        
        this.props.firebase
            .doSignInWithEmailandPassword(email, password)
            .then(authUser => {
                this.setState({...INIT_STATE})
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({error})
            })

    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const {
            email,
            password,
            error,
        } = this.state

        const isInvalid = 
            password === '' ||
            email === ''
        

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input 
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">Sign In</button>
                
                {error && <p>{error.message}</p>}
            </form>
        )
    }

}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase)


export default SignInPage;

export {SignInForm};