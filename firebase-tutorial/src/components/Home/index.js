import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session'
import Messages from '../Messages';
import { withFirebase } from '../Firebase';

class HomePage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            users: null,
        }
    }
    
    componentDidMount(){
        this.props.firebase.users().on('value', snapshot => {
            this.setState({
                users: snapshot.val(),
            })
        })
    }

    componentWillUnmount(){
        this.props.firebase.users().off()
    }

    render(){
        return(
            <div>
                <h1>Home Page</h1>
                <p>The Home Page is accessible to signed in users</p>
        
                <Messages users={this.state.users} />
            </div>
        )
    }
}

const condition = authUser => !!authUser

export default compose(
    withAuthorization(condition),
    withFirebase
)(HomePage);