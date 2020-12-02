import axios from 'axios';
import { 
    GET_POSTS,
    POST_ERROR,
 } from '../action/type';
 import { setAlert } from './alert';

 export const getPosts = () => async dispatch => {
     try {
         const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

     } catch (error) {
         dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.data.status }
         });
     }
 }