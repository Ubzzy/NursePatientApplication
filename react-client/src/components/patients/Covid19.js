import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Header from "../Header";

const ADD_COVID19 = gql`
  mutation AddCovid19($firstName: String!, $lastName: String!, $symptoms: [String], $submittedOn: String) {
    addCovid19(firstName: $firstName, lastName: $lastName, symptoms: $symptoms, submittedOn: $submittedOn) {
      _id
    }
  }
`;

const Covid19 = () => {

  useEffect(() => {
    readCookie()
  }, []); //only the first render

  const [user, setUser] = useState();
  const [symptoms, setSymptoms] = useState([]);

  const navigate = useNavigate();

  // GraphQL Mutation using apollo hook
  const [addCovid19, { loading, error, data }] = useMutation(ADD_COVID19);

  if (loading) return <p>Adding User...</p>;
  if (error) return <p>Error :  ${error.message}</p>;
  if (data) {
    console.log("Covid19 symptoms submitted: " + JSON.stringify.data)
    user.isNurse ? (
      navigate('/nurse-dashboard')
    ) : (
      navigate('/dashboard')
    )
  }

  // Add User to DB
  const submitForm = (e) => {
    e.preventDefault();
    console.log(symptoms)
    addCovid19({
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        symptoms: symptoms,
        submittedOn: ''
      }
    })
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setSymptoms([...symptoms, e.target.value]);
    } else {
      setSymptoms(symptoms.filter((symptom) => symptom !== e.target.value));
    }
  };

  //check if the user already logged-in
  const readCookie = async () => {
    const userData = JSON.parse(window.localStorage.getItem("user"));
    setUser(userData)
    if (!userData) {
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <h2 className='text-center m-2'>Covid Symptoms</h2>
      <Form className="w-50 m-auto p-4 rounded bg-dark text-light" >
        <p>Please check any symptoms that you are currently experiencing:</p>
        <Form.Group>
          <Form.Check
            type="checkbox"
            value="fever"
            label="Fever"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            value="cough"
            label="Cough"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            value="shortness_of_breath"
            label="Shortness of breath"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            value="fatigue"
            label="Fatigue"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            value="body_aches"
            label="Body aches"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            value="loss_of_taste_or_smell"
            label="Loss of taste or smell"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            value="sore_throat"
            label="Sore throat"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            value="diarrhea"
            label="Diarrhea"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            value="headache"
            label="Headache"
            onChange={handleChange}
          />
        </Form.Group>

        <p>You have selected the following symptoms:</p>
        <ListGroup>
          {symptoms.map((symptom, index) => (
            <ListGroup.Item key={index}>{symptom}</ListGroup.Item>
          ))}
        </ListGroup>

        <Button variant="success" className='w-100 mt-4' onClick={submitForm}>
          Submit Symptoms
        </Button>
      </Form>
    </>
  );
};

export default Covid19