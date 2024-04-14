import {jwtDecode} from "jwt-decode";

function setToken(token) {
  localStorage.setItem('token', token);
}

export function login(token) {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    localStorage.setItem('user', decodedToken.username);
    localStorage.setItem('userId', decodedToken.userId);
    localStorage.setItem('userRole', decodedToken.profile);
}

export function logout() {
    localStorage.removeItem(JSON.stringify('token'));
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
}

export function getToken() {
    return JSON.parse(localStorage.getItem("token"));
}

export function getUser() {
    return localStorage.getItem('user');
}

export function getUserId() {
    return localStorage.getItem('userId');
}

export function getUserRole() {
    return localStorage.getItem('userRole');
}