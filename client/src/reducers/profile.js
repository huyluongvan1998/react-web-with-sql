import {
    GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, ADD_EXPERIENCE_FAIL, ADD_EXPERIENCE_SUCCESS, ADD_EDUCATION_SUCCESS
}
from '../action/type';


const INITIAL_STATE = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}
// eslint-disable-next-line 
export default function (state = INITIAL_STATE, action ) {
    const { type, payload } = action;
    switch(type) {
        case GET_PROFILE:
        case ADD_EXPERIENCE_SUCCESS:
        case ADD_EDUCATION_SUCCESS:
            return {
                ...state,
                profile: payload,
                loading: false
            }
            case PROFILE_ERROR:
            case ADD_EXPERIENCE_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
            case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: []
            }
            default: 
            return state; 
    }
}