import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    TEST_ROUTE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    ACCOUNT_DELETED
}  from '../action/type';

const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

// eslint-disable-next-line
export default function (state = INITIAL_STATE, action ) {
    const {type, payload} = action;

    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            } 
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            //set new token into localStorage;
            localStorage.setItem('token', payload.token);
            //return 
            return {
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOG_OUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token'); // remove token out of local storage
            return {
                ...state, 
                ...payload,
                token:null,
                isAuthenticated: false,
                loading: false
            }
        case TEST_ROUTE:
            return state;
        default: 
        return state;
    }
}