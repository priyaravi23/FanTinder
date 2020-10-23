import React from 'react';

// import bootstrap-react components
import { Accordion, Button, Card, ResponsiveEmbed } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

// import utils
import Auth from '../utils/auth';

// define component
const MovieCard = (props) => {
    const {
        movie,
        savedMovieIds,
        displayTrailer,
        removeHandler,
        saveHandler,
        deleteBtn,
        saveBtn
    } = props;

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
                      ({movie.vote_count.toLocaleString()} ratings)
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
                            onClick={() => removeHandler(movie.movieId)}>
                            <i className='far fa-thumbs-down fa-2x' />
                        </Button>
                        }
                        {saveBtn && 
                        <Button
                            className="movie-card-button"
                            disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                            variant={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId) ? "outline-secondary" : "outline-success" }
                            onClick={() => saveHandler(movie)}>
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