import {
    SET_SAYITS,
    LOADING_DATA,
    LIKE_SAYIT,
    UNLIKE_SAYIT,
    SET_ERRORS,
    DELETE_SAYIT

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
        case LIKE_SAYIT:
        case UNLIKE_SAYIT:
            let index = state.sayits.findIndex((sayit) => sayit.sayitId === action.payload.sayitId);
            state.sayits[index] = action.payload;
            return {
                ...state
            };
        case DELETE_SAYIT:
            index = state.sayits.findIndex(sayit => sayit.sayitId === action.payload);
            state.sayits.splice(index, 1);
            return {
                ...state
            }
        default:
            return state;

    }
}