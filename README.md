# FANTINDER 
## Developed with the MERN stack
### Introduction
Github Repository
``` text 
anitapeppercorn/FANTINDER
```

``` text
App is Deployed at:
https://fantinder.herokuapp.com/

```

We built a full stack - MERN Stack media streaming site and deployed it to Heroku at https://fantinder.herokuapp.com/ This project has played a key role in our journey to becoming a full-stack web developers. It showcases collaborative skills and coding abilities, especially in the context of a scalable, user-focused MERN app.
Project Requirements were to to create a MERN stack single-page application that works with real-world data to solve a real-world challenge, with a focus on user demand:
- Using React for the front end.
- Using GraphQL with a Node.js and Express.js server.
- Using MongoDB and the Mongoose ODM for the database.
- Using queries and mutations for retrieving, adding, updating, and deleting data.
- Deployed using Heroku (with data).
- Meets the minimum requirements of a PWA: Uses a web manifest, Uses a service worker for offline functionality, Is installable
- Offering a polished UI, is responsive and is interactive 
- Including authentication (JWT) and protects sensitive API key information on the server.
- The project has a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class and id naming conventions, indentation, quality comments, etc.) and a high-quality README (with unique name, description, technologies used, screenshot, and link to deployed application).
- This project is part of our REACT portfolio 


## Contents
- [Description](#Description)
- [App Screenshot](#App-Screenshot)
- [User Story](#User-Story)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Concepts](#Concepts)
- [License](#License)
- [Author](#Author)

## Description
We are in a time where travel options are limited and a lot of people are spending time at home and watching movies together. Selecting a movie to watch together is always challenge. This is a application that makes that process simpler
For MVP we assume that application users will communicate with each other outside the application only
Additional potential features we considered
….Feature 1: The movies in personalized profile favorites will show the other users (small bubble) who also have the same movie saved. 
….Feature 2: On clicking on the bubble of a user who is interested in the same content as you, you will see more information (profile information) about them
….Feature 3: As opposed to contact the user externally you can contact another use in app, via an in app chat
….Feature 4: Not all users are friends, and users profile favorite content will be compared to their pre-approved friends only

## App Screenshot
![](images/FANTINDER.png)


## User Story

```text

AS A movie-lover stuck at home, 
I WANT to see the latest trending movies, 
Search for, Save, & Delete Movies,
and connect with other users with matching preferences
```



## Acceptance Criteria
```text

GIVEN an Movie Search web application & platform 
WHEN I review the app
THEN I am presented with movie recommendations and Navbar options to search the Movie database and options to Login/Signup

WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with search results, featuring a movies’s title, an option to view the trailer (if available),an overview of the movie and the poster image

WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up

WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button

WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button

WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site

WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site

WHEN I am logged in to the site
THEN in addition to trending recommendations the Navbar menu options include options to search the Movie database, see my saved movies, and Logout

WHEN I am logged in and look at recommendations presented to me 
THEN I have an option to like or dislike movies presented to me or look at more recommendations

WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a movies’s title, an option to view the trailer (if available),an overview of the movie, the poster image, and the option to like or dislike the movie.

WHEN I like a movie
THEN that movie’s information is saved to my account

WHEN I click on the option to see my saved movies
THEN I am presented with all of the movies I have saved to my account, each featuring the movies’s title, an overview of the movie, the poster image, and an option to dislike the movie (and to remove it from my account)

WHEN I am both logged in and in the saved movies
THEN I am presented with an option to signup for the FANTINDER streaming service. On signing up for the streaming service, you can come back to the saved movies page

all of the movies I have saved to my account, each featuring the movies’s title, an overview of the movie, the poster image, and an option to dislike the movie (and to remove it from my account)

WHEN I dislike a movie
THEN that movie is deleted from my saved list

WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options to see movie recommendations, and option to Login/Signup, and an option search for a movie and an input field to search for movies and a submit button  

```



## Concepts

In this project we used the following packages:
```text
    ”@apollo/react-hooks": "^3.1.3",
    "@stripe/stripe-js": "^1.10.0",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "apollo-boost": "^0.4.7",
    "apollo-link-context": "^1.0.20",
    "graphql": "^14.6.0",
    "graphql-tag": "^2.10.3",
    "jwt-decode": “^2.2.0",
    "apollo-server-express": "^2.11.0",
    "bcrypt": "^4.0.1",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.7",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.1"
```

## License
[MIT License](./LICENSE)
![license](https://img.shields.io/badge/License-MIT-blue)

## Author
### Vanessa Lane, Anita Ganti, Priya Ravi

View the authors' portfolio at:  
- https://anitapeppercorn.github.io/react-portfolio/
![Badge](https://img.shields.io/badge/Github-anitapeppercorn-4cbbb9) 
![Profile Image](https://github.com/anitapeppercorn.png?size=50)


- https://priyaravi23.github.io/react-portfolio/
![Badge](https://img.shields.io/badge/Github-priyaravi23-4cbbb9) 
![Profile Image](https://github.com/priyaravi23.png?size=50)


- http://www.vlane.net
![Badge](https://img.shields.io/badge/Github-vanessalane-4cbbb9) 


[Table of Contents](#Contents)
[Back to Top](#FANTINDER)




