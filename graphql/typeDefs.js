const { gql } = require('apollo-server');

module.exports = gql`
type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String!
    donation: Boolean!
    availability:Boolean!
    token: String!
}
type Query {
  getUser: User!
  login(email:String!, password:String!): User!
  checkUser(email:String, phone:String): User
}
type Mutation {
  register(firstName: String!, lastName: String!, email: String!, password: String!, confirmPassword: String!, phone: String!): User!
  profileUpdate(firstName: String, lastName: String, email: String, phone: String): User
}
 `