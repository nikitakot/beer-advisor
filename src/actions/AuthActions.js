import firebase from 'firebase';
import {
    EMAIL_CHANGED, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, PASSWORD_CHANGED, RESET_FORM,
    VALIDATION_ERROR
} from './types';
import { EMAIL_REGEX } from '../utlis/constants';
import NavigationService from '../utlis/NavigationService';

export const emailChanged = text => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const signUpUser = ({ email, password }) => {
    const validationResult = validateEmailAndPassword(email, password);
    if (validationResult) {
        return validationResult;
    }
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => {
                loginUserFail(dispatch, error);
            });
    };
};

export const logInUser = ({ email, password }) => {
    const validationResult = validateEmailAndPassword(email, password);
    if (validationResult) {
        return validationResult;
    }
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => {
                loginUserFail(dispatch, error);
            });
    };
};

export const resetForm = () => {
    return {
        type: RESET_FORM
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    NavigationService.reset('Profile');
};

const loginUserFail = (dispatch, error) => {
    console.log(error);
    dispatch({ type: LOGIN_USER_FAIL });
};

const validateEmailAndPassword = (email, password) => {
    if (!email) {
        return {
            type: VALIDATION_ERROR,
            payload: 'Email is required.'
        };
    }

    if (!EMAIL_REGEX.test(email)) {
        return {
            type: VALIDATION_ERROR,
            payload: 'Email format is incorrect.'
        };
    }

    if (!password || password.length < 6) {
        return {
            type: VALIDATION_ERROR,
            payload: 'Password should contain at least 6 characters.'
        };
    }
};
