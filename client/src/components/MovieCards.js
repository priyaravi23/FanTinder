import React, { useEffect, useState } from 'react';

// import react-bootstrap components
import { CardColumns } from 'react-bootstrap';

// import custom components
import SingleMovieCard from './SingleMovieCard'

// import GraphQL Dependencies
import { SAVE_MOVIE, REMOVE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';

// import GlobalState dependencies
import { useFantinderContext } from "../utils/GlobalState";
import { 
    ADD_TO_REMOVED_MOVIES,
    ADD_TO_SAVED_MOVIES,
    UPDATE_REMOVED_MOVIES,
    UPDATE_SAVED_MOVIES }
from '../utils/actions';

// import indexedDB dependencies
import { idbPromise } from "../utils/helpers";

const MovieCards = (props) => {
    const { moviesToDisplay, displayTrailers } = props;
    const [state, dispatch] = useFantinderContext();

    const [removeMovie, { removeError }] = useMutation(REMOVE_MOVIE);
    const [saveMovie, { saveError }] = useMutation(SAVE_MOVIE);
    const [movies, setMovies] = useState([]);
    const { loading, data } = useQuery(GET_USER);

    useEffect(() => {
        if (moviesToDisplay) {
            setMovies(moviesToDisplay);
        }
    }, [moviesToDisplay])


    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_REMOVED_MOVIES,
                removedMovies: data.me.removedMovies
            })

            dispatch({
                type: UPDATE_SAVED_MOVIES,
                savedMovies: data.me.savedMovies
            })

            data.me.removedMovies.forEach((movie) => {
                idbPromise('removedMovies', 'put', movie);
            });
    
            data.me.savedMovies.forEach((movie) => {
                idbPromise('savedMovies', 'put', movie);
            });
        // add else if to check if `loading` is undefined in `useQuery()` Hook
        } else if (!loading) {
            idbPromise('removedMovies', 'get').then((removedMovies) => {
                dispatch({
                    type: UPDATE_REMOVED_MOVIES,
                    removedMovies: removedMovies
                });
            });

            idbPromise('savedMovies', 'get').then((savedMovies) => {
                dispatch({
                    type: UPDATE_SAVED_MOVIES,
                    savedMovies: savedMovies
                });
            })
        }
    }, [data, loading, dispatch]);

    const handleSaveMovie = async (movie) => {
        const { __typename, ...movieNoTypename }= movie;
        try {
            // update the db
            const { data } = await saveMovie({
                variables: { input: movieNoTypename}
            });

            if (saveError) {
                throw new Error('Something went wrong!');
            }

            // update global state
            dispatch({
                type: ADD_TO_SAVED_MOVIES,
                movie: movie
            });

            idbPromise('savedMovies', 'put', movie);
            idbPromise('moviesToDisplay', 'delete', { ...movie });
            idbPromise('removedMovies', 'delete', { ...movie });
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveMovie = async (movie) => {
        const { __typename, ...movieNoTypename } = movie;
        try {
            // update the db
            const { data } = await removeMovie({
                variables: { input: movieNoTypename}
            });

            if (removeError) {
                throw new Error('Something went wrong!');
            }

            // update global state
            dispatch({
                type: ADD_TO_REMOVED_MOVIES,
                movie: movie
            });

            idbPromise('savedMovies', 'delete', { ...movie });
            idbPromise('moviesToDisplay', 'delete', { ...movie });
            idbPromise('removedMovies', 'put', movie);

            // update the movies to display
            if (movies.length > 1) {
                const updatedMovies = await movies.slice(1);
                setMovies(updatedMovies);
            } else {
                console.log('no more movies!');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <CardColumns>
            {movies?.map((movie) => {
                return (
                    <SingleMovieCard
                        key={movie.movieId}
                        displayTrailer={displayTrailers}
                        movie={movie}
                        saveMovieHandler={handleSaveMovie}
                        removeMovieHandler={handleRemoveMovie}
                        disabled={state.savedMovies?.some((savedMovie) => savedMovie.movieId === movie.movieId)}
                        btnColor={state.savedMovies?.some((savedMovie) => savedMovie.movieId === movie.movieId) ? "outline-secondary" : "outline-success" }
                        />
                    )
                })
            }
        </CardColumns>
    )
}

export default MovieCards;