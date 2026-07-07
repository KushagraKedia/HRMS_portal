import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function HandleSubmit(event) {
    event.preventDefault();
    console.log("Email: ", email);
    alert("Reset link sent!");
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f0efe7] text-black">

      <div className="hidden md:flex md:w-[42%] h-screen">
          <img src={logo} alt="HRMS Logo" className="w-full h-full object-contain" />
      </div>

      <div className="w-full md:w-[58%] flex flex-col justify-center items-center px-6 md:px-10 min-h-screen">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">Forgot Password?</h1>
          <h2 className="text-base md:text-[20px] text-gray-500 mb-6 text-center">
            If you forgot your password, well, then we'll email you instructions to reset your password.
          </h2>
          
          <form onSubmit={HandleSubmit} className="w-full max-w-sm md:max-w-full">

              <p className="text-sm text-black mt-4 mb-2">Email Address: </p>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"
                required
              />

              {/* Fixed text from 'Sign Up' to 'Send Reset Link' */}
              <button type="submit" className="w-full p-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 mt-5">
                Send Reset Link
              </button>

              <p className="text-sm mt-4 flex gap-1">
                Return to{" "}
                <Link to="/" className="text-green-600 font-semibold">Sign In</Link>
              </p>
          </form>
          
          {/* Replaced invalid <bottom> tag with standard <div> */}
          <div className="text-sm text-gray-500 mt-8 md:mt-6">
             <p>Copyright © 2026 - Kushagra</p>
          </div>
      </div>
    </div>
  );
}

export default ForgotPassword;