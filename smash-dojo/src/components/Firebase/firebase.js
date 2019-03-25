import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDfnFRh0Px4-qHUgr-era_0nwMjggnA0LU",
    authDomain: "fir-tutorial-601b4.firebaseapp.com",
    databaseURL: "https://fir-tutorial-601b4.firebaseio.com",
    projectId: "fir-tutorial-601b4",
    storageBucket: "fir-tutorial-601b4.appspot.com",
    messagingSenderId: "21683980203"
}

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.database()
    }

    // ** Authorization API ** //

    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password)
    

    doSignInWithEmailandPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password)
    

    doSignOut = () => 
        this.auth.signOut()
    

    doPasswordReset = (email) => 
        this.auth.sendPasswordResetEmail(email)
    

    doPasswordUpdate = (password) => 
        this.auth.currentUser.updatePassword(password)
    
    // ** User API ** //

    user = uid => this.db.ref(`users/${uid}`)

    users = () => this.db.ref('users')

    // ** Message API ** //

    message = uid => this.db.ref(`messages/${uid}`)

    messages = () => this.db.ref('messages')

    // ** Game Results API ** //

    set = uid => this.db.ref(`sets/${uid}`)

    sets = () => this.db.ref('sets')
}

export default Firebase;