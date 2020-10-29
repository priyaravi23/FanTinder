import React, { useEffect, useState } from 'react';

// import TMDB API dependencies
import { getTrendingMovies } from '../utils/API';

// import GraphQL Dependencies
import { DISLIKE_MOVIE, LIKE_MOVIE, ADD_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

// import GlobalState dependencies
import { useFantinderContext } from "../utils/GlobalState";
import {
    ADD_TO_MOVIES,
    UPDATE_DISLIKED_MOVIES,
    UPDATE_LIKED_MOVIES,
    UPDATE_MOVIES
} from '../utils/actions';

// import components
import { Container, Jumbotron } from 'react-bootstrap';
import SingleMovieCard from '../components/SingleMovieCard';

// import indexedDB dependencies
import { idbPromise } from "../utils/helpers";
import { cleanMovieData } from '../utils/movieData';

import Auth from '../utils/auth';

const Homepage = () => {
    const [state, dispatch] = useFantinderContext();
    const { movies, likedMovies, dislikedMovies } = state

    const [displayedMovie, setDisplayedMovie] = useState('');
    const [displayedMovieIndex, setDisplayedMovieIndex] = useState('');

    const [dislikeMovie, { dislikeError }] = useMutation(DISLIKE_MOVIE);
    const [likeMovie, { likeError }] = useMutation(LIKE_MOVIE);
    const [addMovie, { addMovieError }] = useMutation(ADD_MOVIE);

    useEffect(() => {
        if (!movies.length) {
            async function fetchData() {
                // get trending movies from the movie database API
                const response = await getTrendingMovies('week');

                if (!response.ok) {
                    throw new Error("Couldn't load trending movies.");
                }

                const { results } = await response.json();
        
                // reformat the data
                const cleanedMovieData = await cleanMovieData(results);

                // store the data in the db, global state, and idb
                cleanedMovieData.forEach(async movie => {
                    // add the movie to the db
                    const { data } = await addMovie({
                        variables: { input: movie }
                    })

                    if (addMovieError) {
                        throw new Error("Could not create a new movie");
                    }

                    const { addMovie: newMovie } = data;

                    // update state.movies
                    dispatch({
                        type: ADD_TO_MOVIES,
                        movie: newMovie
                    })

                    // add to idb
                    idbPromise('movies', 'put', newMovie);
                })
            }
            fetchData();
        }
    }, [movies.length, dispatch, addMovie, addMovieError, dislikedMovies, likedMovies]);

    useEffect(() => {
        // if there's no displayedMovie, we need to set it.
        if (!displayedMovie && movies.length) {

            // figure out where to start iterating
            const startIndex = displayedMovieIndex ? displayedMovieIndex + 1: 0;

            // set the displayedMovie to the first movie in movies that has not been liked or disliked
            for (let i = startIndex; i < movies.length; i++) {
                let movieToTest = movies[i];

                const likedMovie = likedMovies.includes(movieToTest._id);
                const dislikedMovie = dislikedMovies.includes(movieToTest._id);

                // stop iterating as soon as there's a match
                if (!likedMovie && !dislikedMovie) {
                    setDisplayedMovieIndex(i);
                    break;
                }
            }
        }

    }, [displayedMovie, setDisplayedMovieIndex, movies.length])


    const handleLikeMovie = async (likedMovieId) => {
        try {
            // update the db
            let { data } = await likeMovie({
                variables: { movieId: likedMovieId }
            });

            // throw an error if the mutation failed
            if (likeError) {
                throw new Error('Something went wrong!');
            }
            
            // remove the movie from moviesToDisplay
            const filteredMovies = await movies.filter(movie => movie._id !== likedMovieId);
            const likedMovieIds = await data.likeMovie.likedMovies.map(movie => movie._id);
            const dislikedMovieIds = await data.likeMovie.dislikedMovies.map(movie => movie._id);

            // update global state
            dispatch({
                type: UPDATE_LIKED_MOVIES,
                likedMovies: likedMovieIds
            });
            dispatch({
                type: UPDATE_DISLIKED_MOVIES,
                dislikedMovies: dislikedMovieIds
            });
            dispatch({
                type: UPDATE_MOVIES,
                movies: filteredMovies
            });

            // update idb
            idbPromise('likedMovies', 'put', {_id: likedMovieId });
            idbPromise('dislikedMovies', 'delete', {_id: likedMovieId});

            // update movie displayed
            for (let i = displayedMovieIndex + 1; i < movies.length; i++) {
                let movieToTest = movies[i];

                const likedMovie = likedMovie.includes(movieToTest._id);
                const dislikedMovie = dislikedMovies.includes(movieToTest._id);

                // stop iterating as soon as there's a match
                if (!likedMovie && !dislikedMovie) {
                    setDisplayedMovieIndex(i);
                    break;
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDislikeMovie = async (dislikedMovieId) => {
        try {
            // update the db
            let { data } = await dislikeMovie({
                variables: { movieId: dislikedMovieId }
            });

            // throw an error if the mutation failed
            if (dislikeError) {
                throw new Error('Something went wrong!');
            }
            
            // remove the movie from moviesToDisplay
            const filteredMovies = await movies.filter(movie => movie._id !== dislikedMovieId);

            // update global state
            dispatch({
                type: UPDATE_LIKED_MOVIES,
                likedMovies: data.dislikeMovie.likedMovies
            });
            dispatch({
                type: UPDATE_DISLIKED_MOVIES,
                dislikedMovies: data.dislikeMovie.dislikedMovies
            });
            dispatch({
                type: UPDATE_MOVIES,
                movies: filteredMovies
            });

            // update idb
            idbPromise('dislikedMovies', 'put', { _id: dislikedMovieId });
            idbPromise('likedMovies', 'delete', { _id: dislikedMovieId });

            // update movie displayed
            for (let i = displayedMovieIndex + 1; i < movies.length; i++) {
                let movieToTest = movies[i];

                const likedMovie = likedMovie.includes(movieToTest._id);
                const dislikedMovie = dislikedMovies.includes(movieToTest._id);

                // stop iterating as soon as there's a match
                if (!likedMovie && !dislikedMovie) {
                    setDisplayedMovieIndex(i);
                    break;
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSkipMovie = () => {
        // update movie displayed
        for (let i = displayedMovieIndex + 1; i < movies.length; i++) {
            let movieToTest = movies[i];

            const likedMovie = likedMovies.includes(movieToTest._id);
            const dislikedMovie = dislikedMovies.includes(movieToTest._id);

            // stop iterating as soon as there's a match
            if (!likedMovie && !dislikedMovie) {
                setDisplayedMovieIndex(i);
                break;
            }
        }
    }
    
    return(
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container className="text-center">
                    <h1>Welcome to FANTINDER!</h1>
                    {Auth.loggedIn()
                        ? <h4>Click thumbs up to like and save a movie, thumbs down to pass.</h4>
                        : <h4>Check out our recommended movies.</h4>
                    }
                </Container>
            </Jumbotron>

            <Container className="home-movie-container">
                {movies[displayedMovieIndex] &&
                    <SingleMovieCard
                        movie={movies[displayedMovieIndex]}
                        displayTrailer
                        displaySkip
                        likeMovieHandler={handleLikeMovie}
                        dislikeMovieHandler={handleDislikeMovie}
                        skipMovieHandler={handleSkipMovie}
                    />
                }
            </Container>
        </>
    );
}

export default Homepage;