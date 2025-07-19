import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Header from '../components/Header';
import { usePrescription } from '../context/PrescriptionContext';


const PrescriptionPreview = () => {
  const { prescription } = usePrescription();
  const prescriptionRef = useRef();
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const doctor = sessionStorage.getItem('Doctor');
    setDoctorName(doctor || 'Dr. Smith');
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => prescriptionRef.current,
    pageStyle: `
      @page { 
        size: A5; 
        margin: 10mm;
      }
      @media print {
        body * { 
          visibility: hidden; 
        }
        #prescription-slip, #prescription-slip * { 
          visibility: visible; 
        }
        #prescription-slip { 
          position: absolute; 
          left: 0; 
          top: 0;
          width: 100%;
        }
        .prescription-header {
          border-bottom: 3px solid #000 !important;
        }
        .medicine-row {
          border-bottom: 2px solid #e0e0e0;
        }
      }
    `
  });

  const handleDownloadPDF = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a5'
    });
    
    const element = prescriptionRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: true,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = doc.internal.pageSize.getWidth() - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    doc.save(`prescription_${prescription.formData.patientName}.pdf`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (!prescription) return <div className="text-center py-5">Loading prescription...</div>;

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <Container className="my-4 px-3 px-md-4">
        <div className="d-flex flex-wrap justify-content-between mb-4 gap-2">
          <Button 
            variant="secondary" 
            onClick={handleBackToDashboard}
            size={isMobile ? "sm" : undefined}
          >
            Back to Dashboard
          </Button>
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              onClick={handlePrint} 
              size={isMobile ? "sm" : undefined}
            >
              {isMobile ? 'Print' : 'Print Prescription'}
            </Button>
            <Button 
              variant="primary" 
              onClick={handleDownloadPDF}
              size={isMobile ? "sm" : undefined}
            >
              {isMobile ? 'PDF' : 'Download PDF'}
            </Button>
          </div>
        </div>

        <div ref={prescriptionRef} className="p-3 p-md-4 border rounded bg-white">
          <div id="prescription-slip" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Header with thick border */}
            <div className="text-center mb-2 prescription-header pb-3">
              <h4 className="mb-1" style={{ fontWeight: 'bold', color: '#333', fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
                PRESCRIPTION SLIP
              </h4>
              <div style={{ 
                height: '3px', 
                background: '#000', 
                margin: '0 auto', 
                width: '100%' 
              }}></div>
            </div>
            
            {/* Doctor and Patient Info */}
            <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between'} mb-2 gap-2`}>
              <div>
                <p className="mb-1"><strong>Consulting Doctor:</strong> {doctorName}</p>
                <p className="mb-1"><strong>Patient Name:</strong> {prescription.formData.patientName}</p>
                <p className="mb-1"><strong>Age/Sex:</strong> {prescription.formData.age}/{prescription.formData.gender}</p>
              </div>
              <div className={isMobile ? '' : 'text-end'}>
                <p className="mb-1"><strong>Date:</strong> {new Date(prescription.formData.date).toLocaleDateString()}</p>
                <p className="mb-1"><strong>Prescription ID:</strong> {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>
            </div>

            {/* Horizontal divider */}
            <div style={{ 
              height: '1px', 
              background: '#000', 
              margin: '15px 0',
              opacity: 0.3 
            }}></div>

            {/* Diagnosis Section */}
            {prescription.formData.diagnosis && (
              <div className="mb-4">
                <h6 className="mb-2" style={{ fontWeight: '700', fontSize: isMobile ? '1rem' : '1.1rem' }}>
                  Final Diagnosis
                </h6>
                <div className="p-2 border rounded" style={{ background: '#f8f9fa' }}>
                  {prescription.formData.diagnosis}
                </div>
              </div>
            )}

            {/* Medicines Section */}
            {prescription.medicines.some(med => med.drugName) && (
              <div className="mb-4">
                <h5 className="mb-2" style={{ fontWeight: '700', fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
                  Prescription Details
                </h5>
                <div className="table-responsive">
                  <table className="table mb-4" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #000' }}>
                        <th style={{ width: '5%', fontWeight: '600', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>SL</th>
                        <th style={{ fontWeight: '600', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Medicine</th>
                        <th style={{ fontWeight: '600', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Dosage</th>
                        <th style={{ fontWeight: '600', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Frequency</th>
                        <th style={{ fontWeight: '600', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Duration</th>
                        <th style={{ fontWeight: '600', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Instructions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescription.medicines.map((med, index) => (
                        med.drugName && (
                          <React.Fragment key={index}>
                            <tr className="medicine-row">
                              <td style={{ fontWeight: '500', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{index + 1}.</td>
                              <td style={{ fontWeight: '700', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{med.drugName}</td>
                              <td style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{med.dosage}</td>
                              <td style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{med.frequency}</td>
                              <td style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{med.duration}</td>
                              <td style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{med.remark}</td>
                            </tr>
                            {index < prescription.medicines.length - 1 && (
                              <tr>
                                <td colSpan="6" style={{ padding: 0 }}>
                                  <div style={{ 
                                    height: '1px', 
                                    background: '#e0e0e0', 
                                    margin: '5px 0'
                                  }}></div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="pt-2 text-center" style={{ 
              borderTop: '1px dashed #ccc',
              fontSize: isMobile ? '0.7rem' : '0.8rem',
              color: '#666',
              marginTop: isMobile ? '60px' : '100px'
            }}>
              <p className="mb-0">This is a computer-generated prescription. No physical signature required.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrescriptionPreview;
