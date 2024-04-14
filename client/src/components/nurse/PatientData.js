import {ApolloClient, createHttpLink, gql, InMemoryCache, useQuery} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {grapqhQl} from "../../utils/APIRoutes";
import {useParams} from "react-router-dom";
import {Card, Container, ListGroup} from "react-bootstrap";

// Create an http link:
const httpLink = createHttpLink({
    uri: grapqhQl, // replace with your server URL
});

// Get the authentication token from local storage if it exists
const token = localStorage.getItem('token');


// Create an authentication link:
const authLink = setContext((_, {headers}) => {
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

const GET_PATIENT_DATA = gql`
  query GetPatientData($id: ID!) {
    getPatientDataByUser(userId: $id) {
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

const PatientComponent = () => {
    console.log("PatientComponent");
  //const { id } = useParams();
  const id ='65fca5cc55004c66bd09b66a';
  /*const { loading, error, data } = useQuery(GET_PATIENT_DATA, client, {
    variables: { id },
  });*/

    const {loading, error, data} = useQuery(GET_PATIENT_DATA, {
        client, variables: { id },
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Now you can use data.getPatientDataByUser to access the patient data
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
};

export default PatientComponent;