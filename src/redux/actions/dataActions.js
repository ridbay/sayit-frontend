import { 
    SET_SAYITS, 
    LOADING_DATA, 
    LIKE_SAYIT, 
    UNLIKE_SAYIT, 
    SET_ERRORS, 
    DELETE_SAYIT, 
    CLEAR_ERRORS,
    POST_SAYIT,
    LOADING_UI,
    SET_SAYIT,
    STOP_LOADING_UI
} from '../types';
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
export const getSayit = (sayitId) => (dispatch) =>{
    dispatch({type: LOADING_UI})
    axios.get(`/sayit/${sayitId}`)
    .then(res=> {
        dispatch({
            type: SET_SAYIT,
            payload: res.data
        });
        dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => console.log(err))
} 

// Post a Sayit 
export const postSayit = (newSayit) => (dispatch)=> {
    dispatch({type: LOADING_UI})
    axios.post('/sayit', newSayit)
    .then(res => {
        dispatch({
            type: POST_SAYIT,
            payload: res.data
        })
        dispatch({
            type: CLEAR_ERRORS
        })
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
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
};


// Delete a sayit 
export const deleteSayit = (sayitId) => (dispatch) => {
    axios.delete(`/sayits/${sayitId}`)
    .then(()=> {
        dispatch({type: DELETE_SAYIT, payload: sayitId})
    })
    .catch(err => console.log(err));
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS})
}