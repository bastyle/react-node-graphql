import {useNavigate} from "react-router-dom";
import {Button, Container, Table} from "react-bootstrap";
import React from "react";
import {getUserRole, logout} from "../utils/TokenUtils";


const Header = () => {
    const username = localStorage.getItem('user');
    const role = getUserRole();
    const currentDate = new Date().toLocaleDateString();
    const navigate = useNavigate();

    const handleLogOut = async (event) => {
        event.preventDefault();
        try {
            logout();
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="d-flex ">
            <Container className="d-flex justify-content-center align-items-center custom-container p-3 my-3">
                <div className="text-center">
                    <h1>Nurse Dashboard</h1>
                    <p>Welcome, {username}! Today's date is {currentDate}.</p>
                </div>
                <Button variant="danger"  style={{marginLeft: '180px', borderRadius: '5px'}}  onClick={handleLogOut}>Logout</Button>
            </Container>
        </div>
    );
};

export default Header;