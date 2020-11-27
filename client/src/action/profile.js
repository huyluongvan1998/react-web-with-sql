import axios from 'axios';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    ADD_EXPERIENCE_SUCCESS,
    ADD_EXPERIENCE_FAIL,
    ADD_EDUCATION_SUCCESS
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


//*  ADD Profile *//
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
// please learn by heart for meh. Do not destructoring in function variable !!! PLEASEEEEEEEEEEEEEEEEEEEE
// GODDDDDD THIS IS STRESSSSING ME OUTTTTTTTTTTT AHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!
export const addExperience = (expData, history) => async dispatch =>  { 
    try {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        const res = await axios.put('/api/profile/experience', expData, config);
        
        dispatch({
            type: ADD_EXPERIENCE_SUCCESS,
            payload: res.data
        });
            dispatch(setAlert('Add EXP success', 'success'));
            history.push('/dashboard');


    } catch (error) {
       const errors= error.response.data.errors;
        if(errors){
            errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ADD_EXPERIENCE_FAIL,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

//*  ADD EDUCATION *//
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };


        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: ADD_EDUCATION_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert('Add education success', 'success'));
        history.push('/dashboard');

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        dispatch({
            type: PROFILE_ERROR
        });
    }
}

