import { Link } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("./dashboard");
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Email: ", email);
    console.log("Password: ", password);
  }

  return (
    <div className="min-h-screen w-full flex flex-row bg-[#f0efe7] text-black">

      <div className="w-[42%] h-screen">
        <img src={logo} alt="HRMS Logo" className="w-full h-full object-contain"/>
      </div>


      <div className="w-[58%] flex flex-col justify-center items-center px-10">

        <h1 className="text-3xl font-bold text-black mb-2">
          Welcome to the Login page
        </h1>

        <h2 className="text-[20px] text-gray-500 mb-6">
          Please enter your details to Sign In
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-full">
          <p className="text-sm text-black mt-4 mb-2">Email</p>

          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className=" w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"/>

          <p className="text-sm text-black mt-4 mb-2">Password</p>

          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className=" w-full p-3 rounded-xl border
              border-black bg-white text-black text-[15px]" />

          <button type="submit" onClick={handleLogin} className="p-3 rounded-xl
          bg-orange-500 text-white font-semibold hover:bg-orange-600 mt-3" >
            Submit
          </button>

          <Link to="/ForgotPassword"
            className="text-green-600 text-sm block mt-4">
            Forgot Password?
          </Link>

          <p className="text-sm mt-2 flex gap-1">
            Don't have an account?
            <Link to="/SignUp" className="text-green-600">
              Sign up
            </Link>
          </p>

        </form>

        <div className="text-AbeeZee text-center w-full">
          Copyright © 2026 - Kushagra
        </div>

      </div>
    </div>
  );
}

export default Login;