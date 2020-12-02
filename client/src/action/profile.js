import axios from 'axios';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    ADD_EXPERIENCE_SUCCESS,
    ADD_EXPERIENCE_FAIL,
    ADD_EDUCATION_SUCCESS,
    DELETE_EXP,
    DELETE_EDU,
    ACCOUNT_DELETED,
    GET_PROFILES,
    CLEAR_PROFILE,
    GET_GITHUB_REPOS,
    GET_PROFILE_BY_ID,
}
from  '../action/type';
import { setAlert } from './alert';

//get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res =await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {

        dispatch({
            type: CLEAR_PROFILE
        });

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

//get all user profile
export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });

    try {
        const res =await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

//get user profile BY ID
export const getProfileById = (profileId) => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });

    try {
        const res =await axios.get(`/api/profile/user/${profileId}`);

        dispatch({
            type: GET_PROFILE_BY_ID,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}

//get user Github Repos BY ID
export const getGitHubRepos = (username) => async dispatch => {
    

    try {
        const res =await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_GITHUB_REPOS,
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

// DELETE EXPERIENCE
export const deleteExp = (expId) => async dispatch => {
    
    
    try {
        const res = await axios.delete(`/api/profile/experience/:${expId}`);

    dispatch({
        type: DELETE_EXP,
        payload: res.data
    })
    dispatch(setAlert('Delete Experience Successfully', 'success'));
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
// DELETE Education
export const deleteEdu = (eduId) => async dispatch => {
    
    
    try {
        const res = await axios.delete(`/api/profile/education/:${eduId}`);

    dispatch({
        type: DELETE_EDU,
        payload: res.data
    })
    dispatch(setAlert('Delete Education Successfully', 'success'));
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

// DELETE Account
export const accountDeleted = () => async dispatch => {
    if(window.confirm('ARE YOU SURE WANT TO DELETE. THIS CAN BE UNDONE'))
    try {
        const res = await axios.delete(`/api/profile`);

    dispatch({
        type: ACCOUNT_DELETED,
        payload: res.data
    })
    dispatch(setAlert('Delete Account Successfully', 'success'));
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
