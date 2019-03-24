import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase/context';
import * as ROUTES from '../../constants/routes';

class SignUpPage extends Component {
    render(){
        return(
            <div>
                <h1>Sign Up</h1>
                <SignUpForm />
               
            </div>
        )
    }
}

const INIT_STATE = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    error: null
}

class SignUpFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = {...INIT_STATE}
    }

    onSubmit = (e) => {
        const { username, email, password1} = this.state
        
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password1)
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    })
            })
            .then(() => {
                this.setState({...INIT_STATE})
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({error})
            })
        e.preventDefault()
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const {
            username,
            email,
            password1,
            password2,
            error,
        } = this.state

        const isInvalid = 
            password1 !== password2 ||
            password1 === '' ||
            email === ''         

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Username"
                />
                <input 
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input 
                    name="password1"
                    value={password1}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Password"
                />
                <input 
                    name="password2"
                    value={password2}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>
                
                {error && <p>{error.message}</p>}
            </form>
        )
    }

}

const SignUpLink = () => (
    <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase)


export default SignUpPage;

export {SignUpForm, SignUpLink};