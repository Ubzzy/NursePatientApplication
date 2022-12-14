import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Header from "../Header";

const Covid19 = () => {
  const [symptoms, setSymptoms] = useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setSymptoms([...symptoms, e.target.value]);
    } else {
      setSymptoms(symptoms.filter((symptom) => symptom !== e.target.value));
    }
  };

  return (
    <>
      <Header />
      <h2 className='text-center m-2'>Covid Symptoms</h2>
      <Form className="w-50 m-auto p-4 rounded bg-dark text-light">
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
      </Form>
    </>
  );
};

export default Covid19