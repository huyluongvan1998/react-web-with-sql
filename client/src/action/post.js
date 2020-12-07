import axios from 'axios';
import { 
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKE,
    DELETE_POST,
    ADD_POST
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
// addLikes
 export const addLikes = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

       dispatch({
           type: UPDATE_LIKE,
           payload: {id, likes: res.data}
       });

    } catch (error) {
        dispatch({
           type: POST_ERROR,
           payload: { msg: error.response.data.statusText, status: error.response.data.status }
        });
    }
}
// removeLikes
export const removeLikes = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

       dispatch({
           type: UPDATE_LIKE,
           payload: {id, likes: res.data}
       });

    } catch (error) {
        dispatch({
           type: POST_ERROR,
           payload: { msg: error.response.data.statusText, status: error.response.data.status }
        });
    }
}

//Delete Post
export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post Deleted', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.data.status }
         });
    }
}

//Add Post
export const addPost = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const body = {
            "text" : formData
        }

        const res = await axios.post(`/api/posts`, body, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Updated', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.data.statusText, status: error.response.data.status }
         });
    }
}