import gql from 'graphql-tag';

export const QUERY_COMMENTS = gql`
  query comments($username: String) {
    comments(username: $username) {
      _id
      commentText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const GET_USER = gql`
  {
    me {
        _id
        username
        email
        movieCount
        savedMovies {
              movieId
              name
              vote
              overview
              image
              release
        }
    }
  }
`;