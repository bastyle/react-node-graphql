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
  
  type VitalSigns {
    bodyTemperature: Float
    heartRate: Int
    bloodPressure: String
    respiratoryRate: Int
  }

  type PatientData {
    user: ID!
    date: String!
    vitalSigns: VitalSigns!
    symptoms: [String]
  }
  type User {
    username: String!
    firstName: String!
    userId: String!
    lastName: String!
    email: String!
    role: String!
    _id: ID!
  }
  
  type Query {
    getDailyHealthInfo(id: ID!): DailyHealthInfo
    getDailyHealthInfos: [DailyHealthInfo]
    getDailyHealthInfosByUser(userId: ID!): [DailyHealthInfo]
    getPatientData(userId: ID!): PatientData
    getPatientDataByUser(userId: ID!): [PatientData]
    getUsersByRole(role: String!): [User]
  }

  type Mutation {
    addDailyHealthInfo(user: ID!, pulseRate: Int!, bloodPressure: String!, weight: Float!, bodyTemperature: Float!, respiratoryRate: Int!): DailyHealthInfo
    updateDailyHealthInfo(id: ID!, user: ID, pulseRate: Int, bloodPressure: String, weight: Float, bodyTemperature: Float, respiratoryRate: Int): DailyHealthInfo
    deleteDailyHealthInfo(id: ID!): DailyHealthInfo
    addPatientData(user: ID!, vitalSigns: VitalSignsInput!, symptoms: [String]): PatientData
  }
  
 input VitalSignsInput {
    bodyTemperature: Float
    heartRate: Int
    bloodPressure: String
    respiratoryRate: Int
  }
`;

module.exports = typeDefs;