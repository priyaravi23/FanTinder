import React from 'react';
import Auth from '../utils/auth';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { REMOVE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';

const SavedMovies = () => {
    const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);

    const { loading, data } = useQuery(GET_USER);
    const userData = data?.me || {};

    const handleDeleteMovie = async (movieId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeMovie({
                variables: { movieId }
            });

            if (error) {
                throw new Error('Something went wrong!');
            }

            removeMovieId(movieId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Viewing saved movies!</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.savedMovies.length
                        ? `Viewing ${userData.savedMovies.length} saved ${userData.savedMovies.length === 1 ? 'movie' : 'movies'}:`
                        : 'You have no saved movies!'}
                </h2>
                <CardColumns>
                    {userData.savedMovies.map((movie) => {
                        return (
                            <Card key={movie.movieId} md={12}>
                                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.name}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{movie.name}</Card.Title>
                                    <p className='small'>Rating: {movie.vote} </p>
                                    <p className='small'>Release Date: {movie.release} </p>
                                    <div className="scrollbar overflow-auto movie-description">
                                        <p className='small card-text'>Overview: {movie.overview} </p>
                                    </div>
                                    <Card.Text>{movie.description}</Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                                        Delete this Movie!
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SavedMovies;