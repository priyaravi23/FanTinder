//generate dummy data
const faker = require('faker');

const db = require('../config/connection');
const { Comment, User, Reaction, Movie } = require('../models');

db.once('open', async () => {
  await Comment.remove({});
  await User.remove({});
  await Reaction.remove({});
  await Movie.remove({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insert(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create Comments
  let createdComments = [];
  for (let i = 0; i < 100; i += 1) {
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdComment = await Comment.create({ commentText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { comments: createdComment._id } }
    );

    createdComments.push(createdComment);
  }

  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomCommentIndex = Math.floor(Math.random() * createdComments.length);
    const { _id: commentId } = createdComments[randomCommentIndex];

    await Comment.updateOne(
      { _id: commentId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }
  // create Movies
  let createdMovies = [];
  for (let i = 0; i < 100; i += 1) {
    const movieRelease = faker.lorem.word();
    const movieOverview = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const movieImage = faker.image.imageUrl();
    const movieVote = faker.random.number()*5;
    const movieName = faker.commerce.productName();

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdMovie = await Movie.create({ movieRelease, movieOverview, movieId, movieImage, movieVote, movieName, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { savedMovies: createdMovie._id } }
    );

    createdMovies.push(createdMovie);
  }

  console.log('all done!');
  process.exit(0);
});