import { useState } from "react";

const API = "http://localhost:5000/api/leads";

function LeadCapture() {
    const [form, setForm] = useState({ name:"", email:"", phone:"", location:"", company:"", value:"", source:"Web Form", message:"" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState("");

    const validate = () => {
        const e = {};
        if (!form.name.trim())  e.name  = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
        if (!form.phone.trim()) e.phone = "Phone is required";
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setSubmitting(true);
        setServerError("");
        try {
            const avatarColors = ["#1AA3E8","#1F5FE0","#8E24AA","#03C95A","#E53935","#2E7D32","#F4B400"];
            const iconBg = avatarColors[Math.floor(Math.random()*avatarColors.length)];
            const r = await fetch(`${API}/columns/Not%20Contacted/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, location: form.location || "N/A", value: form.value || "$0", iconBg, source: "Web Form", company: form.company, message: form.message })
            });
            if (!r.ok) { const err = await r.json(); setServerError(err.error || "Submission failed. Please try again."); setSubmitting(false); return; }
            setSubmitted(true);
        } catch { setServerError("Could not reach the server. Please try again later."); }
        setSubmitting(false);
    };

    const field = (key) => ({
        value: form[key],
        onChange: (e) => { setForm(p => ({...p, [key]: e.target.value})); if (errors[key]) setErrors(p => ({...p, [key]: ""})); }
    });

    if (submitted) return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-gray-500 mb-2">Your inquiry has been received successfully.</p>
                <p className="text-gray-500 text-sm">One of our sales representatives will get in touch with you shortly.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", location:"", company:"", value:"", source:"Web Form", message:"" }); }}
                    className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:cursor-pointer transition-colors text-sm">
                    Submit Another
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-7">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        </div>
                        <span className="text-white font-bold text-xl">GIC FOLKS</span>
                    </div>
                    <h1 className="text-white text-2xl font-bold">Get In Touch</h1>
                    <p className="text-white/80 text-sm mt-1">Fill in your details and our team will reach out to you shortly.</p>
                </div>

                {/* Form */}
                <div className="px-8 py-7 flex flex-col gap-4">
                    {serverError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{serverError}</div>
                    )}

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="John Smith" {...field("name")} className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}/>
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address <span className="text-red-500">*</span></label>
                            <input type="email" placeholder="john@example.com" {...field("email")} className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}/>
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    {/* Phone + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone Number <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="(193) 7839 748" {...field("phone")} className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"}`}/>
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Company Name</label>
                            <input type="text" placeholder="BrightWave Innovations" {...field("company")} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                        </div>
                    </div>

                    {/* Location + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Location</label>
                            <input type="text" placeholder="Austin, United States" {...field("location")} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-600 mb-1 block">Estimated Budget</label>
                            <input type="text" placeholder="e.g. $3,50,000" {...field("value")} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                        </div>
                    </div>

                    {/* How did you hear */}
                    <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">How did you hear about us?</label>
                        <select {...field("source")} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                            {["Web Form","Google","LinkedIn","Referral","Social Media","Email Campaign","Other"].map(s=><option key={s}>{s}</option>)}
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Message</label>
                        <textarea rows={3} placeholder="Tell us about your requirements..." {...field("message")} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                    </div>

                    <button onClick={handleSubmit} disabled={submitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl hover:cursor-pointer transition-colors text-sm mt-1">
                        {submitting ? "Submitting..." : "Submit Inquiry →"}
                    </button>

                    <p className="text-center text-xs text-gray-400">By submitting this form, you agree to be contacted by our sales team.</p>
                </div>
            </div>
        </div>
    );
}

export default LeadCapture;
