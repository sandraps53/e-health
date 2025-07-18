import React, { useState, useRef } from 'react';
import { Row, Col, Form, Button, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';

const MedicineForm = ({ medicines, onMedicinesChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(0);
  const searchRef = useRef(null);

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    onMedicinesChange(updated);

    if (field === 'drugName') {
      setCurrentEditingIndex(index);
      if (value.length > 2) {
        fetchMedicineSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }
  };

  const fetchMedicineSuggestions = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${query}&maxList=5`
      );
      if (response.data && response.data[3]) {
        setSuggestions(response.data[3]);
      }
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching medicine suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (index, suggestion) => {
    const updated = [...medicines];
    updated[currentEditingIndex].drugName = suggestion;
    onMedicinesChange(updated);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(index, suggestions[activeSuggestionIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const addMedicine = () => {
    onMedicinesChange([
      ...medicines,
      { drugName: '', dosage: '', quantity: '', frequency: '', remark: '', duration: '' }
    ]);
    setShowSuggestions(false);
  };

  const removeMedicine = (index) => {
    if (medicines.length > 1) {
      const updated = medicines.filter((_, i) => i !== index);
      onMedicinesChange(updated);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4 p-3 border rounded">
      <h5 className="mb-3">Medicines</h5>
      {medicines.map((med, index) => (
        <div key={index} className="mb-4 p-3 border rounded position-relative medicine-row">
          {medicines.length > 1 && (
            <Button
              variant="danger"
              size="sm"
              className="position-absolute top-0 end-0 m-2"
              onClick={() => removeMedicine(index)}
              style={{ borderRadius: '50%' }}
            >
              ×
            </Button>
          )}
          <Row className="mb-3">
            <Col md={4} className="mb-3" ref={searchRef}>
              <Form.Group controlId={`drugName-${index}`}>
                <Form.Label>Drug Name</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Start typing for suggestions..."
                    value={med.drugName}
                    onChange={(e) => handleMedicineChange(index, 'drugName', e.target.value)}
                    onFocus={() => {
                      setCurrentEditingIndex(index);
                      if (med.drugName.length > 2) setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    required
                  />
                  {isLoading && currentEditingIndex === index && (
                    <div className="position-absolute end-0 top-0 h-100 d-flex align-items-center pe-2">
                      <Spinner animation="border" size="sm" />
                    </div>
                  )}
                  {showSuggestions && suggestions.length > 0 && currentEditingIndex === index && (
                    <Dropdown.Menu show className="w-100">
                      {suggestions.map((suggestion, i) => (
                        <Dropdown.Item
                          key={i}
                          active={i === activeSuggestionIndex}
                          onClick={() => handleSuggestionClick(index, suggestion)}
                        >
                          {suggestion}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  )}
                </div>
              </Form.Group>
            </Col>
            <Col md={2} className="mb-3">
              <Form.Group controlId={`dosage-${index}`}>
                <Form.Label>Dosage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., 500mg"
                  value={med.dosage}
                  onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2} className="mb-3">
              <Form.Group controlId={`quantity-${index}`}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g., 10"
                  value={med.quantity}
                  onChange={(e) => handleMedicineChange(index, 'quantity', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2} className="mb-3">
              <Form.Group controlId={`frequency-${index}`}>
                <Form.Label>Frequency</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., 1-0-1"
                  value={med.frequency}
                  onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2} className="mb-3">
              <Form.Group controlId={`duration-${index}`}>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., 5 days"
                  value={med.duration}
                  onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId={`remark-${index}`}>
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., After food, with milk, etc."
                  value={med.remark}
                  onChange={(e) => handleMedicineChange(index, 'remark', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      ))}
      <Button
        variant="outline-primary"
        type="button"
        onClick={addMedicine}
        className="mb-3"
      >
        <i className="bi bi-plus-circle me-2"></i>Add Another Medicine
      </Button>
    </div>
  );
};

export default MedicineForm;