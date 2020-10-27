import React, { useState } from 'react';

// import TMDB API dependencies
import { searchTMDB } from '../utils/API';

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

        searchTMDB(searchInput, setSearchedMovies);
    };

    return (
        <>
            <Jumbotron fluid className="text-light">
                <Container>
                    <Form onSubmit={(event) => handleFormSubmit(event, searchInput)}>
                        <Form.Label className="h3">Find your favorite movies</Form.Label>
                        <Form.Group className="d-flex">
                            <Form.Control
                                name='searchInput'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                placeholder='The Lord of the Rings'
                            />
                            <Button type='submit' className='ml-2'>
                                Search
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <h2 className="results-heading">
                    {searchedMovies.length > 0 && `Viewing ${searchedMovies.length} results:`}
                </h2>
                <MovieCards displayTrailers moviesToDisplay={searchedMovies} />
            </Container>
        </>
    );
};

export default SearchMovies;