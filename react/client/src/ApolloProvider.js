import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

function ApolloProvider(props) {
    return (
        <Provider client={client} {...props} />
    )
}

export default ApolloProvider;
