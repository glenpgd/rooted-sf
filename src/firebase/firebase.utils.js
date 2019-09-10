import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBru1PuSBgHtq8KayXlv2rew-aYUFooS00",
    authDomain: "rooted-sf-db.firebaseapp.com",
    databaseURL: "https://rooted-sf-db.firebaseio.com",
    projectId: "rooted-sf-db",
    storageBucket: "",
    messagingSenderId: "303246618521",
    appId: "1:303246618521:web:80dcefa977370173a92d08"   
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
       const {displayName, email} = userAuth; 
       const createdAt = new Date();

       try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData    
        })
       } catch (error) {
           console.log('error creating user', error.message)
       }
    }
    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google pop-up
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



