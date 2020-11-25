import axios from 'axios';

import { setAlert } from './alert';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    REMOVE_ALERT,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    CLEAR_PROFILE
} from './type';

import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {

    if(localStorage.token) {
        //set headers for the GET route === config variable.
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({ 
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

//REGISTER USER
export const register =  ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        //Take error data from backend
        const errors = error.response.data.errors;
        // error return JSON object msg for showing 
        errors.map(error => dispatch(setAlert(error.msg, "danger")));

        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//Login

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type" : 'application/json'
        }
    }

    const body = JSON.stringify({ email, password});
    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
        
    } catch (error) {

        const errors = error.response.data.errors;
        dispatch({
            type: LOGIN_FAIL
        })
        errors.map(error => dispatch(setAlert(error.msg, 'danger'))); //print out the error
        //REMOVE ERROR
        dispatch({
            type: REMOVE_ALERT
        })
    }
}

//LOG OUT
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOG_OUT
    })
    
}