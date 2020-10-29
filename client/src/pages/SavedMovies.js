import React, { useEffect, useState } from 'react';
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
    const [likedMovies, setLikedMovies] = useState([]);
    const { loading, data } = useQuery(GET_USER);

    useEffect(() => {
        if (data) {
            async function updateLikedMovies() {
                // get rid of __typename
                const likedMovieIds = await data.me.likedMovies.map(likedMovie => likedMovie._id);

                // update state.likedMovies
                dispatch({
                    type: UPDATE_LIKED_MOVIES,
                    likedMovies: likedMovieIds
                })

                // update idb likedMovies
                likedMovieIds.forEach(likedMovieId => {
                    idbPromise('likedMovies', 'put', { _id: likedMovieId })
                })

                // update local state
                setLikedMovies(data.me.likedMovies);
            }
            updateLikedMovies();
        }
    }, [data, loading, dispatch]);

    useEffect(() => {
        if (!state.movies.length > 0) {
            idbPromise('movies', 'get').then(movies => {
                dispatch({
                  type: UPDATE_MOVIES,
                  movies: movies
                });
            });
        }
    }, [data, loading, dispatch, state.movies.length]);

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
                {likedMovies
                    ?   <>
                            <h2>{`Viewing ${likedMovies.length} saved ${likedMovies.length === 1 ? 'movie' : 'movies'}:`}</h2>
                            <MovieCards
                                moviesToDisplay={likedMovies}
                                displayTrailers />
                        </>
                    :   <h2>You have no saved movies!</h2>
                }
            </Container>
        </>
    );
};

export default SavedMovies;