import React, { useEffect } from 'react';

// import bootstrap-react components
import { Accordion, Button, Card, ResponsiveEmbed } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

// import utils
import Auth from '../utils/auth';

// import GraphQL Dependencies
import { SAVE_MOVIE, REMOVE_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

// import GlobalState dependencies
import { useFantinderContext } from "../utils/GlobalState";
import { ADD_TO_SAVED_MOVIES, REMOVE_FROM_SAVED_MOVIES } from '../utils/actions';

const MovieCard = (props) => {
    const {
        movie,
        displayTrailer,
        deleteBtn,
        saveBtn
    } = props;

    // set up global state
    const [state, dispatch] = useFantinderContext();
    const { savedMovies } = state;
    const savedMovieIds = savedMovies?.map(movie => movie.movieId)

    // update the db
    const [removeMovie, { removeError }] = useMutation(REMOVE_MOVIE);
    const [saveMovie, { saveError }] = useMutation(SAVE_MOVIE);

    const handleSaveMovie = async (movie) => {
        dispatch({
            type: ADD_TO_SAVED_MOVIES,
            movieToSave: movie
        });
    };

    const handleRemoveMovie = async (movieId) => {
        dispatch({
            type: REMOVE_FROM_SAVED_MOVIES,
            movieId: movieId
        });
    };

    return (
        <Accordion>
            <Card key={movie.movieId}>
                {movie.trailer && displayTrailer
                    ? <ResponsiveEmbed aspectRatio="16by9">
                        <iframe title={movie.movieId} width="560" height="315" src={movie.trailer} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </ResponsiveEmbed>
                    : <Card.Img src={movie.image} alt={`The cover for ${movie.name}`} variant='top' />
                }
                <Card.Body>
                    <Card.Title>
                      {movie.name}
                    </Card.Title>
                    <StarRatings
                      rating={movie.vote/2}
                      numberOfStars={5}
                      name={`${movie.movieId}-rating`}
                      starDimension="20px"
                      starSpacing="1px"
                    />
                    <Card.Text className='small'>
                      {/* ({movie} ratings) */}
                    </Card.Text>
                    <Accordion.Toggle className="small" as={Card.Link} variant="link" eventKey={movie.movieId}>
                    Click to expand for more details
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movie.movieId}>
                        <Card.Body>
                        <Card.Text>Plot Summary</Card.Text>
                        <Card.Text className='small'>{movie.overview}</Card.Text>
                        <Card.Text className='small'>Release Date: {movie.release}</Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card.Body>

                {Auth.loggedIn() &&
                    <Card.Footer className="d-flex justify-content-between">
                       {deleteBtn && 
                        <Button
                            className="movie-card-button"
                            variant="outline-danger"
                            onClick={() => handleRemoveMovie(movie.movieId)}>
                            <i className='far fa-thumbs-down fa-2x' />
                        </Button>
                        }
                        {saveBtn && 
                        <Button
                            className="movie-card-button"
                            disabled={savedMovieIds?.some((savedMovie) => savedMovie.movieId === movie.movieId)}
                            variant={savedMovieIds?.some((savedMovie) => savedMovie.movieId === movie.movieId) ? "outline-secondary" : "outline-success" }
                            onClick={() => handleSaveMovie(movie)}>
                            <i className='far fa-thumbs-up fa-2x' />
                        </Button>
                        }
                    </Card.Footer>
                }
            </Card>
        </Accordion>
    )
}

export default MovieCard;