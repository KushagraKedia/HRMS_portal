import {Link} from "react-router-dom";
import {useState} from "react";
// import "./SignUp.css"

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
      <div className="min-h-screen w-full flex flex-row bg-[#f0efe7] text-black">

      <div className="w-[42%] h-screen">
          <img src={logo} alt="HRMS Logo" className="w-full h-full object-contain" />
      </div> 

      <div className="w-[58%] flex flex-col justify-center items-center px-10">     
       <h1 className="text-3xl font-bold text-black mb-2">Sign Up</h1><br />
       <h2 className="text-[20px] text-gray-500 mb-6">Please enter your details to sign up</h2>
       <form onSubmit={HandleSubmit} className="w-full max-w-full">

        <p className="text-sm text-black mt-4 mb-2">Name: </p>
        <input type="text"
        value={name} onChange={(e)=>setName(e.target.value)} 
        className=" w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"/>

        <p className="text-sm text-black mt-4 mb-2">Email Addres: </p>
        <input type="email" 
        value={email} onChange={(e)=>setEmail(e.target.value)}
        className=" w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]" />

        <p className="text-sm text-black mt-4 mb-2">Password: </p>
        <input type="password"  
        value={password} onChange={(e)=>setPassword(e.target.value)}
        className=" w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]" />

        <p className="text-sm text-black mt-4 mb-2">Confirm Password: </p>
        <input type="password" value={newpassword}
        onChange={(e)=>setNewpassword(e.target.value)}
        className=" w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]" />

        <br />
        <button type="Submit" className="p-3 rounded-xl
          bg-orange-500 text-white font-semibold hover:bg-orange-600 mt-3">
          Sign Up
        </button>
        <br />
        <p className="text-sm mt-2 flex gap-1">Already have an account? <Link to="/" className="text-green-600">Sign In</Link></p>
      </form>
      <bottom>
        <p>Copyright © 2026 - Kushagra</p>
      </bottom>
      </div> 
    </div>
    );
}

export default SignUp;