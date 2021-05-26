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
# Query — for querying data (SELECT operations)
type Query {
  getUser: User!
  login(email:String!, password:String!): User!
  checkUser(email:String, phone:String): User
}
# Mutation — for creating new and updating/deleting existing data (INSERT, UPDATE, DELETE)
type Mutation {
  register(firstName: String!, lastName: String!, email: String!, password: String!, confirmPassword: String!, phone: String!): User!
  profileUpdate(firstName: String, lastName: String, email: String, phone: String): User
  changePassword(newPassword:String!, confirmNewPassword:String!): User
  passwordUpdate(currentPassword:String!, newPassword:String!, confirmNewPassword:String!): User
  deleteProfile(password:String!): User
}
 `