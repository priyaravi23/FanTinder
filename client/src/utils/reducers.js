import { useReducer } from 'react';

import { 
    ADD_TO_REMOVED_MOVIES,
    ADD_TO_SAVED_MOVIES,
    UPDATE_MOVIES_TO_DISPLAY,
    UPDATE_REMOVED_MOVIES,
    UPDATE_SAVED_MOVIES }
from '../utils/actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_REMOVED_MOVIES:
            return {
                ...state,
                savedMovies: state.savedMovies.filter(savedMovie => savedMovie.movieId !== action.movie.movieId),
                moviesToDisplay: state.moviesToDisplay.filter(movieToDisplay => movieToDisplay.movieId !== action.movie.movieId),
                removedMovies: [...state.removedMovies, action.movie]
            }
        case ADD_TO_SAVED_MOVIES:
            return {
                ...state,
                savedMovies: [...state.savedMovies, action.movie],
                moviesToDisplay: state.moviesToDisplay.filter(movieToDisplay => movieToDisplay.movieId !== action.movie.movieId),
                removedMovies: state.removedMovies.filter(removedMovie => removedMovie.movieId !== action.movie.movieId)
            }
        case UPDATE_MOVIES_TO_DISPLAY:
            return {
                ...state,
                moviesToDisplay: action.moviesToDisplay
            }
        case UPDATE_REMOVED_MOVIES:
            return {
                ...state,
                removedMovies: action.removedMovies
            }
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