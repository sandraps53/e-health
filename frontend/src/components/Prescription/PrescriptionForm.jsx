import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import PatientInfo from "./PatientInfo";
import MedicalInfo from "./MedicalInfo";
import MedicineForm from "./MedicineForm";
import AdviceSection from "./AdviceSection";
import { useNavigate } from 'react-router-dom';
import { usePrescription } from "../../context/PrescriptionContext";
import FormActions from "./FormActions";

const PrescriptionForm = () => {
  const { prescription, updatePrescription, resetPrescription } = usePrescription();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updatePrescription({
      formData: {
        ...prescription.formData,
        [name]: value
      }
    });
  };

  const handleDateChange = (date) => {
    updatePrescription({
      formData: {
        ...prescription.formData,
        date
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save current state to sessionStorage for preview
    sessionStorage.setItem('currentPrescription', JSON.stringify(prescription));
    navigate('/prescription/preview');
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4 text-primary">Prescription Form</h4>
        <Form onSubmit={handleSubmit}>
          <PatientInfo 
            formData={prescription.formData} 
            onInputChange={handleInputChange}
            onDateChange={handleDateChange}
          />

          <MedicalInfo 
            formData={prescription.formData} 
            onInputChange={handleInputChange}
          />

          <MedicineForm
            medicines={prescription.medicines}
            onMedicinesChange={(newMedicines) => 
              updatePrescription({ medicines: newMedicines })
            }
          />

          <AdviceSection
            formData={prescription.formData}
            onInputChange={handleInputChange}
          />

          <FormActions
            onPreview={handleSubmit}
            onReset={resetPrescription}           
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PrescriptionForm;