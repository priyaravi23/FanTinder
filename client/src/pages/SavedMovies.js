import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import MovieCards from '../components/MovieCards';
import { useFantinderContext } from "../utils/GlobalState";

const SavedMovies = () => {
    const [state] = useFantinderContext();

    return (
        <>
            <Jumbotron fluid className='text-light'>
                <Container>
                    <h1>My Saved Movies</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {state.savedMovies.length
                        ? `Viewing ${state.savedMovies.length} saved ${state.savedMovies.length === 1 ? 'movie' : 'movies'}:`
                        : 'You have no saved movies!'}
                </h2>
                <MovieCards moviesToDisplay={state.savedMovies} displayTrailers />
            </Container>
        </>
    );
};

export default SavedMovies;