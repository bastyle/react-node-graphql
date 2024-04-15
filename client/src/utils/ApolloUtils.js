// apolloClient.js

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { grapqhQl } from './APIRoutes';

// Create an http link:
const httpLink = createHttpLink({
    uri: grapqhQl,
});

// Get the authentication token from local storage if it exists
const token = localStorage.getItem('token');

// Create an authentication link:
const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// Create the Apollo client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default apolloClient;