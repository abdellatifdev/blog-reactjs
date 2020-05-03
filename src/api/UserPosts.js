import axios from 'axios';
import jwtDecode from 'jwt-decode';

function findAll(){
    const token = window.localStorage.getItem("authToken");
    const {id} = jwtDecode(token);
    return axios
            .get(`http://127.0.0.1:8000/api/users/${id}/posts`)
            .then(response => response.data["hydra:member"])
}

function newPost(post){
    return axios
            .post('http://127.0.0.1:8000/api/posts',post)
}

function find(id){
    return axios
            .get(`http://127.0.0.1:8000/api/posts/${id}`)
            .then(response => response.data)
}

function edit(id,post){
    return axios
            .put(`http://127.0.0.1:8000/api/posts/${id}`,post)
            .then(response => response.data)
}

function deletePost(id,post){
    return axios
            .delete(`http://127.0.0.1:8000/api/posts/${id}`)
            .then(response => response.data)
}
export default {
    find,
    newPost,
    findAll,
    edit,
    deletePost
}