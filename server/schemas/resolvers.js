const { User, Movie } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('dislikedMovies')
                    .populate('likedMovies');
                
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('dislikedMovies')
                .populate('likedMovies');
        },

        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('dislikedMovies')
                .populate('likedMovies');
        },

        // get a movie by _id
        movies: async (parent, { movieId }) => {
            return Movie.findOne({ _id: movieId })
                .select('-__v');
        },

        // get a movie by id
        movie: async (parent, { movieId }) => {
            return Movie.findOne({ _id: movieId })
                .select('-__v');
        },

        // get all movies
        movies: async () => {
            return Movie.find()
                .select('-__v');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addMovie: async (parent, { input }) => {
            const movie = await Movie.findOneAndUpdate(
                { externalMovieId: input.externalMovieId },
                input,
                { upsert: true, new: true }
            );
            return movie;
        },

        addMovies: async (parent, { input }) => {
            // prep docs to upsert
            const bulkOps = await input.map((movie) => {
                return {
                    updateOne: {
                        filter: { externalMovieId: movie.externalMovieId },
                        update: movie,
                        upsert: true,
                        new: true
                    }
                }
            })
            
            // upsert all of the movies
            const movieCount = await Movie.bulkWrite(bulkOps).then(res => {
                const { modifiedCount, upsertedCount } = res;
                return modifiedCount || upsertedCount;
            }).catch(err => {
                console.error(err);
            });

            return movieCount
        },

        likeMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { likedMovies: movieId },
                        $pull: { dislikedMovies: movieId }
                    },
                    { new: true }
                )
                .populate('dislikedMovies')
                .populate('likedMovies');

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        dislikeMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { dislikedMovies: movieId },
                        $pull: { likedMovies: movieId }
                    },
                    { new: true }
                )
                .populate('dislikedMovies')
                .populate('likedMovies');

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    }
};

module.exports = resolvers;