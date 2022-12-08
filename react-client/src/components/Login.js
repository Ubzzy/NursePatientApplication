import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LOGIN_USER = gql`
    mutation LoginUser( $email: String!, $password: String! ) {
        loginUser( email: $email, password: $password  )
    }
`;
const LOGGED_IN_USER = gql`
    mutation LoggedInUser {
      isLoggedIn
    }
`;

function Login() {
  // let navigate = useNavigate()

  // Hook to login student using apollo's useMutation
  const [loginUser, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER);

  // Hook to check login status using apollo's useMutation
  const [isLoggedIn, { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError }] = useMutation(LOGGED_IN_USER);

  // const [isLoggedIn, { loading1, error1 }] = useMutation(LOGGED_IN_USER, {
  //   onCompleted: (data1) => console.log("Data from mutation", data1),
  //   onError: (error1) => console.error("Error in mutation", error1),
  // });

  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  // //store input field data, user name and password
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  // let [message, setMessage] = useState('');
  //
  //send email and password to the server for initial authentication
  const authenticateUser = async () => {
    console.log('calling authenticateUser');

    try {
      await loginUser({
        variables: {
          email: email,
          password: password
        }
      });
      console.log(loginData)
      if (loginData) {
        (loginData.loginUser) === 'auth' ? (
          setScreen('auth')
        ) : (
          setScreen(loginData.loginUser)
        )
      }
    }
    catch (error) { //print the error
      setScreen('auth');
      console.log(error);
    }

  }; 

  // //check if the user already logged-in
  // const readCookie = () => {
  //   try {
  //     console.log('--- in readCookie function ---');

  //     isLoggedIn()

  //   } catch (e) {
  //     setScreen('auth');
  //     console.log('error: ', e);
  //   }
  // };

  // useEffect(() => {
  //   readCookie();
  //   if (isLoggedInData) {
  //     console.log('setting screen: ' + isLoggedInData)
  //     setScreen(isLoggedInData.isLoggedIn)
  //   }
  // }, []);

  // if (loginLoading || isLoggedInLoading) return 'Loading...';
  // if (loginError) return `Error logging in: ${loginError.message}`;
  // if (isLoggedInError) return `Error: ${isLoggedInError.message}`;

  return (
    <>
      {screen === 'auth' ? (
        <div className="w-75 m-auto p-5">
          <h1 className='text-center'>
            Login
          </h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="dark" onClick={authenticateUser} className='w-100'>
              Login
            </Button>
          </Form>
        </div>
      ) : ("Logged in as " + screen)}
    </>
  )
}

export default Login

