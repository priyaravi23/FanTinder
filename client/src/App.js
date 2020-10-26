import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import custom components
import Navbar from './components/Navbar';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';

// import GlobalState Provider
import { FantinderProvider } from "./utils/GlobalState";

// stylesheets
import './App.scss';

const client = new ApolloClient({
    request: operation => {
        const token = localStorage.getItem('id_token');

        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    },
    uri: '/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <FantinderProvider>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={SearchMovies} />
                        <Route exact path='/saved' component={SavedMovies} />
                        <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
                    </Switch>
                </FantinderProvider>
            </Router>
        </ApolloProvider>
    );
}

export default App;