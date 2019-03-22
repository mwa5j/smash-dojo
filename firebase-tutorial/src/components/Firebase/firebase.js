import app from 'firebase/app';
import 'firebase/auth';

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
    
}

export default Firebase;