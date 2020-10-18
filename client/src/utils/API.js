// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

export const createUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

// save movie data for a logged in user
export const saveMovie = (movieData, token) => {
    return fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
    });
};

// remove saved movie data for a logged in user
export const deleteMovie = (movieId, token) => {
    return fetch(`/api/users/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

// Using https://www.themoviedb.org/ for movies api
export const searchTMDB = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=d64da0474db9594724886e71c0d202f1&query=${query}`)
};