import React from 'react';

// import bootstrap-react components
import { Accordion, Button, Card, ResponsiveEmbed } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

// import utils
import Auth from '../utils/auth';
import { useFantinderContext } from "../utils/GlobalState";

const SingleMovieCard = (props) => {
    const [state, ] = useFantinderContext();
    const { likedMovies, dislikedMovies } = state;
    const {
        movie,
        displayTrailer,
        likeMovieHandler,
        dislikeMovieHandler,
        skipMovieHandler
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
                    {Auth.loggedIn()
                    ?   
                        <Card.Footer className="d-flex justify-content-between">
                            <Button
                                className="movie-card-button"
                                disabled={dislikedMovies?.includes(movie._id)}
                                variant={dislikedMovies?.includes(movie._id) ? "outline-secondary" : "outline-danger"}
                                onClick={() => dislikeMovieHandler(movie._id)}>
                                    {dislikedMovies?.includes(movie._id)
                                    ? <span>Disliked!</span>
                                    : <i className='far fa-thumbs-down fa-2x' />}
                            </Button>
                            <Button
                                className="movie-card-button"
                                disabled={likedMovies?.includes(movie._id)}
                                variant={likedMovies?.includes(movie._id) ? "outline-secondary" : "outline-success"}
                                onClick={() => likeMovieHandler(movie._id)}>
                                    {likedMovies?.includes(movie._id)
                                    ? <span>Liked!</span>
                                    : <i className='far fa-thumbs-up fa-2x' />}
                            </Button>
                        </Card.Footer>
                    : 
                        <Card.Footer className="text-center">
                            <Button
                                className="movie-card-button"
                                onClick={() => skipMovieHandler(movie._id)}>
                                    Next Movie
                            </Button>
                        </Card.Footer>
                    }
            </Card>
        </Accordion>
    )
}

export default SingleMovieCard;