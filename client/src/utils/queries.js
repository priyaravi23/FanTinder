import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    me {
      _id
      username
      email
      likedMovies
      dislikedMovies
    }
  }
`;

export const GET_MOVIES = gql`
  {
    movies {
      externalMovieId
      rating
      voteCount
      title
      overview
      releaseDate
      poster
      trailer
    }
  }
`;