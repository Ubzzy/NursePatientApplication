import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";

import Header from "../Header";

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

// GraphQL Query to get all tips
const GET_PATIENTS = gql`
    query getAllpatients{
        patients {
            _id
            bodyTemperature
            heartRate
            bloodPressure
            respiratoryRate
        }
    }
`;

function ListPatients() {
    let navigate = useNavigate();

    // Hook to store all tip data
    const [patients, setPateints] = useState([])

    // Hook to get data using apollo's useQuery
    const { bodyTemperature: patientBodyTemperature, heartRate: patientHeartRate, bloodPressure: patientBloodPressure, respiratoryRate: patientRespiratoryRate  } = useQuery(GET_PATIENTS)

    // Fetch and store tips on initial load
  /*  useEffect(() => {
        refetch()
        if (patientsData) {
            setPatients(patientsData.patients)
        }
    }, [patientsData])*/

   // if (tipsLoading) { return <p>Loading Tips...</p> }
   // if (tipsError) { return <p>Error Loading Tips: ${tipsError.message}</p> }

    // Navigation Routes
    const patientDetails = (id) => { navigate('/patients/details/' + id) }
    const addPatient = () => { navigate('/addPatient') }

    // Return table of tips
    return (
        <>
            <Header />
            <h1 className='text-center m-2'>List of all tips</h1>
            <div className='m-5'>
                <Button variant="primary" className='w-25 mb-2' onClick={addPatient}>
                    Add Patient
                </Button>
                <Table className='table' hover>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Patient Id</th>
                            <th scope="col">Body Temperature</th>
                            <th scope="col">Heart Rate</th>
                            <th scope="col">Blood Pressure</th>
                            <th scope="col">Respiratory Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient._id} onClick={() => { patientDetails(patient._id) }}>
                                <td>{patient.patientId}</td>
                                <td>{patient.bodyTemperature}</td>
                                <td>{patient.heartRate}</td>
                                <td>{patient.bloodPressure}</td>
                                <td>{patient.respiratoryRate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ListPatients