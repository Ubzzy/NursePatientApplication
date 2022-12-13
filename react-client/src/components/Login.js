import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            _id
            firstName
            lastName
            email
            password
            isNurse
        }
    }
`;
const LOGGED_IN_USER = gql`
    mutation LoggedInUser {
        isLoggedIn
    }
`;

function Login() {
    let navigate = useNavigate();

    // Hook to login student using apollo's useMutation
    const [
        loginUser,
        { data: loginData, loading: loginLoading, error: loginError },
    ] = useMutation(LOGIN_USER);

    // Hook to check login status using apollo's useMutation
    const [
        isLoggedIn,
        {
            data: isLoggedInData,
            loading: isLoggedInLoading,
            error: isLoggedInError,
        },
    ] = useMutation(LOGGED_IN_USER);

    //state variable for the screen, admin or user
    const [screen, setScreen] = useState("auth");
    // //store input field data, user name and password
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const authenticateUser = async () => {
        console.log("calling authenticateUser");

        try {
            await loginUser({
                variables: {
                    email: email,
                    password: password,
                },
            });

            if (loginData) {
                window.localStorage.setItem("user", JSON.stringify(loginData));
                navigate("/home");
            }
        } catch (error) {
            //print the error
            setScreen("auth");
            console.log("error", error);
        }
    };

    return (
        <>
            <div className="w-50 m-auto p-5">
                <h1 className="text-center">Login</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        variant="dark"
                        onClick={authenticateUser}
                        className="w-100"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Login;
