import React from 'react';
import { Col } from 'react-bootstrap';


const Feature = ({ icon, title, description, color = "#29348e" }) => {
  return (
    <Col md={4} className="mb-4 feature-col">
      <div className="feature-card p-4 bg-white rounded-3 shadow-sm h-100 text-center">
        <div className="feature-icon mb-3">
          <i className={`fas ${icon} fa-3x`} style={{ color }}></i>
        </div>
        <h5 className="fw-bold mb-3">{title}</h5>
        <p className="text-muted mb-0">{description}</p>
        <div className="feature-hover-indicator"></div>
      </div>
    </Col>
  );
};



export default Feature;