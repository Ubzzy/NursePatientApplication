import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {ApolloProvider} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

const authLink = setContext((_, {headers}) => {

    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",

        }

    }

});

// const URL = 'http://localhost:4000/graphql'
const URL = 'http://localhost:4000/graphql'
const httpLink = createHttpLink({
    // uri: 'http://localhost:4000/graphql'
    uri: URL
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
);

reportWebVitals();
