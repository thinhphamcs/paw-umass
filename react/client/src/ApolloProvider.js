// Import
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
// Create the uplink
const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/'
})
// Set the headers to authorized link
const authLink = setContext((_, { headers }) => {
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
// Apollo Client
const client = new ApolloClient({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getUser: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        }
    }),
});
// Export function
function ApolloProvider(props) {
    return (
        <Provider client={client} {...props} />
    )
}
export default ApolloProvider;