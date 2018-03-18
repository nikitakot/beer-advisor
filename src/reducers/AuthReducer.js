import {
    EMAIL_CHANGED, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, PASSWORD_CHANGED, RESET_FORM,
    VALIDATION_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    passwordError: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed.', password: '', loading: false };
        case VALIDATION_ERROR:
            return { ...state, error: action.payload };
        case RESET_FORM:
            return INITIAL_STATE;
        default:
            return state;
    }
};
