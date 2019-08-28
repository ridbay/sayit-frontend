import { SET_SAYITS, LOADING_DATA, LIKE_SAYIT, UNLIKE_SAYIT, SET_ERRORS } from '../types';
import axios from 'axios';
// get all sayits 
export const getSayits = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get('/sayits')
    .then(res => {
        dispatch({
            type: SET_SAYITS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: []
        })
    })
}

// like a sayit 
export const likeSayit = (sayitId) => dispatch => {
    axios.get(`/sayit/${sayitId}/like`)
    .then(res=> {
        dispatch({
           type: LIKE_SAYIT,
           payload: res.data 
        })
    })
    .catch(err => console.log(err))
}
// unlike a sayit 
export const unlikeSayit = (sayitId) => dispatch  => {
    axios.get(`/sayit/${sayitId}/unlike`)
    .then(res=> {
        dispatch({
           type: UNLIKE_SAYIT,
           payload: res.data 
        })
    })
    .catch(err => console.log(err))
}