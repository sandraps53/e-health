# Doctor Prescription Web Application

A secure digital platform for doctors to manage patient prescriptions with real-time medicine suggestions.


## Features
- Secure doctor authentication (JWT)
- Real-time medicine suggestions
- Printable prescription generation
- Patient record management

## Technologies
- **Frontend**: React, React Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm/yarn
- MongoDB Atlas account or local MongoDB

### 1. Clone the Repository
```bash
git clone https://github.com/sandraps53/e-health.git
cd e-health

Backend Setup
npm install bcrypt cors dotenv express jsonwebtoken mongoose

.env
connection_string=mongodb+srv://Sandra:mern@cluster0.ipwjf9n.mongodb.net/DoctorPrescriptionWebsite?retryWrites=true&w=majority&appName=Cluster0
PORT=4000
jwt_secret=supersecret123

Start the backend:
nodemon index.js

Frontend Setup
npm install axios bootstrap html2canvas jspdf react-bootstrap react-datepicker react-router-dom react-to-print react-toastify

Start the frontend
npm run dev

Running the Application

Access the frontend at: http://localhost:5173
Access the backend API at: http://localhost:4000

