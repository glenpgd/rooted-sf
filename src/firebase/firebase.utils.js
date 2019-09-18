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
    const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();
    const collectionSnapshot = await collectionRef.get();
    console.log({collection: collectionSnapshot.docs.map(doc => doc.data()) })

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc(obj.title);
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

export const converCollectionsSnapshotToMap = (collectionsSnapshot) => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
        const {title, items} = docSnapshot.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        }
    })
    transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google pop-up
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



