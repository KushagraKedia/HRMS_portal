import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

function SignUp() {
    const navigate      = useNavigate();
    const [name,        setName]        = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email,       setEmail]       = useState("");
    const [password,    setPassword]    = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error,       setError]       = useState("");
    const [loading,     setLoading]     = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required."); return;
        }
        if (password !== confirmPass) {
            setError("Passwords do not match."); return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters."); return;
        }

        setLoading(true);
        try {
            const res  = await fetch("http://localhost:5000/api/auth/signup", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ name, email, password, companyName: companyName || name })
            });
            const data = await res.json();

            if (!res.ok) { setError(data.error || "Signup failed."); setLoading(false); return; }

            // Auto login after signup
            localStorage.setItem("gic_user", JSON.stringify(data.user));
            navigate("/Dashboard/HR_Dashboard");
        } catch {
            setError("Could not reach the server. Make sure backend is running.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f0efe7] text-black">

            <div className="hidden md:flex md:w-[42%] h-screen">
                <img src={logo} alt="HRMS Logo" className="w-full h-full object-contain"/>
            </div>

            <div className="w-full md:w-[58%] flex flex-col justify-center items-center px-6 md:px-10 min-h-screen">

                <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">Create Admin Account</h1>
                <h2 className="text-base md:text-[20px] text-gray-500 mb-6 text-center">
                    Register your company on GIC FOLKS
                </h2>

                <form onSubmit={handleSignUp} className="w-full max-w-sm md:max-w-full">

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                            {error}
                        </div>
                    )}

                    <p className="text-sm text-black mt-4 mb-2">Full Name</p>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"/>

                    <p className="text-sm text-black mt-4 mb-2">Company Name <span className="text-gray-400 text-xs">(optional)</span></p>
                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
                        placeholder="e.g. BrightWave Innovations"
                        className="w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"/>

                    <p className="text-sm text-black mt-4 mb-2">Email Address</p>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"/>

                    <p className="text-sm text-black mt-4 mb-2">Password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"/>

                    <p className="text-sm text-black mt-4 mb-2">Confirm Password</p>
                    <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                        placeholder="Re-enter your password"
                        className="w-full p-3 rounded-xl border border-black bg-white text-black text-[15px]"/>

                    <button type="submit" disabled={loading}
                        className="w-full p-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 mt-5 disabled:opacity-60">
                        {loading ? "Creating account..." : "Create Admin Account"}
                    </button>

                    <p className="text-sm mt-3 flex gap-1">
                        Already have an account?
                        <Link to="/" className="text-green-600">Sign In</Link>
                    </p>
                </form>

                <div className="text-center w-full mt-8 text-sm text-gray-500">
                    Copyright © 2026 - Kushagra
                </div>
            </div>
        </div>
    );
}

export default SignUp;
