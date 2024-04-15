import {gql, useQuery} from '@apollo/client';
import apolloClient from "../../utils/ApolloUtils";
import Header from "../Header";
import {Card, Container} from "react-bootstrap";

const GET_DAILY_HEALTH_INFOS_BY_USER = gql`
  query GetDailyHealthInfosByUser($userId: ID!) {
    getDailyHealthInfosByUser(userId: $userId) {
      id
      user
      pulseRate
      bloodPressure
      weight
      bodyTemperature
      respiratoryRate
      symptoms
      date
    }
  }
`;

const PatientDashboard = () => {
    const {loading, error, data, refetch} = useQuery(GET_DAILY_HEALTH_INFOS_BY_USER, {
        client: apolloClient, variables: {userId: localStorage.getItem('userId')},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <Header/>
            <Container>

                <h2>Patient Health Daily Information</h2>
                {data.getDailyHealthInfosByUser.map((info) => (
                    <Card key={info.id} style={{marginBottom: '1rem'}}>
                        <Card.Body>
                            <Card.Title>
                                {
                                    new Date(Number(info.date)).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    })
                                }
                            </Card.Title>
                            <Card.Text>Pulse Rate: {info.pulseRate}</Card.Text>
                            <Card.Text>Blood Pressure: {info.bloodPressure}</Card.Text>
                            <Card.Text>Weight: {info.weight}</Card.Text>
                            <Card.Text>Body Temperature: {info.bodyTemperature}</Card.Text>
                            <Card.Text>Respiratory Rate: {info.respiratoryRate}</Card.Text>
                            <Card.Text>Symptoms: {info.symptoms.join(', ')}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

export default PatientDashboard;