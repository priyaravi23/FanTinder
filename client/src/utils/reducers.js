import { useReducer } from 'react';

import { 
    ADD_TO_MOVIES,
    UPDATE_MOVIES,
    ADD_TO_DISLIKED_MOVIES,
    ADD_TO_LIKED_MOVIES,
    UPDATE_MOVIE_PREFERENCES
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
                likedMovies: [...state.likedMovies, action.movie],
                dislikedMovies: state.dislikedMovies.length === 1 ? [] : state.dislikedMovies.filter(dislikedMovie => dislikedMovie._id !== action.movie._id),
            }
        case ADD_TO_DISLIKED_MOVIES:
            return {
                ...state,
                likedMovies: state.likedMovies.length === 1 ? [] : state.likedMovies.filter(likedMovie => likedMovie._id !== action.movie._id),
                dislikedMovies: [...state.dislikedMovies, action.movie],
            }
        case UPDATE_MOVIES:
            return {
                ...state,
                movies: action.movies
            }
        case UPDATE_MOVIE_PREFERENCES:
            return {
                ...state,
                dislikedMovies: action.dislikedMovies,
                likedMovies: action.likedMovies
            }
        default:
            return state ? state : '';
    }
};

export function useMovieReducer(initialState) {
    return useReducer(reducer, initialState);
}