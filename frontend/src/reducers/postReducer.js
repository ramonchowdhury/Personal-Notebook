import * as actionTypes from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

const postReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.FETCH_POSTS:
        return {
            ...state,
            items: action.payload
         }
        case actionTypes.NEW_POST:
            return {
                ...state,
                item: action.payload
            } 
        case actionTypes.DELETE_POST:
            return {
                ...state,
                items: state.items.filter(post => {return action.payload !== post.id.toString()})
            }

        default:
         return state;
    }
}
export default postReducer;