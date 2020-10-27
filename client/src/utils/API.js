import { cleanMovieData } from '../utils/movieData';

// Using https://www.themoviedb.org/ for movies api
export const searchTMDB = (query, updateState) => {
    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie?api_key=d64da0474db9594724886e71c0d202f1&query=${query}`;
    fetch(searchMoviesURL).then(function(res) {
        if (res.ok) {
            res.json().then(async function(data) {
                const { results } = data;
                const cleanedData = await cleanMovieData(results);
                updateState(cleanedData);
            })
        } else {
            console.log(res.text);
        }
    })
    .catch((err) => {
        console.error(err);
    })
};

export const getVideos = (movie_id) => {
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=d64da0474db9594724886e71c0d202f1&language=en-US`)
};

// time_window can be by day or week
export const getTrendingMovies = (time_window, updateState) => {
    const trendingMoviesURL = `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=d64da0474db9594724886e71c0d202f1`;
    fetch(trendingMoviesURL).then(function(res) {
        if (res.ok) {
            res.json().then(async function(data) {
                const { results } = data;
                const cleanedData = await cleanMovieData(results);
                updateState(cleanedData);
            })
        } else {
            console.log(res.text);
        }
    })
};

// category can be top_rated, latest, popular
export const getMovies = (category, updateState) => {
    const tmdbURL = `https://api.themoviedb.org/3/movie/${category}?api_key=d64da0474db9594724886e71c0d202f1&language=en-US`;
    fetch(tmdbURL).then(function(res) {
        if (res.ok) {
            res.json().then(async function(data) {
                const { results } = data;
                const cleanedData = await cleanMovieData(results);
                updateState(cleanedData);
            })
        } else {
            console.log(res.text);
        }
    })
};