import {SET_ALERT, REMOVE_ALERT} from '../action/type';


const INITIAL_STATE = [] ;

// eslint-disable-next-line
export default function (state = INITIAL_STATE, action){
    const {type, payload} = action
    switch(type){
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload); //return all alert except for matching payload
            //return new array where the matching alert have been deleted => DELETED.
        default:
            return state;
    }
} 
