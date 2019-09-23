import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {auth, googleProvider, createUserProfileDocument} from '../../firebase/firebase.utils';
import {
    signInSuccess,
    signInFailure,
    getCurrentUser
} from './user.actions';



export function* getSnapshotFromUserAuth(userAuth){
    try{
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    }
    catch(error){
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try{
        const {user } = yield auth.signWithPopUp(googleProvider);
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

export function* onGoogleSignInstart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated )
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN, signInWithEmail)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInstart), 
        call(onEmailSignInStart), 
        call(isUserAuthenticated)
    ]) 
}