import React, { useState } from 'react';

// import TMDB API dependencies
import { searchTMDB } from '../utils/API';

// import GraphQL Dependencies
import { ADD_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

// import react-bootstrap components
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';

// import custom components
import MovieCards from '../components/MovieCards'
import { cleanMovieData } from '../utils/movieData';

const SearchMovies = () => {
    const [searchInput, setSearchInput] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [searching, setSearching] = useState(false);
    const [addMovie, { addMovieError }] = useMutation(ADD_MOVIE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setSearching(true);

        if (!searchInput) {
            return false;
        }

        const response = await searchTMDB(searchInput);
        
        if (!response.ok) {
            throw new Error("Couldn't search for movies");
        }

        const { results } = await response.json();
        if (results.length > 0) {
            setNoResultsFound(false);
        } else {
            setNoResultsFound(true);
        }
        const cleanedMovies = await cleanMovieData(results);

        const updatedSearchedMovies = searchedMovies;
        for (let i=0; i < cleanedMovies.length; i++) {

            // add the movie to the DB
            const { data } = await addMovie({
                variables: { input: cleanedMovies[i] }
            })

            // update searchedMovies state
            if (!addMovieError) {
                updatedSearchedMovies.push(data.addMovie);
            }
        };
        setSearchedMovies(updatedSearchedMovies);
        setSearching(false);

    };

    return (
        <>
            <Jumbotron fluid className="text-light bg-dark">
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
                        { noResultsFound && <p>No results found!</p> }
                    </Form>
                </Container>
            </Jumbotron>
            <Container>
                {searchedMovies && !searching &&
                    <>
                        <h2 className="results-heading">
                            {searchedMovies.length > 0 && `Viewing ${searchedMovies.length} results:`}
                        </h2>
                        <MovieCards displayTrailers moviesToDisplay={searchedMovies} />
                    </> 
                }
            </Container>
        </>
    );
};

export default SearchMovies;