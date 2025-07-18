
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import registerImg from "../assets/logo1.webp";
import { loginAPI, registerAPI } from "../services/allAPI";
import { ToastContainer, toast } from 'react-toastify';
const Auth = ({ register }) => {
  const navigate = useNavigate();
  const isRegisterForm = register ? true : false;
    const [userData,setUserData] = useState({
    name:"",email:"",password:""
  }) 

  //  console.log(userData);
   const handleRegister =async(e)=>{
      e.preventDefault()
      const {name,email,password} = userData;

      if(!name|| !email|| !password){
        toast.warning("Please fill the missing fields")
      }else{
        try {
          const result = await registerAPI(userData)
          console.log(result,"result..");
          if(result.status === 200){
              toast.success(`Dr.${result.data.name} has successfully registered`) 
              navigate('/login')
              setUserData({name:"",email:"",password:""})
          }else{
            toast.warning(result.response.data);
          }
        } catch (error) {
           console.log(error)
        }
      }
   }

   const handleLogin = async(e)=>{
     e.preventDefault()
      const {email,password} = userData;
      if(!email || !password){
        toast.warning("Please fill missing fields")
      }else{
        try {
          
          const result = await loginAPI(userData)
          console.log(result);

          if(result.status == 200){
            sessionStorage.setItem("Doctor",result.data.existingDoctor.name)
            sessionStorage.setItem("token",result.data.token)
            toast.success(`Dr.${result.data.existingDoctor.name} login successfully`);
            setTimeout(()=>{
                navigate('/dashboard')
            },2000)
            setUserData({email:"",password:""})
          }else{
          toast.warning(result.response.data)
        }
        }catch(error) {
          console.log(error)
        }
      }
   }


  return (
    <div className="auth-wrapper" style={{ marginTop: "100px" }}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="container-fluid px-3 px-md-5 px-lg-3" style={{ maxWidth: "1200px" }}>
          <Link 
            to={"/"} 
            className="back-link d-inline-block mb-3 mb-md-4" 
            style={{ textDecoration: "none", color: "blue" }}
          >
            <i className="fa-solid fa-arrow-left me-1"></i> Back to Home
          </Link>
          
          <div className="card shadow p-3 p-md-4 p-lg-5">
            <div className="row align-items-center">
              {/* Image Column - Hidden on mobile */}
              <div className="col-md-6  d-md-block">
                <img 
                  src={registerImg} 
                  className="img-fluid rounded-start" 
                  alt="Medical illustration" 
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
              
              {/* Form Column */}
              <div className="col-md-6 bg-light p-3 p-md-4">
                <div className="d-flex align-items-center flex-column">
                  <h4 
                    className="fw-bolder pt-2 text-center" 
                    style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#29348e" }}
                  >
                    <i
                      className="fa-solid fa-heart-pulse fa-beat me-3" 
                      style={{ color: "#29348e", fontSize: "clamp(24px, 3vw, 32px)" }}
                    ></i>
                    eHealth
                  </h4>
                  
                  <h6 className="text-dark fw-bolder mb-3 mb-md-4 text-center">
                    {isRegisterForm ? "Sign-up to your Account" : "Sign-in to your Account"}
                  </h6>
                  
                  <Form className="register-form w-75">
                    {isRegisterForm && (
                        <>
                                              <Form.Group className="mb-3 position-relative">
                        <i className="fas fa-user form-icon"></i>
                        <Form.Control
                          id="username"
                          type="text"
                          placeholder="Username"
                          size="md"
                          className="form-input"
                          onChange={(e)=>setUserData({...userData,name:e.target.value})}
                          value={userData.name}
                        />
                      </Form.Group>
                                            
                        </>
                    )}

                    <Form.Group className="mb-3 position-relative">
                      <i className="fas fa-envelope form-icon"></i>
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="form-input"
                        size="md"
                        required
                        onChange={(e)=>setUserData({...userData,email:e.target.value})}
                        value={userData.email}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 position-relative">
                      <i className="fas fa-lock form-icon"></i>
                      <Form.Control
                        type="password"
                        id="pswd"
                        placeholder="Password"
                        className="form-input"
                        size="md"
                        required
                        onChange={(e)=>setUserData({...userData,password:e.target.value})}
                        value={userData.password}
                      />
                    </Form.Group>



                    {isRegisterForm ? (
                       <div className="mt-3 w-100 text-center">
                         <button className="btn w-50" onClick={handleRegister} style={{backgroundColor:"#1b1756",color:"white"}}>Register</button>
                        <p className="mt-2">
                           Already have an account? click here to{" "}
                           <Link
                             to={"/login"}
                            style={{ textDecoration: "none" }}
                           >
                             login
                           </Link>{" "}
                         </p>
                       </div>
                     ) : (
                       <div className="mt-3 w-100 text-center">
                         <button className="btn  w-50" style={{backgroundColor:"#1b1756",color:"white"}} onClick={handleLogin}>Login</button>
                         <p className="mt-2">
                           New user click here to{" "}
                           <Link
                             to={"/register"}
                             style={{ textDecoration: "none" }}
                           >
                             register
                           </Link>{" "}
                         </p>
                       </div>
                     )}

                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <ToastContainer position="top-center"  autoClose={2000} />
    </div>
  );
};

export default Auth;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import registerImg from "../assets/67Z_2201.w012.n001.28C.p6.28.jpg";

// const Auth = ({ register }) => {
//   const isRegisterForm = register ? true : false;

//   const [userData,setUserData] = useState({
//     name:"",email:"",password:""
//   })

//   return (
//     <div style={{ marginTop: "100px" }}>
//       <div className="d-flex justify-content-center align-items-center">
//         <div className="w-75 container">
//           <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
//             {" "}
//             <i className="fa-solid fa-arrow-left me-1"></i> Back to Home
//           </Link>
//           <div className="card shadow p-5">
//             <div className="row align-items-center">
//               <div className="col-lg-6">
//                 <img src={registerImg} width={"100%"} alt="" />
//               </div>
//               <div className="col-lg-6 bg-light p-2">
//                 <div className="d-flex align-items-center flex-column">
//                   <h4
//                     style={{ fontSize: "40px" , color: "#02367b"}}
//                     className="fw-bolder pt-2"
//                   >
//                     <i
//                       class="fa-solid fa-heart-pulse fa-beat me-3 fs-2"
//                       style={{ color: "#02367b" }}
//                     ></i>
//                     eHealth
//                   </h4>
//                   <h6 className="text-dark fw-bolder mb-4">
//                     {isRegisterForm
//                       ? "Sign-up to your Account"
//                       : "Sign-in to your Account"}
//                   </h6>
//                   <Form className="register-form">
//                     {isRegisterForm && (
//                       <Form.Group className="mb-3 position-relative">
//                         <i className="fas fa-user form-icon"></i>
//                         <Form.Control
//                           id="username"
//                           type="text"
//                           placeholder="Username"
//                           size="sm"
//                           className="form-input"
//                           onChange={(e)=>setUserData({...userData,name:e.target.value})}
//                         />
//                       </Form.Group>
//                     )}

//                     <Form.Group className="mb-3 position-relative">
//                       <i className="fas fa-envelope form-icon"></i>
//                       <Form.Control
//                         type="email"
//                         id="email"
//                         placeholder="Email"
//                         className="form-input"
//                         size="sm"
//                         required
//                         onChange={(e)=>setUserData({...userData,email:e.target.value})}
//                       />
//                     </Form.Group>

//                     <Form.Group className="mb-3 position-relative">
//                       <i className="fas fa-lock form-icon"></i>
//                       <Form.Control
//                         type="password"
//                         id="pswd"
//                         placeholder="Password"
//                         className="form-input"
//                         size="sm"
//                         required 
//                         onChange={(e)=>setUserData({...userData,password:e.target.value})}
//                       />
//                     </Form.Group>

//                     {isRegisterForm ? (
//                       <div className="mt-3">
//                         <button className="btn btn-primary">Register</button>
//                         <p className="mt-2">
//                           Already have an account? click here to{" "}
//                           <Link
//                             to={"/login"}
//                             style={{ textDecoration: "none" }}
//                           >
//                             login
//                           </Link>{" "}
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="mt-3">
//                         <button className="btn btn-primary">Login</button>
//                         <p className="mt-2">
//                           New user click here to{" "}
//                           <Link
//                             to={"/register"}
//                             style={{ textDecoration: "none" }}
//                           >
//                             register
//                           </Link>{" "}
//                         </p>
//                       </div>
//                     )}
//                   </Form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;