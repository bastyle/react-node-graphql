import React from 'react';
import {Button, Container, Table} from 'react-bootstrap';
import {ApolloClient, createHttpLink, gql, InMemoryCache, useQuery} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {grapqhQl} from "../../utils/APIRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';

//import { useHistory } from 'react-router-dom';


// Create an http link:
const httpLink = createHttpLink({
    uri: grapqhQl, // replace with your server URL
});

// Get the authentication token from local storage if it exists
const token = localStorage.getItem('token');
const username = localStorage.getItem('user');

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

const GET_USERS_BY_ROLE = gql`
  query GetUsersByRole($role: String!) {
    getUsersByRole(role: $role) {
      username
      firstName
      lastName
      email
      role
      userId
      _id
    }
  }
`;


const NurseDashboard = () => {
    const {loading, error, data} = useQuery(GET_USERS_BY_ROLE, {
        client, variables: {role: 'patient'},
    });

    //const history = useHistory();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const handleEdit = (userId) => {
        // Navigate to the Edit component with the user ID
        //history.push(`/edit/${userId}`);
    };

    const handleDelete = (userId) => {
        // Call your delete function here
    };

    const handleCheckInfo = (userId) => {
        // Navigate to the Check Info component with the user ID
        //history.push(`/info/${userId}`);
    };
    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center custom-container p-3 my-3">
                <div className="text-center">
                    <h1>Nurse Dashboard</h1>
                    <p>Welcome, {username}! Today's date is {currentDate}.</p>
                </div>
            </Container>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.getUsersByRole.map((user) => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleEdit(user.userId)}>
                                Edit
                            </Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(user.userId)}>
                                Delete
                            </Button>{' '}
                            <Button variant="info" onClick={() => handleCheckInfo(user.userId)}>
                                Check Info
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default NurseDashboard;