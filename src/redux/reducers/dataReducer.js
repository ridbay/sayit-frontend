import {
    SET_SAYITS,
    LOADING_DATA,
    LIKE_SAYIT,
    UNLIKE_SAYIT,
    DELETE_SAYIT,
    POST_SAYIT,
    SET_SAYIT,
    SUBMIT_COMMENT

} from '../types';
const initialState = {
    sayits: [],
    sayit: {},
    loading: false,
};
export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SAYITS:
            return {
                ...state,
                sayits: action.payload,
                loading: false,
            }
        case SET_SAYIT:
            return {
                ...state,
                sayit: action.payload
            }
        case LIKE_SAYIT:
        case UNLIKE_SAYIT:
            let index = state.sayits.findIndex((sayit) => sayit.sayitId === action.payload.sayitId);
            state.sayits[index] = action.payload;
            if(state.sayit.sayitId === action.payload.sayitId){
                state.sayit = action.payload
            }
            return {
                ...state
            };
        case DELETE_SAYIT:
            index = state.sayits.findIndex(sayit => sayit.sayitId === action.payload);
            state.sayits.splice(index, 1);
            return {
                ...state
            }
        case POST_SAYIT:
            return {
                ...state,
                sayits: [
                    action.payload,
                    ...state.sayits
                ]
            }
            case SUBMIT_COMMENT: 
            return {
                ...state,
                sayit: {
                    ...state.sayit,
                    comments: [action.payload, ...state.sayit.comments]
                }
            }
        default:
            return state;

    }
}