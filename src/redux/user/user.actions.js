import {UserActionTypes} from './user.types';

export const setCurrentUser = user => ({
    type: 'SET_CURRENT',
    payload: user
})