import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    me {
      _id
      username
      email
      friends {
        _id
      }
      likedMovies{
        _id
      }
      dislikedMovies{
        _id
      }
    }
  }
`;

export const GET_MOVIES = gql`
  {
    movies {
      _id
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