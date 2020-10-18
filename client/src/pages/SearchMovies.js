import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { Container, Button, Card, CardColumns } from 'react-bootstrap';
import { searchTMDB } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
import { SAVE_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import Homepage from '../components/HomePage';
import SearchForm from '../components/SearchForm'

const SearchMovies = () => {
    const [saveMovie, { error }] = useMutation(SAVE_MOVIE);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

    useEffect(() => {
        return () => saveMovieIds(savedMovieIds);
    });

    const handleFormSubmit = async (event, searchInput) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchTMDB(searchInput);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const { results } = await response.json();

            const filteredData = results.filter((movie) => {
                if (movie.poster_path) {
                    return movie;
                }
            });

            console.log(filteredData);

            const movieData = filteredData.map((movie) => (
                {
                    movieId: movie.id,
                    vote: movie.vote_average,
                    name: movie.title,
                    overview: movie.overview,
                    release: movie.release_date,
                    image: 'https://image.tmdb.org/t/p/w500' + movie.poster_path || ''
                }));

            setSearchedMovies(movieData);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveMovie = async (movieId) => {
        const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await saveMovie({
                variables: { input: movieToSave }
            });

            if (error) {
                throw new Error('Something went wrong!');
            }

            setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {!searchedMovies.length && <Homepage handleFormSubmit={handleFormSubmit} />}
            {searchedMovies.length && <SearchForm handleFormSubmit={handleFormSubmit} />}

            <Container>
                <h2 className="results-heading">
                    {searchedMovies.length > 0 &&
                    `Viewing ${searchedMovies.length} results:`}
                </h2>
                <CardColumns>
                    {searchedMovies.map((movie) => {
                        return (
                            <Card key={movie.movieId}>
                                {movie.image ? (
                                    <Card.Img src={movie.image} alt={`The cover for ${movie.name}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{movie.name}</Card.Title>
                                    <p className='small'>Rating: {movie.vote} </p>
                                    <p className='small'>Release Date: {movie.release} </p>
                                    <div className="scrollbar overflow-auto movie-description">
                                        <p className='small card-text'>Overview: {movie.overview} </p>
                                    </div>
                                    <Card.Text>{movie.description}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveMovie(movie.movieId)}>
                                            {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                                                ? 'Saved!'
                                                : 'Save this Movie!'}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchMovies;