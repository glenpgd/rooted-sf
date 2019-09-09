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

firebase.initializeApp(config);

