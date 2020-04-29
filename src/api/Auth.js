import axios from 'axios';
import jwtDecode from 'jwt-decode';
function authenticate(credentials){
    return axios
            .post('http://127.0.0.1:8000/api/login_check',credentials)
            .then(response => response.data.token)
            .then(token => {
                window.localStorage.setItem("authToken",token);
                setToken(token);
                return true;
            });

}

function setToken(token){
    axios.response.headers["Authorization"] = "Bearer: "+ token;
}

function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.response.headers["Authorization"];
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime) {
            setToken(token);
        }
    }
}

export default {
    authenticate,
    logout,
    setup
}