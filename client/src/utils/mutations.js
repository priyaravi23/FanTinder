import gql from 'graphql-tag';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
            user {
                _id
                username
                email
                movieCount
                removedMovies{
                    movieId
                    name
                    vote
                    voteCount
                    overview
                    image
                    release
                    trailer
                }
                savedMovies {
                    movieId
                    name
                    vote
                    voteCount
                    overview
                    image
                    release
                    trailer
                }
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
            user {
                _id
                username
                email
                movieCount
                removedMovies{
                    movieId
                    name
                    vote
                    voteCount
                    overview
                    image
                    release
                    trailer
                }
                savedMovies {
                    movieId
                    name
                    vote
                    voteCount
                    overview
                    image
                    release
                    trailer
                }
            }
        }
    }
`;

export const SAVE_MOVIE = gql`
    mutation saveMovie($input: movieInput!) {
        saveMovie(input: $input) {
            _id
            username
            email
            movieCount
            removedMovies {
                movieId
                name
                vote
                voteCount
                overview
                image
                release
                trailer
            }
            savedMovies {
                movieId
                name
                vote
                voteCount
                overview
                image
                release
                trailer
            }
        }
    }
`;

export const REMOVE_MOVIE = gql`
    mutation removeMovie($input: movieInput!) {
        removeMovie(input: $input) {
            _id
            username
            email
            movieCount
            removedMovies {
                movieId
                name
                vote
                voteCount
                overview
                image
                release
                trailer
            }
            savedMovies {
                movieId
                name
                vote
                voteCount
                overview
                image
                release
                trailer
            }
        }
    }
`;