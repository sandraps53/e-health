import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const MedicalInfo = ({ formData, onInputChange }) => {
  return (
    <div className="mb-4 p-3 border rounded bg-light">
      <h5 className="mb-3">Medical Information</h5>
      <Row>
        <Col md={6} className="mb-3">
          <Form.Group controlId="symptoms">
            <Form.Label>Symptoms</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="symptoms"
              value={formData.symptoms}
              onChange={onInputChange}
              placeholder="Enter symptoms..."
            />
          </Form.Group>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Group controlId="diagnosis">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="diagnosis"
              value={formData.diagnosis}
              onChange={onInputChange}
              placeholder="Enter diagnosis..."
              required
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default MedicalInfo;