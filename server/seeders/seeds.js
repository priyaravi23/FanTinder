//generate dummy data
const faker = require('faker');
const db = require('../config/connection');
const { Movie, User } = require('../models');

db.once('open', async () => {
  await Movie.remove({});
  await User.remove({});

  // create user data
  const userData = [];
  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ username, email, password });
  }
  const createdUsers = await User.collection.insert(userData);

  // create movie data
  const movieData = [];
  for (let i = 0; i < 50; i += 1) {
    const externalMovieId = faker.random.number();
    const rating = faker.finance.amount();
    //(min?: 1, max?: 10)
    const voteCount = faker.random.number();
    const title = faker.commerce.productName();
    const overview = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const releaseDate = faker.date.past();
    const poster = faker.image.imageUrl();
    const trailer = faker.image.imageUrl();
    movieData.push({ externalMovieId, rating, voteCount, title, overview, releaseDate, poster, trailer });
  }
  const createdMovies = await Movie.collection.insert(movieData);

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
  // create likedMovies
    for (let i = 0; i < 100; i += 1) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      const { _id: userId } = createdUsers.ops[randomUserIndex];
      let movieId = [];
      for (let i =0; i < (Math.floor(Math.random() * 10)); i += 1) {
        const randomMovieIndex = Math.floor(Math.random() * createdMovies.ops.length);
        movieId = createdMovies.ops[randomMovieIndex];
      }
      await User.updateOne({ _id: userId }, { $addToSet: { likedMovies: movieId } });
    }

  // create dislikedMovies
        for (let i = 0; i < 100; i += 1) {
          const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
          const { _id: userId } = createdUsers.ops[randomUserIndex];
          let movieId = [];
          for (let i =0; i < (Math.floor(Math.random() * 10)); i += 1) {
            const randomMovieIndex = Math.floor(Math.random() * createdMovies.ops.length);
            movieId = createdMovies.ops[randomMovieIndex];
          }
          await User.updateOne({ _id: userId }, { $addToSet: { dislikedMovies: movieId } });
        }

  console.log('all done!');
  process.exit(0);
});