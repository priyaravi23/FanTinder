import { useReducer } from 'react';

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

export function useMovieReducer(initialState) {
    return useReducer(reducer, initialState);
}