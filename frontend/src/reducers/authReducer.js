import * as actionTypes from '../actions/types';

const initialState = {
    token: null,
    username: null, 
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token: action.token,
                username: action.username,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token: null,
            }
        case actionTypes.REG_SUCCESS:
            return {
                ...state,
                token: null
            }
        case actionTypes.ERROR:
            return {
                ...state,
                error: null
            }
        default: 
            return state;
    }
}

export default authReducer;