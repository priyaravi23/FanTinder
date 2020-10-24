import {
    UPDATE_SAVED_MOVIES
} from "./actions";
  
export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_SAVED_MOVIES:
            return {
            ...state,
            savedMovies: [...action.savedMovies],
        };
        default:
            return state;
    }
};