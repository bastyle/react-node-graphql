import {gql, useMutation, useQuery} from '@apollo/client';
import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from 'react';
import {Button, Card, Container, Form, ListGroup} from 'react-bootstrap';
import Header from "../Header";
import apolloClient from "../../utils/ApolloUtils";



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


const ADD_PATIENT_DATA = gql`
  mutation AddPatientData($user: ID!, $vitalSigns: VitalSignsInput!, $symptoms: [String!]!) {
    addPatientData(user: $user, vitalSigns: $vitalSigns, symptoms: $symptoms) {
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
    const {id, name} = useParams();
    console.log('id:::', id, 'name:', name)
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [newData, setNewData] = useState({
        bodyTemperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: '',
        symptoms: ''
    });

    const handleInputChange = (event) => {
        setNewData({
            ...newData,
            [event.target.name]: event.target.value
        });
    };

    //
    const [addPatientData] = useMutation(ADD_PATIENT_DATA, {client: apolloClient});

    const handleAddNewData = (event) => {
        event.preventDefault();

        // Validate form data
        if (!newData.bodyTemperature || !newData.heartRate || !newData.bloodPressure || !newData.respiratoryRate || !newData.symptoms) {
            alert('All fields are required!');
            return;
        }

        // Run the mutation
        addPatientData({
            variables: {
                user: id,
                vitalSigns: {
                    bodyTemperature: parseFloat(newData.bodyTemperature),
                    heartRate: parseInt(newData.heartRate),
                    bloodPressure: newData.bloodPressure,
                    respiratoryRate: parseInt(newData.respiratoryRate),
                },
                symptoms: newData.symptoms.split(',').map(symptom => symptom.trim()),
            },
        }).then(() => {
            alert('Patient data added successfully!');
            setShowForm(false);
            refetch();
        }).catch((error) => {
            console.error('Failed to add patient data:', error);
        });
    };

    //

    const {loading, error, data, refetch} = useQuery(GET_PATIENT_DATA, {
        client: apolloClient, variables: {id},
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return (
        <div>
            <Header/>
            <Container>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3>Patient Data ({name})</h3>
                    <div>
                        <Button variant="secondary" style={{margin: '10px'}} onClick={() => navigate(-1)}>Go
                            Back</Button>
                        <Button variant="primary" style={{margin: '10px'}} onClick={() => setShowForm(!showForm)}>Add
                            New Data</Button>
                    </div>
                </div>

                {showForm && (
                    <Form onSubmit={handleAddNewData}
                          style={{backgroundColor: '#f8f9fa', margin: '20px', padding: '20px', borderRadius: '5px'}}>
                        <h4>Add New Patient Data</h4>
                        <Form.Group controlId="bodyTemperature">
                            <Form.Label>Body Temperature</Form.Label>
                            <Form.Control type="text" name="bodyTemperature" value={newData.bodyTemperature}
                                          onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="heartRate">
                            <Form.Label>Heart Rate</Form.Label>
                            <Form.Control type="text" name="heartRate" value={newData.heartRate}
                                          onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="bloodPressure">
                            <Form.Label>Blood Pressure</Form.Label>
                            <Form.Control type="text" name="bloodPressure" value={newData.bloodPressure}
                                          onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group controlId="respiratoryRate">
                            <Form.Label>Respiratory Rate</Form.Label>
                            <Form.Control type="text" name="respiratoryRate" value={newData.respiratoryRate}
                                          onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="symptoms">
                            <Form.Label>Symptoms</Form.Label>
                            <Form.Control type="text" name="symptoms" value={newData.symptoms}
                                          onChange={handleInputChange}/>
                        </Form.Group>

                        <Button variant="success" style={{margin: '10px'}} type="submit">Submit</Button>
                        <Button variant="danger" style={{margin: '10px'}}
                                onClick={() => setShowForm(false)}>Cancel</Button>
                    </Form>
                )}


                {data.getPatientDataByUser.map((patientData, index) => (
                    <Card key={index} className="mb-3">
                        <Card.Header>Date: {new Date(parseInt(patientData.date)).toLocaleString()}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Body Temperature: {patientData.vitalSigns.bodyTemperature}</ListGroup.Item>
                            <ListGroup.Item>Heart Rate: {patientData.vitalSigns.heartRate}</ListGroup.Item>
                            <ListGroup.Item>Blood Pressure: {patientData.vitalSigns.bloodPressure}</ListGroup.Item>
                            <ListGroup.Item>Respiratory Rate: {patientData.vitalSigns.respiratoryRate}</ListGroup.Item>
                            <ListGroup.Item>Symptoms: {patientData.symptoms.join(', ')}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

export default PatientComponent;