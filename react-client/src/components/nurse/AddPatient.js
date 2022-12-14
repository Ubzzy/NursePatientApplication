/*import React, { Component } from 'react';
import gql from "graphql-tag";
//import { Mutation } from "react-apollo";
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const ADD_PATIENT = gql`
    mutation AddPATIENT(
        $bodyTemperature: String!,
        $heartRate: String!,
        $bloodPressure: String!,
        $respiratoryRate: String!) {
        addPatient(
            bodyTemperature: $bodyTemperature,
            heartRate: $heartRate,
            bloodPressure: $bloodPressure,
            respiratoryRate: $respiratoryRate) {
            _id
        }
    }
`;

class AddPatient extends Component {
  
    render() {
      let bodyTemperature, heartRate, bloodPressure, respiratoryRate;
      return (
        <Mutation mutation={ADD_PATIENT} onCompleted={() => this.props.history.push('/')}>
            {(addPatient, { loading, error }) => (
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                ADD PATIENT DATA
                            </h3>
                        </div>
                        <div className="panel-body">
                            <h4><Link to="/" className="btn btn-primary">Patients List</Link></h4>
                            <form onSubmit={e => {
                                e.preventDefault();
                                addPatient({ variables: { bodyTemperature: bodyTemperature.value, heartRate: heartRate.value, bloodPressure: bloodPressure.value, respiratoryRate: respiratoryRate.value } });
                                bodyTemperature.value = "";
                                heartRate.value = "";
                                bloodPressure.value = "";
                                respiratoryRate.value = "";
                            }}>
                               <div className="form-group">
                                    <label htmlFor="bodyTemperature">Body Temperature:</label>
                                    <input type="text" className="form-control" name="bodyTemperature" ref={node => {
                                        bodyTemperature = node;
                                    }} placeholder="bodyTemperature" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="heartRate">Heart Rate:</label>
                                    <input type="text" className="form-control" name="heartRate" ref={node => {
                                        heartRate = node;
                                    }} placeholder="Heart Rate: " />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bloodPressure">Blood Pressure:</label>
                                    <input type="text" className="form-control" name="bloodPressure" ref={node => {
                                        bloodPressure = node;
                                    }} placeholder="bloodPressure" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="respiratoryRate">Respiratory Rate:</label>
                                    <input type="text" className="form-control" name="respiratoryRate" ref={node => {
                                        respiratoryRate = node;
                                    }} placeholder="Respiratory Rate" />
                                </div>
                               
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Please try again with correct details</p>}
                        </div>
                    </div>
                </div>
            )}
        </Mutation>
      );
    }
  }
  
  export default Create;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import Header from "../Header";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// GraphQL mutation to add student
const ADD_PATIENT = gql`
    mutation AddPATIENT(
        $patientId: String!,
        $bodyTemperature: String!,
        $heartRate: String!,
        $bloodPressure: String!,
        $respiratoryRate: String!) {
        addPatient(
            bodyTemperature: $bodyTemperature,
            heartRate: $heartRate,
            bloodPressure: $bloodPressure,
            respiratoryRate: $respiratoryRate) {
            _id
        }
    }
`;

function AddPatient() {
    let navigate = useNavigate();

    // Hook to store student data
    const [patient, setPatient] = useState('');

    // GraphQL Mutation using apollo hook
    const [addPatient, { patientId: patientId, bodyTemperature: patientBodyTemperature, heartRate: patientHeartRate, bloodPressure: patientBloodPressure, respiratoryRate: patientRespiratoryRate }] = useMutation(ADD_PATIENT);

   // if (patientLoading) return <p>Adding Tip...</p>;
    //if (patientError) return <p>Error Adding Tip:  ${patientError.message}</p>;
    //if (patientData) { navigate('/patient') }

    // Add Tip to DB
    const savepatient = (e) => {
        e.preventDefault();
        addPatient({
            variables: {
                patientId: patient.patientId,
                bodyTemperature: patient.bodyTemperature,
                heartRate: patient.heartRate,
                bloodPressure: patient.bloodPressure,
                respiratoryRate: patient.respiratoryRate
            }
        })
    };

    //runs when user enters a field
    const onChange = (e) => {
        e.persist();
        setPatient({ ...patient, [e.target.name]: e.target.value });
    }

    const cancel = () => {
        navigate('/patient')
    }

    return (
        <>
            <Header />
            <h2 className='text-center m-2'>Add a Patient</h2>
            <Form onSubmit={savepatient} className='w-75 m-auto pt-0 p-5'>
            <Form.Group className='m-3'>
                    <Form.Label>Patient Id:</Form.Label>
                    <Form.Control type="text" name="patientId" id="patientId" placeholder="Enter a patientId" required value={patient.patientId} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Body Temperature</Form.Label>
                    <Form.Control type="text" name="bodyTemperature" id="bodyTemperature" placeholder="Enter a bodyTemperature" required value={patient.bodyTemperature} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Heart Rate</Form.Label>
                    <Form.Control type="text" name="heartRate" id="heartRate" placeholder="Enter heartRate" required value={patient.heartRate} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Blood Pressure</Form.Label>
                    <Form.Control type="text" name="bloodPressure" id="bloodPressure" placeholder="Enter bloodPressure" required value={patient.bloodPressure} onChange={onChange} />
                </Form.Group>
                <Form.Group className='m-3'>
                    <Form.Label>Respiratory Rate</Form.Label>
                    <Form.Control type="text" name="respiratoryRate" id="respiratoryRate" placeholder="Enter respiratoryRate" required value={patient.respiratoryRate} onChange={onChange} />
                </Form.Group>
                <Button variant="danger" className='w-25 me-5 ms-5' onClick={cancel}>
                    Cancel
                </Button>

                <Button variant="success" type="submit" className='w-50' onClick={savepatient}>
                    Add Patient
                </Button>
            </Form>
        </>
    )
}

export default AddPatient