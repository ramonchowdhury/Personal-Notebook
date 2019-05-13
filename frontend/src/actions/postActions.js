import { FETCH_POSTS, NEW_POST, DELETE_POST } from './types';
import axios from 'axios';

export const fetchPosts = () => dispatch =>{

    axios.get('http://127.0.0.1:8000/api/note/', {
        headers: {Authorization : localStorage.getItem('token')}
    })
    .then(res => dispatch({
        type: FETCH_POSTS,
        payload: res.data
    }))
    .catch(error => console.log(error));
} 

export const createPost = (postData) => dispatch =>{
    const Data = {
        title: postData.title,
        body: postData.body
    }
    const authConfig = {
        headers: {
            Authorization : localStorage.getItem('token')
        }
    }
    axios.post('http://127.0.0.1:8000/api/note/', Data, authConfig)
    .then(res => dispatch({
        type: NEW_POST,
        payload: res.data
    }))
    .catch(error => console.log(error));
}

export const deletePost = (id) => dispatch =>{
    const authConfig = {
        headers: {
            Authorization : localStorage.getItem('token')
        }
    }
    axios.delete(`http://127.0.0.1:8000/api/note/${id}/`, authConfig)
    .then(res => dispatch({
        type: DELETE_POST,
        payload: id
    }))
    .catch(error => console.log(error.response.data));


}