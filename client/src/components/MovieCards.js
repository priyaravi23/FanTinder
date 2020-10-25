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

const MovieCards = (props) => {
    const [state, dispatch] = useFantinderContext();
    const [removeMovie, { removeError }] = useMutation(REMOVE_MOVIE);
    const [saveMovie, { saveError }] = useMutation(SAVE_MOVIE);
    const { loading, data } = useQuery(GET_USER);

    const { moviesToDisplay , displayTrailers } = props;

    useEffect(() => {
        // if there's data to be stored
        if (data) {
          // let's store it in the global state object
          dispatch({
            type: UPDATE_SAVED_MOVIES,
            savedMovies: data.me.savedMovies
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

            console.log({ saveMovieData })
            const { savedMovies: updatedSavedMovies } = saveMovieData;

            if (saveError) {
                throw new Error('Something went wrong!');
            }


            // update global state
            dispatch({
                type: UPDATE_SAVED_MOVIES,
                savedMovies: updatedSavedMovies
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveMovie = async (movieId) => {
        try {
            // update the db
            const { data } = await removeMovie({
                variables: { movieId }
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
        } catch (err) {
            console.error(err);
        }
    };

    return (<CardColumns>
        {moviesToDisplay.map((movie) => {
            return (
                <SingleMovieCard
                    displayTrailer={displayTrailers}
                    movie={movie}
                    saveMovieHandler={handleSaveMovie}
                    removeMovieHandler={handleRemoveMovie}
                    disabled={state.savedMovies?.some((savedMovie) => savedMovie.movieId === movie.movieId)}
                    btnColor={state.savedMovies?.some((savedMovie) => savedMovie.movieId === movie.movieId) ? "outline-secondary" : "outline-success" }
                    />
            )
        })}
    </CardColumns>)
}

export default MovieCards;