import {Link } from "react-router-dom";
import {useState} from "react";

import logo from "../assets/logo.png"

function ForgotPassword() {
  const [email,setEmail] = useState("");
  function HandleSubmit(event){
    event.preventDefault();
    console.log("Email: ",email);
    alert("Reset link sent!");
  }
  return (
    <div className="min-h-screen w-full flex flex-row bg-[#f0efe7] text-black">

      <div className="w-[42%] h-screen">
          <img src={logo} alt="HRMS Logo" className="logo" />
      </div>

      <div className="w-[58%] flex flex-col justify-center items-center px-10">
          <h1 className="text-3xl font-bold text-black mb-2">Forgot Password?</h1>
          <h2 className="text-[20px] text-gray-500 mb-6">If you forgot your password, well, then we'll email you instructions to reset your password.</h2>
          <form onSubmit={HandleSubmit} className="w-full max-w-full">

              <p className="text-sm text-black mt-4 mb-2">Email Address: </p>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className=" w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"/><br />


              <button type="Submit" classsName="p-3 rounded-xl
          bg-orange-500 text-white font-semibold hover:bg-orange-600 mt-3">Submit</button><br />

              <p className="text-sm mt-2 flex gap-1">Return to{" "}
             <Link to="/" className="text-green-600">Sign In</Link></p>
          </form>
          <bottom>
             <p>Copyright © 2026 - Kushagra</p>
          </bottom>
      </div>
    </div>
  );
}

export default ForgotPassword;