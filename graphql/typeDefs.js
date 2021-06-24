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
},
type Asset {
    id: Int!
    email: String!
    phone: String!
    petName: String!
    breed: String!
    photo: String!
    description: String!
    howLong:String!
    date: String!
    token: String!
    availability: Boolean!
},
type Response {
  status: Int!,
  message: String!
}
# Query — for querying data (SELECT operations)
type Query {
  getUser: User!
  login(email:String!, password:String!): User!
  checkUser(email:String, phone:String): User!
  getAssets: [Asset]!
}
# Mutation — for creating new and updating/deleting existing data (INSERT, UPDATE, DELETE)
type Mutation {
  register(firstName: String!, lastName: String!, email: String!, password: String!, confirmPassword: String!, phone: String!): Response!
  profileUpdate(firstName: String, lastName: String, email: String, phone: String): Response!
  changePassword(newPassword:String!, confirmNewPassword:String!): Response!
  passwordUpdate(currentPassword:String!, newPassword:String!, confirmNewPassword:String!): Response!
  deleteProfile(password:String!): Response!
  stripeSubmit(id: String!, amount: String!): Response!
  submit(petName: String!, breed: String!, file: Upload!, description: String!, radio: String!): Response!
  orderCheck(token: String!): Response!
  resetOrder: Response!
}
 `