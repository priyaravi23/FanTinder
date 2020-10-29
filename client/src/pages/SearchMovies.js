import React, { useState } from 'react';

// import TMDB API dependencies
import { searchTMDB } from '../utils/API';

// import GraphQL Dependencies
import { ADD_MOVIE } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

// import GlobalState dependencies
import { useFantinderContext } from "../utils/GlobalState";
import { ADD_TO_MOVIES } from '../utils/actions';

// import react-bootstrap components
import { Form, Button, Container, Jumbotron } from 'react-bootstrap';

// import custom components
import MovieCards from '../components/MovieCards'
import { idbPromise } from "../utils/helpers";
import { cleanMovieData } from '../utils/movieData';

const SearchMovies = () => {
    const [, dispatch] = useFantinderContext();
    const [searchInput, setSearchInput] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [addMovie, { addMovieError }] = useMutation(ADD_MOVIE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        searchTMDB(searchInput).then(res => {
            if (res.ok) {
                res.json()
                .then(async ({ results }) => {
                    if (results.length === 0) {
                        setNoResultsFound(true);
                    } else {
                        setNoResultsFound(false);
                        const cleanedMovies = await cleanMovieData(results);

                        const updatedSearchedMovies = [];

                        cleanedMovies.forEach(movie => {
                            //  add the movie to the db
                            return addMovie({
                                variables: { input: movie }
                            })
                            .then(({ data }) => {
                                if (!addMovieError) {
                                    const newMovie = data.addMovie;

                                    updatedSearchedMovies.push(newMovie);

                                    // update movies in global state
                                    dispatch({
                                        type: ADD_TO_MOVIES,
                                        movies: newMovie
                                    })

                                    // update movies in idb
                                    idbPromise('movies', 'put', newMovie);
                                }
                            })
                            .catch(err => console.error(err))
                        })
                        setSearchedMovies(updatedSearchedMovies);
                    }
                })
            } else {
                console.error(res.text);
            }
        }).catch(err => console.error(err));
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
                {searchedMovies &&
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