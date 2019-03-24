import React, { Component } from 'react';

import { withAuthorization } from '../Session'

class Admin extends Component {
    render(){
        return(
            <div>
                <h1>Admin</h1>
            </div>
        )
    }
}


const condition = authUser => !!authUser

export default withAuthorization(condition)(Admin);
