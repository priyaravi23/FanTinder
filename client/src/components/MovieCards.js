import React, { useEffect, useState } from 'react';

// import react-bootstrap components
import { CardColumns } from 'react-bootstrap';

// import custom components
import SingleMovieCard from './SingleMovieCard'

// import GraphQL Dependencies
import { DISLIKE_MOVIE, LIKE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries'
import { useMutation, useQuery } from '@apollo/react-hooks';

// import GlobalState dependencies
import { useFantinderContext } from "../utils/GlobalState";
import {
    UPDATE_DISLIKED_MOVIES,
    UPDATE_LIKED_MOVIES
} from '../utils/actions';

// import indexedDB dependencies
import { idbPromise } from "../utils/helpers";

const MovieCards = (props) => {
    const [, dispatch] = useFantinderContext();
    const [displayedMovies, setDisplayedMovies] = useState([]);
    const [dislikeMovie, { dislikeError }] = useMutation(DISLIKE_MOVIE);
    const [likeMovie, { likeError }] = useMutation(LIKE_MOVIE);
    const { loading, data } = useQuery(GET_USER);

    const { moviesToDisplay, displayTrailers, removeMoviesOnDislike } = props;

    // update the movies to displayf
    useEffect(() => {
        if (moviesToDisplay.length) {
            setDisplayedMovies(moviesToDisplay);
        }
    }, [moviesToDisplay, setDisplayedMovies])

    // get the movie preferences for the current user to handle like/dislike functionality
    useEffect(() => {
        if (data && data.me) {
            // get rid of __typename
            const dislikedMovieIds = data.me.dislikedMovies.map(dislikedMovie => dislikedMovie._id);
            const likedMovieIds = data.me.likedMovies.map(likedMovie => likedMovie._id);

            dispatch({
                type: UPDATE_DISLIKED_MOVIES,
                dislikedMovies: dislikedMovieIds
            })

            dispatch({
                type: UPDATE_LIKED_MOVIES,
                likedMovies: likedMovieIds
            })

            data.me.dislikedMovies.forEach((movie) => {
                idbPromise('dislikedMovies', 'put', movie);
            });
    
            data.me.likedMovies.forEach((movie) => {
                idbPromise('likedMovies', 'put', movie);
            });
        } else if (!loading) {
            idbPromise('dislikedMovies', 'get').then(dislikedMovies => {
              dispatch({
                type: UPDATE_DISLIKED_MOVIES,
                dislikedMovies: dislikedMovies
              });
            });

            idbPromise('likedMovies', 'get').then(likedMovies => {
              dispatch({
                type: UPDATE_LIKED_MOVIES,
                likedMovies: likedMovies
              });
            });
          }
    }, [data, loading, dispatch]);

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

            // update idb
            idbPromise('likedMovies', 'put', {_id: likedMovieId });
            idbPromise('dislikedMovies', 'delete', {_id: likedMovieId});
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

            const likedMovieIds = await data.dislikeMovie.likedMovies.map(movie => movie._id);
            const dislikedMovieIds = await data.dislikeMovie.dislikedMovies.map(movie => movie._id);

            // update global state
            dispatch({
                type: UPDATE_LIKED_MOVIES,
                likedMovies: likedMovieIds
            });
            dispatch({
                type: UPDATE_DISLIKED_MOVIES,
                dislikedMovies: dislikedMovieIds
            });

            // update idb
            idbPromise('dislikedMovies', 'put', { _id: dislikedMovieId });
            idbPromise('likedMovies', 'delete', { _id: dislikedMovieId });

            if (removeMoviesOnDislike) {
                // remove the movie from moviesToDisplay
                const filteredMovies = moviesToDisplay.filter(movie => movie._id !== dislikedMovieId)
                setDisplayedMovies(filteredMovies);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <CardColumns>
            {displayedMovies?.map(movie => {
                return (
                    <SingleMovieCard
                        key={movie.movie_id}
                        displayTrailer={displayTrailers}
                        movie={movie}
                        likeMovieHandler={handleLikeMovie}
                        dislikeMovieHandler={handleDislikeMovie}
                        />
                    )
                })
            }
        </CardColumns>
    )
}

export default MovieCards;