import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../Header';

// GraphQL Query to Get tip
const GET_TIP = gql`
    query getTip($_id: String!) {
        tip(id: $_id) {
            _id
            message
            createdBy
        }
    }
`;

// GraphQL Query to Update tip
const UPDATE_TIP = gql`
    mutation UpdateTip($_id: String!, $message: String!, $createdBy:String!) {
        updateTip(_id: $_id, message: $message, createdBy: $createdBy) {
            _id
        }
    }
`;

function EditTip() {
    let { id } = useParams();
    let navigate = useNavigate();

    // Hook to store and modify student data
    const [tip, setTip] = useState('');

    // Hook to get tip using apollo's useQuery
    const { data: getTipData, loading: getTipLoading, error: getTipError } = useQuery(GET_TIP, { variables: { _id: id } })

    // fetch tip details
    useEffect(() => {
        if (getTipData) {
            setTip(getTipData.tip)
        }
    }, [getTipData])

    // Hook to Update tip using apollo's useMutation
    const [updateTip, { loading: updateLoading, error: updateError, data: updateData }] = useMutation(UPDATE_TIP)

    // Update tip and redirect
    const saveTip = (e) => {
        e.preventDefault();
        updateTip({
            variables: {
                _id: id,
                message: tip.message,
                createdBy: tip.createdBy
            }
        })

        if (updateLoading) return <p>Updating Tip...</p>;
        if (updateError) return <p>Error Updating Tip:  ${updateError.message}</p>;

        navigate('/tips')
    };

    if (getTipLoading) return <p>Loading Tip...</p>;
    if (getTipError) return <p>Error Loading Tip:  ${getTipError.message}</p>;

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
            <Header/>
            <h2 className='text-center m-2'>Edit Tip Details</h2>
            <Form onSubmit={saveTip} className='w-75 m-auto pt-0 p-5'>
                <Form.Group className='m-3'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" name="message" id="message" placeholder="Enter a helpful tip for the patients" value={tip.message} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Created By</Form.Label>
                    <Form.Control type="text" name="createdBy" id="createdBy" placeholder="Enter your Name" value={tip.createdBy} onChange={onChange} />
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

export default EditTip