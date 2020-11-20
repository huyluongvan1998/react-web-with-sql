import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // if there's a token then set headers with x-auth-token
        axios.defaults.headers.common['x-auth-token']= token;

    } else {
        //if not then delete the headers
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;