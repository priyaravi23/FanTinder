import React, { useEffect } from 'react';

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
import { UPDATE_SAVED_MOVIES } from '../utils/actions';

// import indexedDB dependencies
import { idbPromise } from "../utils/helpers";

const MovieCards = (props) => {
    const [state, dispatch] = useFantinderContext();
    const [removeMovie, { removeError }] = useMutation(REMOVE_MOVIE);
    const [saveMovie, { saveError }] = useMutation(SAVE_MOVIE);
    const { loading, data } = useQuery(GET_USER);
    const { moviesToDisplay , displayTrailers } = props;

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_SAVED_MOVIES,
                savedMovies: data.me.savedMovies
            })
    
        data.me.savedMovies.forEach((movie) => {
            idbPromise('savedMovies', 'put', movie);
        });
        // add else if to check if `loading` is undefined in `useQuery()` Hook
        } else if (!loading) {
        // since we're offline, get all of the data from the `savedMovies` store
        idbPromise('savedMovies', 'get').then((savedMovies) => {
            // use retrieved data to set global state for offline browsing
            dispatch({
                type: UPDATE_SAVED_MOVIES,
                savedMovies: savedMovies
            });
        });
        }
    }, [data, loading, dispatch]);

    const handleSaveMovie = async (movie) => {
        try {
            // update the db
            const { data } = await saveMovie({
                variables: { input: movie }
            });

            // get savedMovies from the updated User
            const { saveMovie: saveMovieData } = data;
            const { savedMovies: updatedSavedMovies } = saveMovieData;

            if (saveError) {
                throw new Error('Something went wrong!');
            }

            // update global state
            dispatch({
                type: UPDATE_SAVED_MOVIES,
                savedMovies: updatedSavedMovies
            });

            idbPromise('savedMovies', 'put', { ...movie });
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveMovie = async (movie) => {
        try {
            // update the db
            const { data } = await removeMovie({
                variables: { movieId: movie.movieId }
            });

            // get savedMovies from the updated User
            const { removeMovie: saveMovieData } = data;
            const { savedMovies: updatedSavedMovies } = saveMovieData;

            if (removeError) {
                throw new Error('Something went wrong!');
            }

            // update global state
            dispatch({
                type: UPDATE_SAVED_MOVIES,
                savedMovies: updatedSavedMovies
            });

            idbPromise('savedMovies', 'delete', { ...movie });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <CardColumns>
            {moviesToDisplay.map((movie) => {
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