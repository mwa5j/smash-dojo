import React from 'react';

import '../../css/Form.css'

import {withFirebase} from '../Firebase';

const SignOutButton = ({firebase}) => (
    <div className="formContainer">
        <label>Sign Out:</label>
        <input className="submit" type="submit" value="Sign Out" onClick={firebase.doSignOut} />
    </div>
)

export default withFirebase(SignOutButton)