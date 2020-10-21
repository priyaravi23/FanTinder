import React from 'react';

// import bootstrap-react components
import { Accordion, Button, Card, ResponsiveEmbed } from 'react-bootstrap';

// import utils
import Auth from '../utils/auth';

// define component
const MovieCard = ({movie, savedMovieIds, displayTrailer, onClickHandler}) => {
  return (
    <Accordion>
      <Card>
        {movie.trailer && displayTrailer
          ? <ResponsiveEmbed aspectRatio="16by9">
              <iframe width="560" height="315" src={movie.trailer} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </ResponsiveEmbed>
          : <Card.Img src={movie.poster} alt={`The cover for ${movie.name}`} variant='top' />
        }
        <Card.Body>
          <Card.Title>{movie.name}</Card.Title>
          <Card.Text className='small'>Rating: {movie.vote}</Card.Text>
          <Accordion.Toggle className="small" as={Card.Link} variant="link" eventKey={movie.movieId}>
            Click to expand for more details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={movie.movieId}>
              <Card.Body>
                <Card.Text className='small'>Release Date: {movie.release}</Card.Text>
                <Card.Text className='small'>Plot Summary: {movie.overview}</Card.Text>
              </Card.Body>
          </Accordion.Collapse>

          {Auth.loggedIn() && (
            <Button
              disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
              className='btn-block btn-info mt-4'
              onClick={() => onClickHandler(movie.movieId)}>
              {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                ? 'Saved!'
                : 'Save this Movie!'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Accordion>
  )
}

export default MovieCard;