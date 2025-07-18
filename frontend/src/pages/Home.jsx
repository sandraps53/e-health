import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import bgImage from "../assets/doctor-writing-about-routine-medical-checkup.jpg";


import { Link } from "react-router-dom";
import Feature from "../components/Feature";
import Footer from "../components/Footer";

const Home = () => {
  const features = [
    {
      icon: "fa-user-shield",
      title: "Secure Doctor Login",
      description:
        "Doctors can register and log in securely using JWT-based authentication, ensuring patient data remains protected.",
    },
    {
      icon: "fa-pills",
      title: "Real-Time Medicine Suggestions",
      description:
        "Real-time medicine suggestions from verified databases prevent errors and accelerate prescription creation by 40%.",
    },
    {
      icon: "fa-file-prescription",
      title: "Printable Prescriptions",
      description:
        "Easily generate clean, professional-looking prescriptions that can be previewed, printed, or downloaded as PDF ",
    },
  ];
  return (
    <div className="home-page">
      
      <section
        className="hero-section position-relative d-flex align-items-center"
        style={{
          minHeight: "90vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
      
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(3px) brightness(0.9)",
            zIndex: -1,
          }}
        />

        {/* Content Overlay */}
        <Container className="position-relative z-index-1 py-5">
          <Row className="align-items-center">
            {/* <Col lg={6}></Col> */}
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="hero-content  px-3 px-md-0">
                <h1 className="display-4 text-white fw-bold mb-2">
                  <i
                    className="fas fa-heart-pulse fa-beat me-3"
                    style={{ color: "#02367b" }}
                  ></i>
                  eHealth
                </h1>
                <h2 className="h3 mb-2 animate-text" style={{ color: "#fff" }}>
                  Your Digital Healthcare Companion
                </h2>
                <p className="lead mb-4 text-white">
                  Secure medical services at your fingertips
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link
                    to="/login"
                    className="btn-get-started  btn-md px-4 py-2 rounded-pill fw-bold"
                    style={{backgroundColor:"#02367b",color:"white"}}
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/about"
                    className="btn btn-outline-light btn-md px-4 py-2 rounded-pill fw-bold"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={8} className="text-center">
              <h2 className="fw-bold mb-3">Why Choose eHealth?</h2>
              <p className="text-muted lead">
                Transforming healthcare with secure, intelligent, and
                professional digital solutions
              </p>
            </Col>
          </Row>

          <Row className="mt-5">
            {features.map((feature, index) => (
              <Feature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </Row>

          {/* Additional Value Proposition */}
          <Row className="mt-5">
            <Col className="text-center">
              <div
                className="p-4 rounded-3"
                style={{ backgroundColor: "rgba(2, 54, 123, 0.1)" }}
              >
                <h4 className="fw-bold mb-3">
                  <i
                    className="fas fa-clock me-2"
                    style={{ color: "#29348e" }}
                  ></i>
                  Save 15+ Hours Monthly
                </h4>
                <p className="mb-0">
                  Our doctors report saving 2+ hours daily by eliminating manual
                  prescription writing, drug interaction checks, and patient
                  record searches.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
