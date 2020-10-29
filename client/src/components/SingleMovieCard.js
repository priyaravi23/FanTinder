import React, { useEffect } from 'react';

// import bootstrap-react components
import { Accordion, Button, Card, ResponsiveEmbed } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

// import utils
import Auth from '../utils/auth';
import { useFantinderContext } from "../utils/GlobalState";

const SingleMovieCard = (props) => {
    const [state, dispatch] = useFantinderContext();
    const { likedMovies, dislikedMovies } = state;
    const {
        movie,
        displayTrailer,
        likeMovieHandler,
        dislikeMovieHandler
    } = props;

    return (
        <Accordion>
            <Card>
                {displayTrailer && movie.trailer
                    ? <ResponsiveEmbed aspectRatio="16by9">
                        <iframe
                            title={movie._id}
                            width="560"
                            height="315"
                            src={movie.trailer}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </ResponsiveEmbed>
                    : (movie.poster && <Card.Img src={movie.poster} alt={`The cover for ${movie.title}`} variant='top' />)
                }
                <Card.Body>
                    <Card.Title>
                      {movie.title}
                    </Card.Title>
                    {movie.rating &&
                        <>
                            <StarRatings
                            rating={movie.rating/2}
                            numberOfStars={5}
                            name={`${movie._id}-rating`}
                            starDimension="20px"
                            starSpacing="1px"
                            />

                            <Card.Text className='small'>
                                ({movie.voteCount?.toLocaleString()} ratings)
                            </Card.Text>
                        </>
                    }
                    <Accordion.Toggle className="small" as={Card.Link} variant="link" eventKey={movie._id}>
                    Click to expand for more details
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movie._id}>
                        <Card.Body>
                        <Card.Text>Plot Summary</Card.Text>
                        <Card.Text className='small'>{movie.overview}</Card.Text>
                        <Card.Text className='small'>Release Date: {movie.releaseDate}</Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card.Body>
                    {Auth.loggedIn() &&
                        <Card.Footer className="d-flex justify-content-between">
                            <Button
                                className="movie-card-button"
                                disabled={dislikedMovies?.some(dislikedMovie => dislikedMovie._id === movie._id)}
                                variant={dislikedMovies?.some(dislikedMovie => dislikedMovie._id === movie._id) ? "outline-secondary" : "outline-danger"}
                                onClick={() => dislikeMovieHandler(movie._id)}>
                                <i className='far fa-thumbs-down fa-2x' />
                            </Button>
                            <Button
                                className="movie-card-button"
                                disabled={likedMovies?.some(likedMovie => likedMovie._id === movie._id)}
                                variant={likedMovies?.some(likedMovie => likedMovie._id === movie._id) ? "outline-secondary" : "outline-success"}
                                onClick={() => likeMovieHandler(movie._id)}>
                                <i className='far fa-thumbs-up fa-2x' />
                            </Button>
                        </Card.Footer>
                    }
            </Card>
        </Accordion>
    )
}

export default SingleMovieCard;