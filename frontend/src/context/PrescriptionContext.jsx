// src/context/PrescriptionContext.js
import { createContext, useContext, useState } from 'react';

const PrescriptionContext = createContext();

export const PrescriptionProvider = ({ children }) => {
  const [prescription, setPrescription] = useState(() => {
    // Try to load from sessionStorage if available
    const saved = sessionStorage.getItem('prescriptionData');
    return saved ? JSON.parse(saved) : {
      formData: {
        patientName: '',
        age: '',
        gender: '',
        date: new Date(),
        symptoms: '',
        diagnosis: '',
        advice: ''
      },
      medicines: [
        { drugName: '', dosage: '', quantity: '', frequency: '', remark: '', duration: '' }
      ]
    };
  });

  // Save to sessionStorage whenever prescription changes
  const updatePrescription = (newData) => {
    const updated = { ...prescription, ...newData };
    setPrescription(updated);
    sessionStorage.setItem('prescriptionData', JSON.stringify(updated));
  };

  const resetPrescription = () => {
    const newPrescription = {
      formData: {
        patientName: '',
        age: '',
        gender: '',
        date: new Date(),
        symptoms: '',
        diagnosis: '',
        advice: ''
      },
      medicines: [
        { drugName: '', dosage: '', quantity: '', frequency: '', remark: '', duration: '' }
      ]
    };
    setPrescription(newPrescription);
    sessionStorage.setItem('prescriptionData', JSON.stringify(newPrescription));
  };

  return (
    <PrescriptionContext.Provider value={{ 
      prescription, 
      updatePrescription,
      resetPrescription
    }}>
      {children}
    </PrescriptionContext.Provider>
  );
};

export const usePrescription = () => useContext(PrescriptionContext);