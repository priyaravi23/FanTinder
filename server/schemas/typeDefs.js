const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Movie {
        movieId: Int
        vote: Float
        voteCount: Int
        overview: String
        name: String
        image: String
        release: String
        trailer: String
    }
    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        comments: [Comment]
        friends: [User]
        movieCount: Int
        savedMovies: [Movie]
    }
  
    input movieInput {
        movieId: Int
        vote: Float
        voteCount: Int
        overview: String
        name: String
        image: String
        release: String
        trailer: String
    }
    type Comment {
        _id: ID
        commentText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
      }
    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
      }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        comments(username: String): [Comment]
        comment(_id: ID!): Comment
      }
    type Auth {
        token: ID!
        user: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addComment(commentText: String!): Comment
        addReaction(commentId: ID!, reactionBody: String!): Comment
        addFriend(friendId: ID!): User
        saveMovie(input: movieInput): User
        removeMovie(movieId: Int!): User
    }
`;

module.exports = typeDefs; 