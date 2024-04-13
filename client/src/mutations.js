import { gql } from '@apollo/client';

export const ADD_DAILY_INFO_MUTATION = gql`
  mutation AddDailyInfo($input: DailyInfoInput!) {
    addDailyInfo(input: $input) {
      // Define the fields you expect to receive in the response
      // (optional, depends on your server implementation)
    }
  }
`;

export const SUBMIT_SYMPTOMS_MUTATION = gql`
  mutation SubmitSymptoms($input: [String]!) {
    submitSymptoms(input: $input) {
      // Define the fields you expect to receive in the response
      // (optional, depends on your server implementation)
    }
  }
`;
