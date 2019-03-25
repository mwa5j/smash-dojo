import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/Form.css'

import { withFirebase } from '../Firebase/context';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div>
        <h1>Forgot Password</h1>
        <PasswordForgetForm />
    </div>
)

const INIT_STATE = {
    email: '',
    error: null,
}

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = {...INIT_STATE}
    }

    onSubmit = (e) => {
        const { email } = this.state

        e.preventDefault()
        
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INIT_STATE})
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
            error,
        } = this.state

        const isInvalid = 
            email === ''
        

        return (
            <div className="formContainer">
                <label>Forgot Password:</label>    
                <form onSubmit={this.onSubmit}>
                    <input
                        className="input" 
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input className="submit" disabled={isInvalid} type="submit" value="Reset my password" />
                    
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        )
    }

}

const PasswordForgetLink = () => (
    <p>
        <Link className="link-pf" to={ROUTES.PASSWORD_FORGET}> Forgot Password? </Link>
    </p>
)

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink};