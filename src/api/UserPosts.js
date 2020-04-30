import axios from 'axios';

function getPosts(){
    return axios
            .get("http://127.0.0.1:8000/api/posts")
            .then(response => response.data["hydra:member"])
}

export default {
    getPosts
}