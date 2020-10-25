import React, { useEffect } from 'react';

// import bootstrap-react components
import { Accordion, Button, Card, ResponsiveEmbed } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

// import utils
import Auth from '../utils/auth';

const SingleMovieCard = (props) => {
    const {
        movie,
        displayTrailer,
        saveMovieHandler,
        removeMovieHandler,
        disabled,
        btnColor
    } = props;

    return (
        <Accordion>
            <Card key={movie.movieId}>
                {displayTrailer && movie.trailer
                    ? <ResponsiveEmbed aspectRatio="16by9">
                        <iframe title={movie.movieId} width="560" height="315" src={movie.trailer} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </ResponsiveEmbed>
                    : (movie.image && <Card.Img src={movie.image} alt={`The cover for ${movie.name}`} variant='top' />)
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
                        <Button
                            className="movie-card-button"
                            variant="outline-danger"
                            onClick={() => removeMovieHandler(movie.movieId)}>
                            <i className='far fa-thumbs-down fa-2x' />
                        </Button>
                        <Button
                            className="movie-card-button"
                            disabled={disabled}
                            variant={btnColor}
                            onClick={() => saveMovieHandler(movie)}>
                            <i className='far fa-thumbs-up fa-2x' />
                        </Button>
                    </Card.Footer>
                }
            </Card>
        </Accordion>
    )
}

export default SingleMovieCard;