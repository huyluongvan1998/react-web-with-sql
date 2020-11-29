import {
    GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, ADD_EXPERIENCE_FAIL, ADD_EXPERIENCE_SUCCESS, ADD_EDUCATION_SUCCESS,
    DELETE_EXP,
    DELETE_EDU,
    GET_PROFILES,
    GET_PROFILE_BY_ID,
    GET_GITHUB_REPOS,
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
        case DELETE_EXP:
        case DELETE_EDU:
        case GET_PROFILE_BY_ID:
            return {
                ...state,
                profile: payload,
                loading: false
            }
            case GET_PROFILES:
                return {
                    ...state,
                    profiles: payload,
                    loading: false
                }
            case GET_GITHUB_REPOS:
                return {
                    ...state,
                    repos: payload,
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