import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session'
import SetResults from '../SetResults'
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
                <SetResults users={this.state.users} />
            </div>
        )
    }
}

const condition = authUser => !!authUser

export default compose(
    withAuthorization(condition),
    withFirebase
)(HomePage);