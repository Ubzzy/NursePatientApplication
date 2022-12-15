import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../Header';

// GraphQL mutation to add user
const ADD_USER = gql`
mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $isNurse: Boolean!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, isNurse: $isNurse) {
      _id
    }
  }
`

function AddUser() {
    let navigate = useNavigate();

    // Hook to store user data
    const [user, setUser] = useState('');
    const [isNurse, setIsNurse] = useState(false);

    // GraphQL Mutation using apollo hook
    const [addUser, { loading, error, data }] = useMutation(ADD_USER);

    if (loading) return <p>Adding User...</p>;
    if (error) return <p>Error :  ${error.message}</p>;
    if (data) {
        console.log("user added: " + JSON.stringify.data)
        navigate('/nurse-dashboard')
    }

    // Add User to DB
    const saveUser = (e) => {
        e.preventDefault();
        addUser({
            variables: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                isNurse: isNurse
            }
        })
    };

    //runs when user enters a field
    const onChange = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    // isNurse Checkbox
    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setIsNurse(true);
        } else {
            setIsNurse(false);
        }
    };

    const cancel = () => {
        navigate('/nurse-dashboard')
    }

    return (
        <>
            <Header />
            <h2 className='text-center m-2'>Add a User</h2>
            <Form onSubmit={saveUser} className='w-75 m-auto pt-0 p-5'>
                <Form.Group className='m-3'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={user.firstName} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={user.lastName} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" id="email" placeholder="Enter Email" value={user.email} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={user.password} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Check
                        type="checkbox"
                        label="Is Nurse"
                        checked={isNurse}
                        onChange={handleCheckbox}
                    />
                </Form.Group>

                <Button variant="success"  className='me-2' type="submit">
                    Add User
                </Button>
                <Button variant="danger" onClick={cancel}>
                    Cancel
                </Button>
            </Form>
        </>
    )
}

export default AddUser