import React, { useEffect } from 'react';
// Components
import { Jumbotron, Container } from 'react-bootstrap';
import MovieCards from '../components/MovieCards';
// GraphQL
import { GET_USER } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
// Global State
import { useFantinderContext } from "../utils/GlobalState";
import { UPDATE_LIKED_MOVIES, UPDATE_MOVIES } from '../utils/actions';
// IDB
import { idbPromise } from "../utils/helpers";

const SavedMovies = () => {
    const [state, dispatch] = useFantinderContext();
    const { movies, likedMovies } = state;
    const { loading, data } = useQuery(GET_USER);

    useEffect(() => {
        if (data) {
            // get rid of __typename
            const likedMovieIds = data.me.likedMovies.map(likedMovie => ({_id: likedMovie._id }));

            // update state.likedMovies
            dispatch({
                type: UPDATE_LIKED_MOVIES,
                likedMovies: likedMovieIds
            })

            // update idb likedMovies
            likedMovieIds.forEach(likedMovieId => {
                idbPromise('likedMovies', 'put', likedMovieId)
            })
        }
    }, [data, loading, dispatch]);

    useEffect(() => {
        if (!movies.length > 0) {
            idbPromise('movies', 'get').then(movies => {
                dispatch({
                  type: UPDATE_MOVIES,
                  movies: movies
                });
            });
        }
    }, [data, loading, dispatch, movies.length]);

    return (
        <>
            <Jumbotron fluid className="text-light bg-dark">
                <Container>
                    { loading 
                        ? <h1>Loading your saved movies...</h1>
                        : <h1>Your Saved Movies</h1>
                    }
                </Container>
            </Jumbotron>
            <Container>
                { likedMovies.length
                    ?   <>
                            <h2>{`Viewing ${likedMovies.length} saved ${likedMovies.length === 1 ? 'movie' : 'movies'}:`}</h2>
                            <MovieCards
                                moviesToDisplay={movies.filter(movie => likedMovies.some(likedMovie => likedMovie._id === movie._id))}
                                displayTrailers />
                        </>
                    :   <h2>You have no saved movies!</h2>
                }
            </Container>
        </>
    );
};

export default SavedMovies;