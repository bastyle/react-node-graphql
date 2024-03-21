const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type DailyHealthInfo {
    id: ID!
    user: ID!
    date: String!
    pulseRate: Int!
    bloodPressure: String!
    weight: Float!
    bodyTemperature: Float!
    respiratoryRate: Int!
  }

  type Query {
    getDailyHealthInfo(id: ID!): DailyHealthInfo
    getDailyHealthInfos: [DailyHealthInfo]
  }

  type Mutation {
    addDailyHealthInfo(user: ID!, pulseRate: Int!, bloodPressure: String!, weight: Float!, bodyTemperature: Float!, respiratoryRate: Int!): DailyHealthInfo
    updateDailyHealthInfo(id: ID!, user: ID, pulseRate: Int, bloodPressure: String, weight: Float, bodyTemperature: Float, respiratoryRate: Int): DailyHealthInfo
    deleteDailyHealthInfo(id: ID!): DailyHealthInfo
  }
`;

module.exports = typeDefs;