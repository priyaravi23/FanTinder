import { useReducer } from 'react';

import { 
    ADD_TO_MOVIES,
    UPDATE_MOVIES,
    ADD_TO_DISLIKED_MOVIES,
    UPDATE_DISLIKED_MOVIES,
    ADD_TO_LIKED_MOVIES,
    UPDATE_LIKED_MOVIES
 }
from '../utils/actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_MOVIES:
            return {
                ...state,
                movies: [...state.movies, action.movie]
            }
        case ADD_TO_LIKED_MOVIES:
            return {
                ...state,
                likedMovies: [...state.likedMovies, action.movieId],
                dislikedMovies: state.dislikedMovies.filter(dislikedMovieId => dislikedMovieId !== action.movieId),
            }
        case ADD_TO_DISLIKED_MOVIES:
            return {
                ...state,
                likedMovies: state.likedMovies.filter(likedMovieId => likedMovieId !== action.movieId),
                dislikedMovies: [...state.dislikedMovies, action.movie],
            }
        case UPDATE_MOVIES:
            return {
                ...state,
                movies: action.movies
            }
        case UPDATE_DISLIKED_MOVIES:
            return {
                ...state,
                dislikedMovies: action.dislikedMovies,
            }
        case UPDATE_LIKED_MOVIES:
            return {
                ...state,
                likedMovies: action.likedMovies,
            }
        default:
            return state ? state : '';
    }
};

export function useMovieReducer(initialState) {
    return useReducer(reducer, initialState);
}