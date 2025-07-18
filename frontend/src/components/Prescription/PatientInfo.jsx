import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientInfo = ({ formData, onInputChange, onDateChange }) => {
  return (
    <div className="mb-4 p-3 border rounded bg-light">
      <h5 className="mb-3">Patient Information</h5>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group controlId="patientName">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={onInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={2} className="mb-3">
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={onInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={2} className="mb-3">
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={onInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2} className="mb-3">
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={formData.date}
              onChange={onDateChange}
              className="form-control"
              required
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default PatientInfo;