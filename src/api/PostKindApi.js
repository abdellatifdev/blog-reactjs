import axios from 'axios';

function findAll(){
    return axios
              .get('http://127.0.0.1:8000/api/post_kinds')
              .then(response => response.data['hydra:member']);  
}

export default {
    findAll
}