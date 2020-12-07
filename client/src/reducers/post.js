import { 
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKE,
    DELETE_POST,
    ADD_POST
} from '../action/type'

const INITIAL_STATE = {
    post: null,
    posts: [],
    loading: true,
    error: {}
};
// eslint-disable-next-line
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
    case UPDATE_LIKE:
        return {
            ...state,
            posts: state.posts.map(post => post._id === payload.id ? {...post, likes: payload.likes} : post),
            loading: false
        }
    case DELETE_POST:
        return {
            ...state,
            posts: state.posts.filter(post => post._id !== payload),
            loading: false,
            }
    case ADD_POST:
        return {
            ...state,
            posts: [...state.posts, payload],
            loading: false,
      }
    default: 
        return state
}
}
