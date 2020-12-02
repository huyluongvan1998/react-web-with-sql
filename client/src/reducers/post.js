import { 
    GET_POSTS,
    POST_ERROR
} from '../action/type'

const INITIAL_STATE = {
    post: null,
    posts: [],
    loading: true,
    error: {}
};

export default function (state = INITIAL_STATE, action) {

const {type, payload} = action;

switch(type){
    case GET_POSTS:
        return {
            ...state,
            posts: payload,
            loading: false
        }
    case POST_ERROR:
        return {
            ...state,
            error: payload,
            loading: false
        }
    default: 
        return state
}


}