import React, { useEffect } from 'react';

// import TMDB API dependencies
import { getTrendingMovies } from '../utils/API';

// import GraphQL Dependencies
import { ADD_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

// import GlobalState dependencies
import { useFantinderContext } from "../utils/GlobalState";
import { ADD_TO_MOVIES } from '../utils/actions';

// import components
import { Container, Jumbotron } from 'react-bootstrap';
import MovieCards from '../components/MovieCards';

// import indexedDB dependencies
import { idbPromise } from "../utils/helpers";
import { cleanMovieData } from '../utils/movieData';

const Homepage = () => {
    const [state, dispatch] = useFantinderContext();
    const { movies, likedMovies, dislikedMovies } = state
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

                // only add movies the user hasn't liked/disliked
                const filteredResults = await results.filter(movie => {
                    const likedMovie = likedMovies.includes(movie._id);
                    const dislikedMovie = dislikedMovies.includes(movie._id);

                    return !likedMovie && !dislikedMovie
                })

                // reformat the data
                const cleanedMovieData = await cleanMovieData(filteredResults);

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

    return(
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container className="text-center">
                    <h1>Welcome to FANTINDER!</h1>

                </Container>
            </Jumbotron>

            <Container className="home-movie-container">
                <div className="pb-5">
                    <h3>Movies trending this week:</h3>
                </div>

                {movies.length &&
                    <MovieCards
                        displayTrailers
                        moviesToDisplay={movies}
                    />
                }
                <h4 className="text-center p-5 m-5">You've reached the end of our movie list! Check back later for more recommendations.</h4>
            </Container>
        </>
    );
}

export default Homepage;