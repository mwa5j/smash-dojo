import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';

class Messages extends Component {
    constructor(props){
        super(props)

        this.state = {
            text: '',
            userId: '',
            loading: false,
            messages: [],
        }
    }

    componentDidMount(){
        this.setState({ loading: true })

        this.props.firebase.messages().on('value', snapshot =>{
            const messageObject = snapshot.val()

            if(messageObject){
                const messageList = Object.keys(messageObject).map(key => ({
                    ...messageObject[key],
                    uid: key,
                }))

                this.setState({ messages: messageList, loading: false })
            } else {
                this.setState({ messages: null, loading: false })
            }
            
            this.setState({ loading: false })
        })
    }

    componentWillUnmount(){
        this.props.firebase.messages().off()
    }

    onChangeText = e => {
        this.setState({ text : e.target.value })
    }

    onCreateMessage = (e, authUser) => {
        e.preventDefault()

        this.props.firebase.messages().push({
            text: this.state.text,
            userId: authUser.uid
        })

        this.setState({ text: '' })

    }

    onRemoveMessage = uid => {
        this.props.firebase.message(uid).remove()
    }

    render() {
        const { users } = this.props
        const { text, messages, loading } = this.state

        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {loading && <div>Loading ...</div>}
        
                        {messages && (
                            <MessageList
                                messages={messages.map(message => ({
                                    ...message, 
                                    user: users
                                        ? users[message.userId]
                                        : { userId: message.userId },
                                }))}
                                onRemoveMessage={this.onRemoveMessage}
                            />
                        )}

                        {!messages && <div>There are no messages</div>}
        
                        <form onSubmit={e => this.onCreateMessage(e, authUser)}>
                            <input 
                                type="text"
                                value={text}
                                onChange={this.onChangeText}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }

}

const MessageList = ({ messages, onRemoveMessage }) => (
    <ul>
        {messages.map(message => (
            <MessageItem key={message.uid} message={message} onRemoveMessage={onRemoveMessage}/>
        ))}
    </ul>
)

const MessageItem = ({ message, onRemoveMessage }) => (
    <li>
        <strong>{message.user.username || message.user.userId }</strong> {message.text}
        <button type="button" onClick={() => onRemoveMessage(message.uid)}>Delete</button>
    </li>
)

export default withFirebase(Messages);