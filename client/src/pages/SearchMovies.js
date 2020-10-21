import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';

import { searchTMDB } from '../utils/API';
import { cleanMovieData } from '../utils/movieData';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

// import GraphQL dependencies
import { SAVE_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

// import react-bootstrap components
import { Container, CardColumns } from 'react-bootstrap';

// import custom components
import Homepage from '../components/HomePage';
import SearchForm from '../components/SearchForm'
import MovieCard from '../components/MovieCard'

// define SearchMovies component
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
                throw new Error('Something went wrong with the search!');
            }

            const { results } = await response.json();

            const movieData = await cleanMovieData(results);

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
                            <MovieCard
                                displayTrailer
                                movie={movie}
                                onClickHandler={handleSaveMovie}
                                savedMovieIds={savedMovieIds}/>
                        )
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchMovies;