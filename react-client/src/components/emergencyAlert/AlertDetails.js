import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from "@apollo/client";

import Header from '../Header';
import Button from 'react-bootstrap/Button'

// GraphQL Query to get tip
const GET_ALERT = gql`
    query getAlert($_id: String!) {
        alert(id: $_id) {
            _id
            patientId
            status
            attendedBy
            alertedOn
        }
    }
`;

// GraphQL Query to delete tip
const DELETE_ALERT = gql`
    mutation DeleteAlert($_id: String!) {
        deleteAlert(id: $_id) {
            _id
        }
    }
`;

function AlertDetails() {
    let { id } = useParams();
    let navigate = useNavigate();

    // Hook to store tip details
    const [alert, setAlert] = useState('');

    // Hook to get tip using apollo's useQuery
    const { data: getAlertData, loading: getAlertLoading, error: getAlertError } = useQuery(GET_ALERT, { variables: { _id: id } })

    // fetch tip details
    useEffect(() => {
        if (getAlertData) {
            setAlert(getAlertData.alert)
        }
    }, [getAlertData])

    // Hook to get tip using apollo's useQuery
    const [deleteAlert, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_ALERT, { variables: { _id: id } })


    if (getAlertLoading) return <p>Loading Alert...</p>;
    if (deleteLoading) return <p>Deleting Alert...</p>;
    if (getAlertError) return <p>Error Loading Alert:  ${getAlertError.message}</p>;
    if (deleteError) return <p>Error deleting Alert:  ${deleteError.message}</p>;

    // Delete tip and navigate
    const deleteAndRedirect = (id) => {
        deleteAlert(id)
        navigate('/alerts')
    }

    // Navigate to Edit page
    const editAlert = (id) => { navigate('/alerts/edit/' + id) }

    const back = () => {
        navigate('/alerts')
    }

    return (
        <>
            <Header />
            <div className='w-50 m-auto mt-3'>
                <Button className="btn btn-primary" onClick={back}>
                    Back to Alerts
                </Button>
                <h1 className='text-center m-2'>Alert Details</h1>

                <div><b>PatientId:</b> {alert.patientId}</div>
                <div><b>Status:</b> {alert.status}</div>
                <div><b>Attended By:</b> {alert.attendedBy}</div>
                <div><b>Alerted On:</b> {alert.alertedOn}</div>

                <Button className="btn btn-danger m-3" onClick={() => { deleteAndRedirect(alert._id) }}>
                    Delete
                </Button>

                <Button className="btn btn-success m-3" onClick={() => { editAlert(alert._id) }}>
                    Edit Alert
                </Button>
            </div>
        </>
    )
}

export default AlertDetails