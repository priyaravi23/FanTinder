import React, { useState, useEffect } from 'react';

// import TMDB API dependencies
import { searchTMDB } from '../utils/API';
import { cleanMovieData } from '../utils/movieData';

// import react-bootstrap components
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';

// import custom components
import MovieCards from '../components/MovieCards'

const SearchMovies = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchedMovies, setSearchedMovies] = useState([]);

    const handleFormSubmit = async (event) => {
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

    return (
        <>
            <Jumbotron fluid className='text-light search-jumbo'>
                <Container>
                    <Form onSubmit={(event) => handleFormSubmit(event, searchInput)}>
                        <Form.Group>
                            <Form.Label className="h3">Find your favorite movies</Form.Label>
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                placeholder='The Lord of the Rings'
                            />
                        </Form.Group>
                        <Button type='submit'>
                            Search
                        </Button>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h2 className="results-heading">
                    {searchedMovies.length > 0 && `Viewing ${searchedMovies.length} results:`}
                </h2>
                <MovieCards displayTrailers='true' moviesToDisplay={searchedMovies} />
            </Container>
        </>
    );
};

export default SearchMovies;