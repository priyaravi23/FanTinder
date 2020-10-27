import React, { useEffect, useState } from 'react';

// import TMDB API dependencies
import { getTrendingMovies } from '../utils/API';

// import GraphQL Dependencies
import { SAVE_MOVIE, REMOVE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';

// import GlobalState dependencies
import { useFantinderContext } from "../utils/GlobalState";
import { 
    ADD_TO_REMOVED_MOVIES,
    ADD_TO_SAVED_MOVIES,
    UPDATE_MOVIES_TO_DISPLAY,
    UPDATE_REMOVED_MOVIES,
    UPDATE_SAVED_MOVIES }
from '../utils/actions';

// import components
import { Container, Jumbotron } from 'react-bootstrap';
import SingleMovieCard from '../components/SingleMovieCard';

// import indexedDB dependencies
import { idbPromise } from "../utils/helpers";

const Homepage = () => {
    const [state, dispatch] = useFantinderContext();
    const [movies, setMovies] = useState([]);
    const [displayedMovie, setDisplayedMovie] = useState('');

    const [removeMovie, { removeError }] = useMutation(REMOVE_MOVIE);
    const [saveMovie, { saveError }] = useMutation(SAVE_MOVIE);
    const { loading, data } = useQuery(GET_USER);

    useEffect(() => {
        if (!movies[0]) {
            // get the trending movies
            getTrendingMovies('day', setMovies);
        } else {
            const filteredMovies = movies.filter(movie => {
                const isSaved = state.savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId);
                const isRemoved = state.removedMovies.some(removedMovieId => removedMovieId === movie.movieId);
 
                return !isSaved && !isRemoved
            })

            dispatch({
                type: UPDATE_MOVIES_TO_DISPLAY,
                moviesToDisplay: filteredMovies
            })
            
            filteredMovies.forEach((movie) => {
                idbPromise('moviesToDisplay', 'put', movie);
            });

            setDisplayedMovie(filteredMovies[0]);
        }
    }, [movies, state.savedMovies, state.removedMovies])

    // get the movies from The Movie Database endpoints
    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_REMOVED_MOVIES,
                removedMovies: data.me.removedMovies
            })

            dispatch({
                type: UPDATE_SAVED_MOVIES,
                savedMovies: data.me.savedMovies
            })

            data.me.removedMovies.forEach((movieId) => {
                idbPromise('removedMovies', 'put', { movieId });
            });
    
            data.me.savedMovies.forEach((movie) => {
                idbPromise('savedMovies', 'put', movie);
            });
        // add else if to check if `loading` is undefined in `useQuery()` Hook (meaning we're offline)
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

            idbPromise('moviesToDisplay', 'get').then((moviesToDisplay) => {
                dispatch({
                    type: UPDATE_MOVIES_TO_DISPLAY,
                    moviesToDisplay: moviesToDisplay
                });
            })  
        }
    }, [data, loading, dispatch]);

    const handleSaveMovie = async (movie) => {
        try {
            // update the db
            const { data } = await saveMovie({
                variables: { input: movie }
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
            idbPromise('moviesToDisplay', 'delete', movie);
            idbPromise('removedMovies', 'delete', { movieId: movie.movieId });

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

    const handleRemoveMovie = async (movie) => {
        try {
            // update the db
            const { data } = await removeMovie({
                variables: { movieId: movie.movieId }
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
            idbPromise('removedMovies', 'put', { movieId: movie.movieId });

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

    const handleSkipMovie = async ( ) => {
        // update the movies to display
        if (movies.length > 1) {
            const updatedMovies = await movies.slice(1);
            updatedMovies.push(displayedMovie);
            setMovies(updatedMovies); // this isn't working
        } else {
            console.log('no more movies!');
        }
    };

    return(
        <>
            <Jumbotron fluid className="text-light">
                <Container>
                    <h1>Discover new movies below!</h1>
                    <ul>
                        <li>Click the thumbs up icon to save a movie and the thumbs down icon to indicate disinterest.</li>
                        <li>Click the right arrow to skip ahead.</li>
                        <li>If a trailer is available, you'll see it on the card!</li>
                    </ul>
                </Container>
            </Jumbotron>

            <Container className="home-movie-container">
                {displayedMovie
                    ? <SingleMovieCard
                        displayTrailer
                        displaySkipButton
                        movie={displayedMovie}
                        saveMovieHandler={handleSaveMovie}
                        skipMovieHandler={handleSkipMovie}
                        removeMovieHandler={handleRemoveMovie}
                        disabled={state.savedMovies?.some((savedMovie) => savedMovie.movieId === displayedMovie.movieId)}
                        btnColor={state.savedMovies?.some((savedMovie) => savedMovie.movieId === displayedMovie.movieId) ? "outline-secondary" : "outline-success" } />
                    : <h2>No more movies to display! Check back tomorrow.</h2>
                }
            </Container>
        </>
    );
}

export default Homepage;