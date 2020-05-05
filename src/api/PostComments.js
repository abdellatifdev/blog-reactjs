import axios from 'axios';

function getComments(post){
    return axios
             .get(`http://127.0.0.1:8000/api/posts/${post}/comments`)
             .then(response => response.data)
}

function newComment(comment){
    return axios
            .post('http://127.0.0.1:8000/api/comments',comment)
}
export default {
    getComments,
    newComment
}