import React, { Component } from 'react';

import { withAuthorization } from '../Session'

class HomPage extends Component {
    render(){
        return(
            <div>
                <h1>Home</h1>
                <p>The Home page can be accessed by signed in users.</p>
            </div>
        )
    }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomPage);