/**
 * Apollo Sever, first time using
 */
const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./models');

// The GraphQL schema
const typeDefs = require('./graphql/typeDefs');
// A map of functions which return data for the schema.
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctx => ctx,
    uploads: {
        maxFileSize: 2500000 // prevent user from upload pictures > 2.5 MB
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
    sequelize
        .authenticate()
        .then(() => console.log('Database Connected'))
        .catch((err) => console.log(err))
});