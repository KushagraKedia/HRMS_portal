import {Link} from "react-router-dom";
import {useState} from "react";
import "./SignUp.css"

import logo from "../assets/logo.png"

function SignUp(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newpassword,setNewpassword] = useState("");

    function HandleSubmit(event){
        event.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(newpassword);
        alert("Signed Up successfully!");
    }

    return(
      <div className="page">
      <div className="imagePart">
          <img src={logo} alt="HRMS Logo" className="logo" />
      </div>  
      <div className="content">     
       <h1>Sign Up</h1><br />
       <h2>Please enter your details to sign up</h2>
       <form onSubmit={HandleSubmit}>

        <p>Name: </p>
        <input type="text"
        value={name} onChange={(e)=>setName(e.target.value)} />

        <p>Email Addres: </p>
        <input type="email" 
        value={email} onChange={(e)=>setEmail(e.target.value)} />

        <p>Password: </p>
        <input type="password"  
        value={password} onChange={(e)=>setPassword(e.target.value)} />

        <p>Confirm Password: </p>
        <input type="password" value={newpassword}
        onChange={(e)=>setNewpassword(e.target.value)} />

        {/* <p className="checkbox_container"><input type="checkbox"/> Agree to Terms & Privacy</p> */}
        <br />
        <button type="Submit">
          Sign Up
        </button>
        <br />
        <p className="links">Already have an account? <Link to="/">Sign In</Link></p>
      </form>
      <bottom>
        <p>Copyright © 2026 - Kushagra</p>
      </bottom>
      </div> 
    </div>
    );
}

export default SignUp;