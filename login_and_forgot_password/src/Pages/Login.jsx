import {Link } from "react-router-dom";
import {useState} from "react";
import logo from "../assets/logo.png"
import "./Login.css"

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault(); 
        console.log("Email: ",email);
        console.log("Password: ",password);
    }

    return(
        <div className="page">
            <div className="imagePart">
                   <img src={logo} alt="HRMS Logo" className="logo" />
            </div>
            <div className="Content">
                 <h1>Welcome to the Login page</h1>
                    <h2>Please enter your details to Sign In</h2>
                    <form onSubmit={handleSubmit}>

                        <p>Email</p>
                        <input type="email" 
                        value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <p>Password</p>

                        <input type="password" 
                        value={password} onChange={(e)=> setPassword(e.target.value)} />

                        <br />
                        <button type="submit">Submit</button>
                        <br />
                    
                    <Link to="/ForgotPassword">Forgot Password?</Link><br/>
                    <p className="links">Don't have an account? <Link to="/SignUp">Sign up</Link></p>                    
                    </form>
                <bottom>
                   <p>Copyright © 2026 - Kushagra</p>
                </bottom>
            </div>
      </div>
    );
}

export default Login;