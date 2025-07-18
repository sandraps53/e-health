import React from 'react';
import { Button } from 'react-bootstrap';

const FormActions = ({ onPreview, onReset }) => {
  return (
    <div className="d-flex justify-content-between mt-4">
      <Button variant="secondary" onClick={onReset}>
        Reset Form
      </Button>
      <Button 
        variant="primary" 
        onClick={onPreview}
        
      >
       Preview Prescription
      </Button>
    </div>
  );
};

export default FormActions;