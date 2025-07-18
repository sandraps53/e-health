import React from 'react';
import { Form } from 'react-bootstrap';

const AdviceSection = ({ formData, onInputChange }) => {
  return (
    <div className="mb-4 p-3 border rounded bg-light">
      <h5 className="mb-3">Advice</h5>
      <Form.Group controlId="advice">
        <Form.Control
          as="textarea"
          rows={3}
          name="advice"
          value={formData.advice}
          onChange={onInputChange}
          placeholder="Enter advice for the patient..."
        />
      </Form.Group>
    </div>
  );
};

export default AdviceSection;