import React, { Component } from 'react';

import '../../css/Form.css'

import { withFirebase } from '../Firebase/context';

const INIT_STATE = {
    password1: '',
    password2: '',
    error: null,
}

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props)

        this.state = {...INIT_STATE}
    }

    onSubmit = (e) => {
        const { password1 } = this.state

        e.preventDefault()
        
        this.props.firebase
            .doPasswordUpdate(password1)
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
        const { password1, password2, error } = this.state

        const isInvalid = 
            password1 !== password2 ||
            password1 === ''
        

        return (
            <div className="formContainer">
                <label>Change Password:</label>
                <form onSubmit={this.onSubmit}>
                <input 
                    className="input"
                    name="password1"
                    value={password1}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />
                <input 
                    className="input"
                    name="password2"
                    value={password2}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <input className="submit" disabled={isInvalid} type="submit" value="Reset My Password" />
                
                {error && <p>{error.message}</p>}
            </form>
            </div>
        )
    }

}


export default withFirebase(PasswordChangeForm)