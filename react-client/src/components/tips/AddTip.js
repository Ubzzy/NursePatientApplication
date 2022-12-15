import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import Header from "../Header";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// GraphQL mutation to add student
const ADD_TIP = gql`
    mutation AddTip($message: String!, $createdBy:String!) {
        addTip(message: $message, createdBy: $createdBy) {
        _id
        }
    }
`

function AddTip() {
    let navigate = useNavigate();

    // Hook to store student data
    const [tip, setTip] = useState('');

    // GraphQL Mutation using apollo hook
    const [addTip, { data: tipData, loading: tipLoading, error: tipError }] = useMutation(ADD_TIP);

    if (tipLoading) return <p>Adding Tip...</p>;
    if (tipError) return <p>Error Adding Tip:  ${tipError.message}</p>;
    if (tipData) { navigate('/tips') }

    // Add Tip to DB
    const saveTip = (e) => {
        e.preventDefault();
        addTip({
            variables: {
                message: tip.message,
                createdBy: tip.createdBy
            }
        })
    };

    //runs when user enters a field
    const onChange = (e) => {
        e.persist();
        setTip({ ...tip, [e.target.name]: e.target.value });
    }

    const cancel = () => {
        navigate('/tips')
    }

    return (
        <>
            <Header />
            <h2 className='text-center m-2'>Add a Tip</h2>
            <Form onSubmit={saveTip} className='w-75 m-auto pt-0 p-5'>
                <Form.Group className='m-3'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" name="message" id="message" placeholder="Enter a helpful tip for the patients" required value={tip.message} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Created By</Form.Label>
                    <Form.Control type="text" name="createdBy" id="createdBy" placeholder="Enter your Name" required value={tip.createdBy} onChange={onChange} />
                </Form.Group>
                <Button variant="success"  className='me-2' type="submit">
                    Add Tip
                </Button>
                <Button variant="danger" onClick={cancel}>
                    Cancel
                </Button>
            </Form>
        </>
    )
}

export default AddTip