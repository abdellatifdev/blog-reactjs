import axios from 'axios';
import jwtDecode from 'jwt-decode';

function getPosts(){
    const token = window.localStorage.getItem("authToken");
    const {id} = jwtDecode(token);
    return axios
            .get(`http://127.0.0.1:8000/api/users/${id}/posts`)
            .then(response => response.data["hydra:member"])
}

export default {
    getPosts
}