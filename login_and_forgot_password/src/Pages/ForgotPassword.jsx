import {Link } from "react-router-dom";
import {useState} from "react";
import "./ForgotPassword.css"

import logo from "../assets/logo.png"

function ForgotPassword() {
  const [email,setEmail] = useState("");
  function HandleSubmit(event){
    event.preventDefault();
    console.log("Email: ",email);
    alert("Reset link sent!");
  }
  return (
    <div className="page">

      <div className="imagePart">
          <img src={logo} alt="HRMS Logo" className="logo" />
      </div>

      <div className="content">
          <h1>Forgot Password?</h1>
          <h2>If you forgot your password, well, then we'll email you instructions to reset your password.</h2>
          <form onSubmit={HandleSubmit}>

              <p>Email Address: </p>
              <input type="text"
              value={email} onChange={(e)=>setEmail(e.target.value)} /><br />


              <button type="Submit">Submit</button><br />

              <p className="links">Return to{" "}
             <Link to="/">Sign In</Link></p>
          </form>
          <bottom>
             <p>Copyright © 2026 - Kushagra</p>
          </bottom>
      </div>
    </div>
  );
}

export default ForgotPassword;