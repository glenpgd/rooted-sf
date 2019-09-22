import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types';

import {auth, googleProvider, createUserProfileDocument} from '../../firebase/firebase.utils';

import {
    signInSuccess,
    signInFailure,
} from './user.actions';



export function* signInWithGoogle() {
    try{
        const {user } = yield auth.signWithPopUp(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const {user} = yield auth.signWithPopUp(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data( )}))
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInstart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN, signInWithEmail)
}

export function* userSagas(){
    yield all([call(onGoogleSignInstart), call(onEmailSignInStart)]); 
}