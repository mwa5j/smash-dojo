import React, { Component } from 'react';

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
            <form onSubmit={this.onSubmit}>
                <input 
                    name="password1"
                    value={password1}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />
                <input 
                    name="password2"
                    value={password2}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <button disabled={isInvalid} type="submit">Reset my Password</button>
                
                {error && <p>{error.message}</p>}
            </form>
        )
    }

}


export default withFirebase(PasswordChangeForm)