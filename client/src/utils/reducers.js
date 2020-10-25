import { useReducer } from 'react';

import {
    ADD_TO_SAVED_MOVIES,
    REMOVE_FROM_SAVED_MOVIES,
    UPDATE_SAVED_MOVIES
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_SAVED_MOVIES:
            let saveMovieState;
            // possible there are no savedMovies
            if (state.savedMovies) {
                saveMovieState = [...state.savedMovies, action.movieToSave]
            } else {
                saveMovieState = [action.savedMovies];
            }

            return {
                ...state,
                savedMovies: saveMovieState
            };
        case REMOVE_FROM_SAVED_MOVIES:
            let removeMovieState

            // possible there are no savedMovies
            if (state.savedMovies) {
                removeMovieState = state.savedMovies.filter(movie => {
                  return movie.movieId !== action.movieId;
                });
            } else {
                removeMovieState = []
            }

            return {
                ...state,
                savedMovies: removeMovieState
            };
        case UPDATE_SAVED_MOVIES:
            return {
                ...state,
                savedMovies: action.savedMovies
            }
        default:
            return state ? state : '';
    }
};

export function useMovieReducer(initialState) {
    return useReducer(reducer, initialState);
}