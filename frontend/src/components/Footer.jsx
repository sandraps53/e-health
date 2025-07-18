import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white py-4 mt-5" style={{backgroundColor:"#708090"}}>
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h4 className="d-flex align-items-center">
              <i className="fas fa-heart-pulse fa-beat me-2 fs-4" style={{ color: "#02367b" }}></i>
              eHealth
            </h4>
            <p className="text-white mt-3" style={{ opacity: 0.8 }}>
              Revolutionizing healthcare through innovative digital solutions for a healthier Kerala.
            </p>
            <div className="social-icons mt-4">
              <a href="#" className="text-white me-3" style={{ fontSize: "1.2rem" }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white me-3" style={{ fontSize: "1.2rem" }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white me-3" style={{ fontSize: "1.2rem" }}>
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white" style={{ fontSize: "1.2rem" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <Row>
              <Col className='mt-2'>
               <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-white hover-primary">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-white hover-primary">About</Link>
              </li>

            </ul>
              </Col>
         
          
              <Col  className='mt-2'>
               <ul className='list-unstyled'>
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none text-white hover-primary">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-decoration-none text-white hover-primary">Register</Link>
              </li>
               </ul>
              </Col>
               </Row>
          </Col>

          <Col md={4}>
            <h5>Contact</h5>
            <ul className="list-unstyled text-white">
              <li className="mb-2">
                <i className="fas fa-envelope me-2 text-white" ></i> support@ehealth.com
              </li>
              <li className="mb-2">
                <i className="fas fa-phone me-2 text-white " ></i> +91 123 456 7890
              </li>
              <li>
                <i className="fas fa-map-marker-alt me-2  text-white" ></i> Thiruvananthapuram, Kerala
              </li>
            </ul>
          </Col>
        </Row>

 

        <Row className="mt-5 pt-3">
          <Col className="text-center">
            <div className="py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <small className="text-white" style={{ opacity: 0.7 }}>
                &copy; {new Date().getFullYear()} eHealth. All Rights Reserved. | 
                <Link to="/privacy" className="text-decoration-none text-white ms-2 hover-primary">Privacy Policy</Link> | 
                <Link to="/terms" className="text-decoration-none text-white ms-2 hover-primary">Terms of Service</Link>
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;