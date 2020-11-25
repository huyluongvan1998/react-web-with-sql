import axios from 'axios';
import {
    GET_PROFILE, PROFILE_ERROR
}
from  '../action/type';
import { setAlert } from './alert';

//get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res =await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

export const createProfile = (formData, history, edit) => async dispatch => {
try {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const res = await axios.post('/api/profile', formData, config);

    dispatch({
        type: GET_PROFILE ,
        payload: res.data
    }); 
    dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created', 'success' ));
    
    // redirect action => alert will be displayed at the destination site.
    if(!edit) {
        history.push('/dashboard');
    }
} catch (error) {
    const errors = error.response.data.errors;
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); //print out the error
    }
    
    dispatch({
        type:PROFILE_ERROR,
        payload: {msg: error.response.statusText, status: error.response.status}
    });
}
    
}

