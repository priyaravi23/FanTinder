import React, { useState, useEffect } from 'react';

// import TMDB API dependencies
import { searchTMDB } from '../utils/API';
import { cleanMovieData } from '../utils/movieData';

// import localStorage dependencies
import { saveMovieIds, getSavedMovieIds, removeMovieId } from '../utils/localStorage';

// import GraphQL dependencies
import { SAVE_MOVIE } from '../utils/mutations';
import { REMOVE_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

// import react-bootstrap components
import { Container, CardColumns, Jumbotron } from 'react-bootstrap';

// import custom components
import SearchForm from '../components/SearchForm'
import MovieCard from '../components/MovieCard'

// define SearchMovies component
const SearchMovies = () => {
    const [saveMovie, { saveError }] = useMutation(SAVE_MOVIE);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
    const [removeMovie, { removeError }] = useMutation(REMOVE_MOVIE);

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

        try {
            const { data } = await saveMovie({
                variables: { input: movieToSave }
            });

            console.log({data});

            if (saveError) {
                throw new Error('Something went wrong!');
            }

            // update state, which also updates LocalStorage
            setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveMovie = async (movieIdToRemove) => {
        try {
            const { data } = await removeMovie({
                variables: { movieId: movieIdToRemove }
            });

            console.log({data});

            if (removeError) {
                throw new Error('Something went wrong!');
            }

            // remove from LocalStorage
            removeMovieId(movieIdToRemove);

            // update state
            const updatedSavedMovies = await savedMovieIds.filter(movieId => movieId !== movieIdToRemove)
            setSavedMovieIds(updatedSavedMovies);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Jumbotron fluid className='text-light search-jumbo'>
                <Container>
                    <SearchForm handleFormSubmit={handleFormSubmit} />
                </Container>
            </Jumbotron>

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
                                saveHandler={handleSaveMovie}
                                removeHandler={handleRemoveMovie}
                                savedMovieIds={savedMovieIds}
                                saveBtn
                                deleteBtn />
                        )
                    })}
                </CardColumns>
            </Container>
        </>
    );
};

export default SearchMovies;