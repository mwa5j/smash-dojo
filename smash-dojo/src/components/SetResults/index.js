import React, { Component } from 'react'

import '../../css/Form.css'

import { withFirebase } from '../Firebase'
import { AuthUserContext } from '../Session'

class GameResults extends Component {
    constructor(props){
        super(props)

        this.state = {
            userChar: '',
            oppChar: '',
            userScore: '',
            oppScore: '',
            result: '',
            loading: 'false',
            sets: [],
        }
    }

    componentDidMount(){
        this.setState({ loading: true })

        this.props.firebase.sets().on('value', snapshot => {
            const setObject = snapshot.val()

            if(setObject){
                const setList = Object.keys(setObject).map(key => ({
                    ...setObject[key],
                    uid: key,
                }))

                this.setState({ sets: setList, loading: false })
            } else {
                this.setState({ sets: null, loading: false })
            }

            this.setState({ loading: false })
        })
    }

    componentWillUnmount(){
        this.props.firebase.sets().off()
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    createSet = (e, authUser ) => {
        e.preventDefault()

        var tempResult = ''

        if(this.state.userScore > this.state.oppScore){
            tempResult = "Win"
        } else if(this.state.userScore < this.state.oppScore){
            tempResult = "Loss"
        } else {
            tempResult = "Draw"
        }

        this.props.firebase.sets().push({
            userChar: this.state.userChar,
            oppChar: this.state.oppChar,
            userScore: this.state.userScore,
            oppScore: this.state.oppScore,
            userId: authUser.uid,
            result: tempResult,
        })

        this.setState({
            userChar: '',
            oppChar: '',
            userScore: '',
            oppScore: '',
        })
    }

    removeSet = uid => {
        this.props.firebase.set(uid).remove()
    }

    render() {
        const { users } = this.props
        const { userChar, oppChar, userScore, oppScore, loading, sets} = this.state

        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        <h1>Report Set:</h1>
                        <div className="formContainer">
                            <form onSubmit={e => this.createSet(e, authUser)}>                           
                                <label>Number of wins:</label>
                                <input
                                    className="input"
                                    type="number"
                                    name={"userScore"}
                                    value={userScore} 
                                    placeholder='Number of wins' onChange={this.onChange}
                                />
                            
                                <label>Number of losses:</label>
                                <input
                                    className="input"
                                    type="number"
                                    name={"oppScore"}
                                    value={oppScore} 
                                    placeholder='Number of losses' onChange={this.onChange}
                                />
                            
                                <label>Your Character:</label>
                                <select
                                    className="input"
                                    name={"userChar"}
                                    value={userChar}
                                    onChange={this.onChange}
                                >
                                    <option value="" selected disabled hidden>--</option>
                                    <option value='Link'>Link</option>
                                    <option value='Mario'>Mario</option>
                                    <option value='D.K.'>D.K.</option>
                                    <option value='Samus'>Samus</option>
                                </select>
                            
                                <label>Opponent's Character:</label>
                                <select
                                    className="input"
                                    name={"oppChar"}
                                    value={oppChar}
                                    onChange={this.onChange}
                                >
                                    <option value="" selected disabled hidden>--</option>
                                    <option value='Link'>Link</option>
                                    <option value='Mario'>Mario</option>
                                    <option value='D.K.'>D.K.</option>
                                    <option value='Samus'>Samus</option>
                                </select>
                            
                                <input className="submit" type="submit" value="Submit" />
                                
                            </form>
                        </div>

                        {loading && <div>Loading...</div>}

                        {sets && (
                            <SetList
                                sets={sets.map(set => ({
                                    ...set,
                                    user: users
                                        ? users[set.userId]
                                        : { userId: set.userId}
                                }))}
                                removeSet={this.removeSet}
                            />
                        )}

                        {!sets && <div>There are no sets recorded </div>}
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const SetList = ({ sets, removeSet }) => (
    <ol>
        {sets.map(set => (
            <SetItem key={set.uid} set={set} removeSet={removeSet} />
        ))}
    </ol>
)

const SetItem = ({ set, removeSet }) => (
    <li>
        <div>
            <label>{set.result} against {set.oppChar} {set.userScore} to {set.oppScore} as {set.userChar}</label>
            <button type="button" onClick={() => removeSet(set.uid)}>Delete</button>
        </div>
    </li>
)

export default withFirebase(GameResults)