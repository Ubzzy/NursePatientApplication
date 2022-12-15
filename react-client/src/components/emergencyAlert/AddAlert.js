import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import Header from "../Header";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// GraphQL mutation to add student
const ADD_ALERT = gql`
    mutation AddAlert( $status:String!,$attendedBy:String!,$alertedOn:String!) {
        addAlert( status: $status, attendedBy: $attendedBy, alertedOn: $alertedOn ) {
        _id
        }
    }
`

function AddAlert() {
    let navigate = useNavigate();

    // Hook to store student data
    const [alert, setAlert] = useState('');

    // GraphQL Mutation using apollo hook
    const [addAlert, { data: alertData, loading: alertLoading, error: alertError }] = useMutation(ADD_ALERT);

    if (alertLoading) return <p>Adding Alert...</p>;
    if (alertError) return <p>Error Adding Alert:  ${alertError.message}</p>;
    if (alertData) { navigate('/alerts') }

    // Add Tip to DB
    const saveAlert = (e) => {
        e.preventDefault();
        addAlert({
            variables: {
               // patientId: alert.patientId,
                status: alert.status,
                attendedBy: alert.attendedBy,
                alertedOn: alert.alertedOn
            }
        })
    };

    //runs when user enters a field
    const onChange = (e) => {
        e.persist();
        setAlert({ ...alert, [e.target.name]: e.target.value });
    }

    const cancel = () => {
        navigate('/alerts')
    }

    return (
        <>
            <Header />
            <h2 className='text-center m-2'>Add a Alert</h2>
            <Form onSubmit={saveAlert} className='w-75 m-auto pt-0 p-5'>
                <Form.Group className='m-3'>
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" name="status" id="status" placeholder="Enter an Alert" required value={alert.status} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Attended By</Form.Label>
                    <Form.Control type="attendedBy" name="attendedBy" id="attendedBy" placeholder="Attended By" required value={alert.attendedBy} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Alerted On</Form.Label>
                    <Form.Control type="alertedOn" name="alertedOn" id="alertedOn" placeholder="AlertedOn" required value={alert.alertedOn} onChange={onChange} />
                </Form.Group>
                <Button variant="danger" className='w-25 me-5 ms-5' onClick={cancel}>
                    Cancel
                </Button>

                <Button variant="success" type="submit" className='w-50'>
                    Add Alert
                </Button>
            </Form>
        </>
    )
}

export default AddAlert