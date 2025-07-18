import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';
import PrescriptionForm from '../components/Prescription/PrescriptionForm';



const Dashboard = () => {
    const[username,setUsername] = useState("")

  useEffect(()=>{
   if(sessionStorage.getItem('Doctor')){
    setUsername(sessionStorage.getItem('Doctor'))
   }else{
     setUsername("")
   }
  },[])

  console.log(username,"----")
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <Container fluid className="flex-grow-1 py-3">
        <Row className="mb-3 ps-3">
          <Col>
            <h3>Welcome  <span className="text-danger"><i className="fas fa-user-md ms-2" style={{ color: "#02367b", fontSize: "2rem" }}></i> Dr.{username.toUpperCase()}</span></h3>
          </Col>
        </Row>
        
        <Row>
          <Col lg={8} sm={12} md={8}>
            <Tabs defaultActiveKey="prescription" id="dashboard-tabs" className="mb-3">
              <Tab eventKey="prescription" title="New Prescription">
                <div className="mt-3">
                     <PrescriptionForm/>
              
                </div>
              </Tab>
              <Tab eventKey="history" title="Prescription History">
                <div className="mt-3 p-3 border rounded">
                  <h4>Your Previous Prescriptions</h4>
                  <p className="text-muted">Prescription history will appear here</p>
                </div>
              </Tab>
              <Tab eventKey="settings" title="Account Settings">
                <div className="mt-3 p-3 border rounded">
                  <h4>Account Settings</h4>
                  <p className="text-muted">User settings will appear here</p>
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;