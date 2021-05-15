const { gql } = require('apollo-server');

module.exports = gql`
type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    donation: Boolean
    availability:Boolean
}
   type Query {
     getUsers: [User]!
   }
   type Mutation {
     register(
       firstName: String!
       lastName: String!
       email: String!
       password: String!
       confirmPassword: String!
       phone: String!
       ): User!
   }
 `