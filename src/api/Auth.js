import axios from 'axios';

function authenticate(credentials){
    return axios
            .post('http://127.0.0.1:8000/api/login_check',credentials)
            .then(response => response.data.token)
            .then(token => {
                window.localStorage.setItem("authToken",token);
                axios.response.headers["Authorization"] = "Bearer: "+ token;

                return true;
            });

}

export default {
    authenticate
}