// import our actions
import {
    UPDATE_SAVED_MOVIES
} from '../utils/actions';

// import reducer
import { reducer } from '../utils/reducers';

// create a sample of what our global state will look like
const initialState = {
    savedMovies: [
        {
            "movieId": 1,
            "vote": 9.0,
            "vote_count": 111,
            "overview": "This is Grumpy Cat's movie",
            "name": "Grumpy Cat",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Grumpy_Cat_%2814556024763%29_%28cropped%29.jpg/220px-Grumpy_Cat_%2814556024763%29_%28cropped%29.jpg",
            "release": "2020-10-10",
            "trailer": "https://www.youtube.com/watch?v=INscMGmhmX4"
        },
        {
            "movieId": 2,
            "vote": 7.0,
            "vote_count": 222,
            "overview": "This is Grumpy Cat's Second Movie",
            "name": "Grumpy Cat: The Sequel",
            "image": "https://ichef.bbci.co.uk/news/400/cpsprodpb/26AC/production/_107000990_grumpycat5.jpg",
            "release": "2020-10-24",
            "trailer": "https://www.youtube.com/watch?v=g-1g3SDswGA"
        }
    ]
};


test('UPDATE_SAVED_MOVIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_SAVED_MOVIES,
        savedMovies: [{}]
    });

    expect(newState.savedMovies.length).toBe(1);
    expect(initialState.savedMovies.length).toBe(2);
});