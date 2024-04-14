import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {Button, Container, Table} from "react-bootstrap";
import React from "react";
import {getUserRole} from "../utils/TokenUtils";

const Header = () => {
    const username = localStorage.getItem('user');
    const role = getUserRole();
    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center custom-container p-3 my-3">
                <div className="text-center">
                    <h1>Nurse Dashboard</h1>
                    <p>Welcome, {username}! Today's date is {currentDate}.</p>
                </div>
            </Container>
        </div>
    );
};

export default Header;