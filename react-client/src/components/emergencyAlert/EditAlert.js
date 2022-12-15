import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../Header';

// GraphQL Query to Get tip
const GET_ALERT = gql`
    query getAlert($_id: String!) {
        alert(id: $_id) {
            _id
            patientId
            status
            attendedBy
            createdOn
        }
    }
`;

// GraphQL Query to Update tip
const UPDATE_ALERT = gql`
    mutation UpdateAlert($_id: String!, $patientId: String!, $status:String!, $attendedBy:String!, $alertedOn:String!) {
        updateTip(_id: $_id, message: $message, createdBy: $createdBy) {
            _id
        }
    }
`;

function EditAlert() {
    let { id } = useParams();
    let navigate = useNavigate();

    // Hook to store and modify student data
    const [alert, setAlert] = useState('');

    // Hook to get tip using apollo's useQuery
    const { data: getAlertData, loading: getAlertLoading, error: getAlertError } = useQuery(GET_ALERT, { variables: { _id: id } })

    // fetch tip details
    useEffect(() => {
        if (getAlertData) {
            setAlert(getAlertData.alert)
        }
    }, [getAlertData])

    // Hook to Update tip using apollo's useMutation
    const [updateAlert, { loading: updateLoading, error: updateError, data: updateData }] = useMutation(UPDATE_ALERT)

    // Update tip and redirect
    const saveAlert = (e) => {
        e.preventDefault();
        updateAlert({
            variables: {
                _id: id,
                patientId: alert.patientId,
                status: alert.status,
                attendedBy: alert.attendedBy,
                alertedOn: alert.alertedOn
            }
        })

        if (updateLoading) return <p>Updating Alert...</p>;
        if (updateError) return <p>Error Updating Alert:  ${updateError.message}</p>;

        navigate('/alerts')
    };

    if (getAlertLoading) return <p>Loading Alert...</p>;
    if (getAlertError) return <p>Error Loading Alert:  ${getAlertError.message}</p>;

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
            <Header/>
            <h2 className='text-center m-2'>Edit Alert Details</h2>
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
                    Confirm Edit
                </Button>
            </Form>
        </>
    )
}

export default EditAlert