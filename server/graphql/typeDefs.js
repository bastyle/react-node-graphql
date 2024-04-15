const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type DailyHealthInfo {
    id: ID!
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
    bloodPressure: Int
    respiratoryRate: Int
  }

  type PatientData {
    user: ID!
    date: String!
    vitalSigns: VitalSigns!
    symptoms: [String]
  }

  type Query {
    getDailyHealthInfo(id: ID!): DailyHealthInfo
    getDailyHealthInfos: [DailyHealthInfo]
    getDailyHealthInfosByUser(userId: ID!): [DailyHealthInfo]
    getPatientData(userId: ID!): PatientData
    getPatientDataByUser(userId: ID!): [PatientData]
  }

  type Mutation {
    addDailyHealthInfo( pulseRate: Int!, bloodPressure: Int!, weight: Float!, bodyTemperature: Float!, respiratoryRate: Int!): DailyHealthInfo
    updateDailyHealthInfo(id: ID!, pulseRate: Int, bloodPressure: String, weight: Float, bodyTemperature: Float, respiratoryRate: Int): DailyHealthInfo
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