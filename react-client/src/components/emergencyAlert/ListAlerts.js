import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";

import Header from "../Header";

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

// GraphQL Query to get all tips
const GET_ALERTS = gql`
    query getAllalerts{
        alerts {
            _id
            
            status
            attendedBy
            alertedOn
        }
    }
`;

function ListAlerts() {
    let navigate = useNavigate();

    // Hook to store all tip data
    const [alerts, setAlerts] = useState([])

    // Hook to get data using apollo's useQuery
    const { loading: alertsLoading, error: alertsError, data: alertsData, refetch } = useQuery(GET_ALERTS)

    // Fetch and store tips on initial load
    useEffect(() => {
        refetch()
        if (alertsData) {
            setAlerts(alertsData.alerts)
        }
    }, [alertsData])

    if (alertsLoading) { return <p>Loading Alerts...</p> }
    if (alertsError) { return <p>Error Loading Alerts: ${alertsError.message}</p> }

    // Navigation Routes
    const alertDetails = (id) => { navigate('/alerts/details/' + id) }
    const addAlert = () => { navigate('/alerts/add') }

    // Return table of tips
    return (
        <>
            <Header />
            <h1 className='text-center m-2'>List of all alerts</h1>
            <div className='m-5'>
                <Button variant="primary" className='w-25 mb-2' onClick={addAlert}>
                    Add Alert
                </Button>
                <Table className='table' hover>
                    <thead className='table-dark'>
                        <tr>
                            
                            <th scope="col">Status</th>
                            <th scope="col">Attended By</th>
                            <th scope="col">Alerted On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.map((alert) => (
                            <tr key={alert._id} onClick={() => { alertDetails(alert._id) }}>
                                
                                <td>{alert.status}</td>
                                <td>{alert.attendedBy}</td>
                                <td>{alert.alertedOn}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ListAlerts