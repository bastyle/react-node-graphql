import {gql, useMutation, useQuery} from '@apollo/client';
import apolloClient from "../../utils/ApolloUtils";
import Header from "../Header";
import {Button, Card, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {getUserId} from "../../utils/TokenUtils";

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

const ADD_DAILY_HEALTH_INFO = gql`
  mutation AddDailyHealthInfo($user: ID!, $pulseRate: Int!, $bloodPressure: String!, $weight: Float!, $bodyTemperature: Float!, $respiratoryRate: Int!, $symptoms: [String!]!) {
    addDailyHealthInfo(user: $user, pulseRate: $pulseRate, bloodPressure: $bloodPressure, weight: $weight, bodyTemperature: $bodyTemperature, respiratoryRate: $respiratoryRate, symptoms: $symptoms) {
      id
      user
      pulseRate
      bloodPressure
      weight
      bodyTemperature
      respiratoryRate
      symptoms
    }
  }
`;

const PatientDashboard = () => {

    const [addDailyHealthInfo] = useMutation(ADD_DAILY_HEALTH_INFO, {client: apolloClient});
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!newData.pulseRate || !newData.bloodPressure || !newData.weight || !newData.bodyTemperature || !newData.respiratoryRate || !newData.symptoms) {
            alert('All fields are required!');
            return;
        }
        console.log('newData:', newData);


        addDailyHealthInfo({
            variables: {
                user: getUserId(),
                pulseRate: parseInt(newData.pulseRate),
                bloodPressure: newData.bloodPressure,
                weight: parseFloat(newData.weight),
                bodyTemperature: parseFloat(newData.bodyTemperature),
                respiratoryRate: parseInt(newData.respiratoryRate),
                symptoms: newData.symptoms,
            },
        }).then(() => {
            alert('Daily health info added successfully!');
            setShowDailyInfoForm(false);
            refetch();
        }).catch((error) => {
            console.error('Failed to add daily health info:', error);
        });
    };

    const {loading, error, data, refetch} = useQuery(GET_DAILY_HEALTH_INFOS_BY_USER, {
        client: apolloClient, variables: {userId: localStorage.getItem('userId')},
    });

    const [showDailyInfoForm, setShowDailyInfoForm] = useState(false);
    const [newData, setNewData] = useState({
        pulseRate: '',
        bloodPressure: '',
        weight: '',
        bodyTemperature: '',
        respiratoryRate: '',
        symptoms: ''
    });

    const handleInputChange = (event) => {
        setNewData({
            ...newData,
            [event.target.name]: event.target.value
        });
    };

    const handleInputChange2 = (event) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setNewData({
            ...newData,
            [event.target.name]: value
        });
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <Header/>
            <Container>
                <h2>Patient Health Daily Information</h2>
                <Button variant="primary" style={{margin: '10px'}}
                        onClick={() => setShowDailyInfoForm(!showDailyInfoForm)}>
                    Add Daily Information
                </Button>
                {showDailyInfoForm && (
                    <Form onSubmit={handleFormSubmit}
                          style={{backgroundColor: '#f8f9fa', margin: '20px', padding: '20px', borderRadius: '5px'}}>
                        <Form.Group controlId="pulseRate">
                            <Form.Label style={{fontWeight: 'bold'}}>Pulse Rate</Form.Label>
                            <Form.Control type="text" name="pulseRate" value={newData.pulseRate}
                                          onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="bloodPressure">
                            <Form.Label style={{fontWeight: 'bold'}}>Blood Pressure</Form.Label>
                            <Form.Control type="text" name="bloodPressure" value={newData.bloodPressure}
                                          onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="weight">
                            <Form.Label style={{fontWeight: 'bold'}}>Weight</Form.Label>
                            <Form.Control type="text" name="weight" value={newData.weight}
                                          onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="bodyTemperature">
                            <Form.Label style={{fontWeight: 'bold'}}>Body Temperature</Form.Label>
                            <Form.Control type="text" name="bodyTemperature" value={newData.bodyTemperature}
                                          onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="respiratoryRate">
                            <Form.Label style={{fontWeight: 'bold'}}>Respiratory Rate</Form.Label>
                            <Form.Control type="text" name="respiratoryRate" value={newData.respiratoryRate}
                                          onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="symptoms">
                            <Form.Label style={{fontWeight: 'bold'}}>Symptoms</Form.Label>
                            <Form.Control as="select" multiple name="symptoms" value={newData.symptoms}
                                          onChange={handleInputChange2}>
                                <option value="cough">Cough</option>
                                <option value="fever">Fever</option>
                                <option value="headache">Headache</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="success" style={{margin: '10px'}} type="submit">Submit</Button>
                        <Button variant="danger" style={{margin: '10px'}}
                                onClick={() => setShowDailyInfoForm(false)}>Cancel</Button>
                    </Form>
                )}
                {data.getDailyHealthInfosByUser.map((info) => (
                    <Card key={info.id} style={{marginBottom: '.5rem', backgroundColor: '#f8f9fa', padding: '0.5px', borderRadius: '15px'}}>
                        <Card.Body>
                            <Card.Title style={{fontWeight: 'bold', color: '#007bff'}}>
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
                            <Card.Text style={{fontSize: '1.2rem'}}>Pulse Rate: {info.pulseRate}</Card.Text>
                            <Card.Text style={{fontSize: '1.2rem'}}>Blood Pressure: {info.bloodPressure}</Card.Text>
                            <Card.Text style={{fontSize: '1.2rem'}}>Weight: {info.weight}</Card.Text>
                            <Card.Text style={{fontSize: '1.2rem'}}>Body Temperature: {info.bodyTemperature}</Card.Text>
                            <Card.Text style={{fontSize: '1.2rem'}}>Respiratory Rate: {info.respiratoryRate}</Card.Text>
                            <Card.Text style={{fontSize: '1.2rem'}}>Symptoms: {info.symptoms.join(', ')}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

export default PatientDashboard;