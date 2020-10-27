// import our actions
import {
    ADD_TO_REMOVED_MOVIES,
    ADD_TO_SAVED_MOVIES,
    UPDATE_MOVIES_TO_DISPLAY,
    UPDATE_REMOVED_MOVIES,
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
            "voteCount": 111,
            "overview": "This is Grumpy Cat's movie",
            "name": "Grumpy Cat",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Grumpy_Cat_%2814556024763%29_%28cropped%29.jpg/220px-Grumpy_Cat_%2814556024763%29_%28cropped%29.jpg",
            "release": "2020-10-10",
            "trailer": "https://www.youtube.com/watch?v=INscMGmhmX4"
        },
        {
            "movieId": 2,
            "vote": 7.0,
            "voteCount": 222,
            "overview": "This is Grumpy Cat's Second Movie",
            "name": "Grumpy Cat: The Sequel",
            "image": "https://ichef.bbci.co.uk/news/400/cpsprodpb/26AC/production/_107000990_grumpycat5.jpg",
            "release": "2020-10-24",
            "trailer": "https://www.youtube.com/watch?v=g-1g3SDswGA"
        }
    ],
    moviesToDisplay: [
        {
            "image": "https://image.tmdb.org/t/p/w500/r4Lm1XKP0VsTgHX4LG4syAwYA2I.jpg",
            "movieId": 590223,
            "name": "Love and Monsters",
            "overview": "Seven years after the Monsterpocalypse, Joel Dawson, along with the rest of humanity, has been living underground ever since giant creatures took control of the land. After reconnecting over radio with his high school girlfriend Aimee, who is now 80 miles away at a coastal colony, Joel begins to fall for her again. As Joel realizes that there’s nothing left for him underground, he decides against all logic to venture out to Aimee, despite all the dangerous monsters that stand in his way.",
            "release": "October 26, 2020",
            "trailer": "https://www.youtube.com/embed/-19tBHrZwOM",
            "vote": 7.6,
            "voteCount": 168
        },
        {
            "image": "https://image.tmdb.org/t/p/w500/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg",
            "movieId": 556984,
            "name": "The Trial of the Chicago 7",
            "overview": "What was intended to be a peaceful protest at the 1968 Democratic National Convention turned into a violent clash with police and the National Guard. The organizers of the protest — including Abbie Hoffman, Jerry Rubin, Tom Hayden and Bobby Seale — were charged with conspiracy to incite a riot and the trial that followed was one of the most notorious in history.",
            "release": "October 26, 2020",
            "trailer": "https://www.youtube.com/embed/FVb6EdKDBfU",
            "vote": 7.8,
            "voteCount": 347
        }
    ],
    removedMovies: [3, 4]
};

test('ADD_TO_REMOVED_MOVIES', () => {
    let newState = reducer(initialState, {
        type: ADD_TO_REMOVED_MOVIES,
        movie: {
            "image": "https://image.tmdb.org/t/p/w500/r4Lm1XKP0VsTgHX4LG4syAwYA2I.jpg",
            "movieId": 590223,
            "name": "Love and Monsters",
            "overview": "Seven years after the Monsterpocalypse, Joel Dawson, along with the rest of humanity, has been living underground ever since giant creatures took control of the land. After reconnecting over radio with his high school girlfriend Aimee, who is now 80 miles away at a coastal colony, Joel begins to fall for her again. As Joel realizes that there’s nothing left for him underground, he decides against all logic to venture out to Aimee, despite all the dangerous monsters that stand in his way.",
            "release": "October 26, 2020",
            "trailer": "https://www.youtube.com/embed/-19tBHrZwOM",
            "vote": 7.6,
            "voteCount": 168
        }
    });

    // check saved movies
    expect(newState.savedMovies.length).toBe(2);
    expect(newState.savedMovies[0].movieId).toBe(1);
    expect(initialState.savedMovies.length).toBe(2);

    // check moviesToDisplay
    expect(newState.moviesToDisplay.length).toBe(1);
    expect(newState.moviesToDisplay[0].movieId).toBe(556984);
    expect(initialState.savedMovies.length).toBe(2);

    // check removed movies
    expect(newState.removedMovies.length).toBe(3);
    expect(newState.removedMovies[2]).toBe(590223);
    expect(initialState.removedMovies.length).toBe(2);
});

test('ADD_TO_SAVED_MOVIES', () => {
    let newState = reducer(initialState, {
        type: ADD_TO_SAVED_MOVIES,
        movie: {
            "image": "https://image.tmdb.org/t/p/w500/r4Lm1XKP0VsTgHX4LG4syAwYA2I.jpg",
            "movieId": 590223,
            "name": "Love and Monsters",
            "overview": "Seven years after the Monsterpocalypse, Joel Dawson, along with the rest of humanity, has been living underground ever since giant creatures took control of the land. After reconnecting over radio with his high school girlfriend Aimee, who is now 80 miles away at a coastal colony, Joel begins to fall for her again. As Joel realizes that there’s nothing left for him underground, he decides against all logic to venture out to Aimee, despite all the dangerous monsters that stand in his way.",
            "release": "October 26, 2020",
            "trailer": "https://www.youtube.com/embed/-19tBHrZwOM",
            "vote": 7.6,
            "voteCount": 168
        }
    });

    // check saved movies
    expect(newState.savedMovies.length).toBe(3);
    expect(newState.savedMovies[2].movieId).toBe(590223);
    expect(initialState.savedMovies.length).toBe(2);

    // check moviesToDisplay
    expect(newState.moviesToDisplay.length).toBe(1);
    expect(newState.moviesToDisplay[0].movieId).toBe(556984);
    expect(initialState.savedMovies.length).toBe(2);

    // check removed movies
    expect(newState.removedMovies.length).toBe(2);
    expect(newState.removedMovies[0]).toBe(3);
    expect(initialState.removedMovies.length).toBe(2);
});

test('UPDATE_MOVIES_TO_DISPLAY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_MOVIES_TO_DISPLAY,
        moviesToDisplay: [{
            "movieId": 3,  // new movieId
            "vote": 9.0,
            "voteCount": 111,
            "overview": "This is Grumpy Cat's movie",
            "name": "Grumpy Cat",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Grumpy_Cat_%2814556024763%29_%28cropped%29.jpg/220px-Grumpy_Cat_%2814556024763%29_%28cropped%29.jpg",
            "release": "2020-10-10",
            "trailer": "https://www.youtube.com/watch?v=INscMGmhmX4"
        }]
    });

    // check saved movies
    expect(newState.moviesToDisplay.length).toBe(1);
    expect(newState.moviesToDisplay[0].movieId).toBe(3);
    expect(initialState.moviesToDisplay.length).toBe(2);
    expect(initialState.moviesToDisplay.length).toBe(2);
});

test('UPDATE_SAVED_MOVIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_SAVED_MOVIES,
        savedMovies: [{
            "image": "https://image.tmdb.org/t/p/w500/r4Lm1XKP0VsTgHX4LG4syAwYA2I.jpg",
            "movieId": 590223,
            "name": "Love and Monsters",
            "overview": "Seven years after the Monsterpocalypse, Joel Dawson, along with the rest of humanity, has been living underground ever since giant creatures took control of the land. After reconnecting over radio with his high school girlfriend Aimee, who is now 80 miles away at a coastal colony, Joel begins to fall for her again. As Joel realizes that there’s nothing left for him underground, he decides against all logic to venture out to Aimee, despite all the dangerous monsters that stand in his way.",
            "release": "October 26, 2020",
            "trailer": "https://www.youtube.com/embed/-19tBHrZwOM",
            "vote": 7.6,
            "voteCount": 168
        }]
    });

    // check saved movies
    expect(newState.savedMovies.length).toBe(1);
    expect(newState.savedMovies[0].movieId).toBe(590223);
    expect(initialState.savedMovies.length).toBe(2);
    expect(initialState.savedMovies.length).toBe(2);
});


test('UPDATE_REMOVED_MOVIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_REMOVED_MOVIES,
        removedMovies: [590223]
    });

    // check saved movies
    expect(newState.removedMovies.length).toBe(1);
    expect(newState.removedMovies[0]).toBe(590223);
    expect(initialState.removedMovies.length).toBe(2);
    expect(initialState.removedMovies.length).toBe(2);
});