import React, {useState} from 'react';
import {Button, Form, Table} from 'react-bootstrap';
import {ApolloClient, createHttpLink, gql, InMemoryCache, useMutation, useQuery} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {grapqhQl} from "../../utils/APIRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import Header from "../Header";


// Create an http link:
const httpLink = createHttpLink({
    uri: grapqhQl, // replace with your server URL
});

// Get the authentication token from local storage if it exists
const token = localStorage.getItem('token');
//const username = localStorage.getItem('user');

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

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $firstName: String!, $lastName: String!, $email: String!, $role: String!) {
    createUser(username: $username, firstName: $firstName, lastName: $lastName, email: $email, role: $role) {
      username
      firstName
      lastName
      email
      role
    }
  }
`;


const NurseDashboard = () => {

    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [newPatient, setNewPatient] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: 'patient',
    });
    const [createUser] = useMutation(CREATE_USER, {client});

    const {loading, error, data, refetch} = useQuery(GET_USERS_BY_ROLE, {
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

    const handleCheckInfo = (userId, firstName, lastName) => {
        // Navigate to the Check Info component with the user ID
        //history.push(`/info/${userId}`);
        const finalName = firstName + ' ' + lastName;
        navigate(`/patient/${userId}/${finalName}`);
    };

    const handleInputChange = (event) => {
        setNewPatient({
            ...newPatient,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddNewPatient = async (event) => {
        event.preventDefault();

        // Validate form data
        if (!newPatient.username || !newPatient.firstName || !newPatient.lastName || !newPatient.email) {
            alert('All fields are required!');
            return;
        }
        createUser({
            variables: {
                username: newPatient.username,
                firstName: newPatient.firstName,
                lastName: newPatient.lastName,
                email: newPatient.email,
                role: newPatient.role,
            },
        }).then(() => {
            console.log('New patient created:', newPatient.username);
            alert(`New patient created. Username: ${newPatient.username}, Password: defaultPassword`);
            setShowForm(false);
            refetch();
        }).catch((error) => {
            console.error('Error creating user:', error);
            alert('Failed to create user');
        });

    };

    const currentDate = new Date().toLocaleDateString();

    return (
        <div style={{maxWidth: '80%', margin: '0 auto'}}>
            <Header/>
            <Button variant="primary" style={{margin: '10px'}} onClick={() => setShowForm(!showForm)}>
                Add New Patient
            </Button>
            {showForm && (
                <Form onSubmit={handleAddNewPatient}
                      style={{backgroundColor: '#f8f9fa', margin: '20px', padding: '20px', borderRadius: '5px'}}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={newPatient.username}
                                      onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" value={newPatient.firstName}
                                      onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" value={newPatient.lastName}
                                      onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={newPatient.email} onChange={handleInputChange}/>
                    </Form.Group>
                    <Button variant="success" style={{margin: '10px'}} type="submit">Submit</Button>
                    <Button variant="primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : 'Add New Patient'}
                    </Button>
                </Form>
            )}

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
                            {/*<Button variant="primary" onClick={() => handleEdit(user.userId)}>
                                Edit
                            </Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(user.userId)}>
                                Delete
                            </Button>{' '}*/}
                            <Button variant="info"
                                    onClick={() => handleCheckInfo(user._id, user.firstName, user.lastName)}>
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