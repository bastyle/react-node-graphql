import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { gql, useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, ListGroup } from 'react-bootstrap';

// Create an http link:
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/api/graphql', // replace with your server URL
});

// Get the authentication token from local storage if it exists
//const token = 'localStorage.getItem('authToken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzN2ZmYzgxOC0xMGM2LTRkZjUtYTUwZC05YWRjMDg5YjEzNDMiLCJwcm9maWxlIjoibnVyc2UiLCJpYXQiOjE3MTMwNTA4ODgsImV4cCI6MTcxMzA1NDQ4OH0.9DJ68vI82AQXwn8jx5LQ815H7Xq3jCG41hIxS30HXcY'

// Create an authentication link:
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Create the Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the httpLink
  cache: new InMemoryCache()
});

const GET_PATIENT_DATA_BY_USER = gql`
  query GetPatientDataByUser {
    getPatientDataByUser(userId: "65fca5cc55004c66bd09b66a") {
      user
      date
      vitalSigns {
        bodyTemperature
        heartRate
        bloodPressure
        respiratoryRate
      }
      symptoms
    }
  }
`;

/*function PatientData() {
  const { loading, error, data } = useQuery(GET_PATIENT_DATA_BY_USER, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Patient Data</h3>
      {data.getPatientDataByUser.map((patientData, index) => (
        <div key={index}>
          <p>User: {patientData.user}</p>
          <p>Date: {new Date(parseInt(patientData.date)).toLocaleString()}</p>
          <p>Body Temperature: {patientData.vitalSigns.bodyTemperature}</p>
          <p>Heart Rate: {patientData.vitalSigns.heartRate}</p>
          <p>Blood Pressure: {patientData.vitalSigns.bloodPressure}</p>
          <p>Respiratory Rate: {patientData.vitalSigns.respiratoryRate}</p>
          <p>Symptoms: {patientData.symptoms.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}*/

function PatientData() {
  const { loading, error, data } = useQuery(GET_PATIENT_DATA_BY_USER, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
      <Container>
        <h3>Patient Data</h3>
        {data.getPatientDataByUser.map((patientData, index) => (
            <Card key={index} className="mb-3">
              <Card.Header>User: {patientData.user}</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Date: {new Date(parseInt(patientData.date)).toLocaleString()}</ListGroup.Item>
                <ListGroup.Item>Body Temperature: {patientData.vitalSigns.bodyTemperature}</ListGroup.Item>
                <ListGroup.Item>Heart Rate: {patientData.vitalSigns.heartRate}</ListGroup.Item>
                <ListGroup.Item>Blood Pressure: {patientData.vitalSigns.bloodPressure}</ListGroup.Item>
                <ListGroup.Item>Respiratory Rate: {patientData.vitalSigns.respiratoryRate}</ListGroup.Item>
                <ListGroup.Item>Symptoms: {patientData.symptoms.join(', ')}</ListGroup.Item>
              </ListGroup>
            </Card>
        ))}
      </Container>
  );
}

export default PatientData;