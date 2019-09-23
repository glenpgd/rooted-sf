import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure,
} from './user.actions';

import { 
    auth, 
    googleProvider, 
    createUserProfileDocument, 
    getCurrentUser
} from '../../firebase/firebase.utils';


//GENERATORS
export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

export function * signOut(){
   try{
       yield auth.signOut();
       yield (put(signOutSuccess))
   } 
   catch(error){
       yield put(signOutFailure(error))
   }
}

export function * signUp({payload:{email, password, displayName}}){
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(
            email, 
            password
        );
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    } 
    catch(error){
        yield put(signUpFailure(error))
    }
 }

 export function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapshotFromUserAuth(user, additionalData)
 }

//SIGN IN
export function* signInWithGoogle() {
    try{
        const { user } = yield auth.signWithPopUp(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const {user} = yield auth.signWithPopUp(googleProvider);
        yield getSnapshotFromUserAuth(user);

    } catch(error) {
        yield put(signInFailure(error))
    }
}

//AUTH
export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

// GOOGLE AND EMAIL - SIGN IN
export function* onGoogleSignInstart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN, signInWithEmail)
}

//USER
export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated )
}

//SIGN OUT
export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

//SIGN UP
export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}


//SAGAS
export function* userSagas(){
    yield all([
        call(onGoogleSignInstart), 
        call(onEmailSignInStart), 
        call(isUserAuthenticated),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]) 
}

