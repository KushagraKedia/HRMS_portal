import React, { useState, useEffect } from "react";
import { Check, AlertTriangle, RefreshCw, ShieldCheck, Menu, X, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import fullScreen from "./assests_crm/fullscreen.png";
import gridApplication from "./assests_crm/grid-2x2-check.png";
import messageIcon from "./assests_crm/message.png";
import mailIcon from "./assests_crm/mail.png";
import bellIcon from "./assests_crm/bell.png";
import personIcon from "./assests_crm/person9.webp";

function SubscriptionCards() {
    const navigate    = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("gic_user") || "{}");

    const [sidebarOpen,  setSidebarOpen]  = useState(false);
    const [plans,        setPlans]        = useState([]);
    const [loading,      setLoading]      = useState(true);
    const [error,        setError]        = useState(null);
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [paying,       setPaying]       = useState(null);
    const [successPlan,  setSuccessPlan]  = useState(null); // show success after payment

    const fetchPlans = async () => {
        setLoading(true);
        setError(null);
        try {
            const r = await fetch("http://localhost:5000/api/plans");
            if (!r.ok) throw new Error(`Server error ${r.status}`);
            const data = await r.json();
            setPlans(Array.isArray(data) ? data : Array.isArray(data.plans) ? data.plans : []);
        } catch (err) {
            setError(err.message || "Failed to load plans.");
            setPlans([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!currentUser.id) navigate("/");

        // Load Razorpay script dynamically
        const script = document.createElement("script");
        script.src   = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        fetchPlans();

        return () => { document.body.removeChild(script); };
    }, []);

    const handleSubscribe = async (plan) => {
        const price = billingCycle === "annually"
            ? Math.round((plan.price || 0) * 0.85)
            : (plan.price || 0);

        setPaying(plan.id);

        try {
            // Step 1 — Create order on backend
            const orderRes = await fetch("http://localhost:5000/api/razorpay/create-order", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({
                    amount:      price,
                    currency:    "INR",
                    planName:    plan.name,
                    adminId:     currentUser.adminId,
                    companyName: currentUser.companyName || currentUser.name,
                })
            });

            const orderData = await orderRes.json();
            if (!orderRes.ok) { alert(orderData.error || "Failed to create order."); setPaying(null); return; }

            // Step 2 — Open Razorpay checkout popup
            const options = {
                key:         orderData.keyId,
                amount:      orderData.amount,
                currency:    orderData.currency,
                name:        "GIC FOLKS",
                description: `${plan.name} Plan — ${billingCycle}`,
                order_id:    orderData.orderId,
                prefill: {
                    name:  currentUser.name  || "",
                    email: currentUser.email || "",
                },
                theme: { color: "#E97316" },

                handler: async function (response) {
                    // Step 3 — Verify payment on backend
                    try {
                        const verifyRes = await fetch("http://localhost:5000/api/razorpay/verify-payment", {
                            method:  "POST",
                            headers: { "Content-Type": "application/json" },
                            body:    JSON.stringify({
                                razorpay_order_id:   response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature:  response.razorpay_signature,
                                planId:       plan.id,
                                planName:     plan.name,
                                price,
                                billingCycle,
                                adminId:      currentUser.adminId,
                                companyName:  currentUser.companyName || currentUser.name,
                            })
                        });

                        const verifyData = await verifyRes.json();
                        if (!verifyRes.ok) { alert(verifyData.error || "Payment verification failed."); return; }

                        // Show success
                        setSuccessPlan(plan.name);
                    } catch { alert("Payment done but verification failed. Contact support."); }
                },

                modal: {
                    ondismiss: () => { setPaying(null); }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            rzp.on("payment.failed", (response) => {
                alert(`Payment failed: ${response.error.description}`);
                setPaying(null);
            });

        } catch (err) {
            alert("Something went wrong. Please try again.");
            setPaying(null);
        }
    };

    const handleLogout = () => { localStorage.removeItem("gic_user"); navigate("/"); };

    // ── Success screen ───────────────────────────────────────────────────────
    if (successPlan) return (
        <div className="flex h-screen overflow-hidden">
            <div className={`fixed lg:static top-0 left-0 z-50 h-screen transform transition-transform duration-300 -translate-x-full lg:translate-x-0`}>
                <Sidebar/>
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#F8F9FA]">
                <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center mx-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} className="text-green-500"/>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                    <p className="text-gray-500 mb-1">You are now subscribed to the</p>
                    <p className="text-xl font-bold text-orange-500 mb-4">{successPlan} Plan</p>
                    <p className="text-sm text-gray-400 mb-6">Your subscription is now active. You can start using all features.</p>
                    <button onClick={() => navigate("/CRM/Leads")}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl cursor-pointer transition-colors">
                        Go to Dashboard →
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden">
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>}
            <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"><Menu size={22}/></button>

            <div className={`fixed lg:static top-0 left-0 z-50 h-screen transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <div className="relative h-full">
                    <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 lg:hidden z-50"><X size={22}/></button>
                    <Sidebar/>
                </div>
            </div>

            <div className="w-full bg-[#F8F9FA] text-black flex-1 h-screen overflow-y-auto">

                {/* Navbar */}
                <div className="w-full border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 flex items-center justify-between p-3 bg-white">
                    <span className="ml-12 md:ml-10 text-2xl md:text-4xl font-bold">GIC FOLKS</span>
                    <div className="flex gap-2 md:gap-4 mr-2 md:mr-5 items-center">
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={fullScreen} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={gridApplication} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer"><img src={messageIcon} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={mailIcon} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer"><img src={bellIcon} alt="" className="h-4 w-4"/></button>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-lg">
                            <span className="text-xs font-semibold text-orange-600">{currentUser.name}</span>
                            <span className="text-xs text-gray-400">({currentUser.role})</span>
                        </div>
                        <button onClick={handleLogout} className="text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:cursor-pointer transition-colors hidden md:block">Logout</button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-full hover:cursor-pointer"><img src={personIcon} alt="" className="h-7 w-7 rounded-full"/></button>
                    </div>
                </div>

                {/* Page Header */}
                <div className="mx-3 md:mx-6 mt-5">
                    <h1 className="text-2xl font-bold">Subscription Plans</h1>
                    <p className="text-sm text-gray-500 mt-0.5">🏠 &gt; Subscription &gt; Plans</p>
                </div>

                {/* Company banner */}
                <div className="mx-3 md:mx-6 mt-4">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
                        <ShieldCheck size={20} className="text-orange-500 flex-shrink-0"/>
                        <div>
                            <p className="text-sm font-semibold text-orange-700">Company: {currentUser.companyName || currentUser.name}</p>
                            <p className="text-xs text-gray-500">Select a plan below to activate your subscription via Razorpay</p>
                        </div>
                    </div>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mt-8">
                    <div className="inline-flex bg-gray-200 rounded-lg p-1">
                        <button onClick={() => setBillingCycle("monthly")}
                            className={`rounded-md py-2 px-6 text-sm font-medium transition-all duration-200 hover:cursor-pointer ${billingCycle === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
                            Monthly
                        </button>
                        <button onClick={() => setBillingCycle("annually")}
                            className={`rounded-md py-2 px-6 text-sm font-medium transition-all duration-200 hover:cursor-pointer ml-0.5 ${billingCycle === "annually" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
                            Annually <span className="text-xs text-green-600 font-bold ml-1">Save 15%</span>
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <RefreshCw className="h-10 w-10 text-orange-500 animate-spin"/>
                        <p className="mt-4 text-slate-500 font-medium">Loading plans...</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="max-w-md mx-auto mt-10 bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-3"/>
                        <h3 className="text-lg font-semibold text-red-800">Connection Error</h3>
                        <p className="text-sm text-red-600 mt-1 mb-4">{error}</p>
                        <button onClick={fetchPlans} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition hover:cursor-pointer">
                            <RefreshCw size={16}/> Try Again
                        </button>
                    </div>
                )}

                {/* Plans Grid */}
                {!loading && !error && (
                    <div className="mx-3 md:mx-6 mt-8 mb-10">
                        {plans.length === 0 ? (
                            <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-xl max-w-lg mx-auto">
                                <ShieldCheck className="h-12 w-12 text-slate-400 mx-auto mb-3"/>
                                <p className="text-lg font-medium text-slate-800">No Plans Available</p>
                                <p className="text-sm text-slate-500 mt-1">Check back soon!</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                                {plans.map(plan => {
                                    const price = billingCycle === "annually"
                                        ? Math.round((plan.price || 0) * 0.85)
                                        : (plan.price || 0);

                                    return (
                                        <div key={plan.id}
                                            className={`flex flex-col bg-white rounded-2xl border overflow-hidden relative transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-lg ${plan.popular ? "border-orange-400 scale-[1.02]" : "border-gray-200 hover:border-gray-300"}`}>

                                            <div className="h-1.5 w-full" style={{ backgroundColor: plan.color || "#E97316" }}/>

                                            {plan.popular && (
                                                <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                    Most Popular
                                                </span>
                                            )}

                                            <div className="p-6 flex flex-col flex-1">
                                                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                                                <p className="text-xs text-gray-400 mb-4">
                                                    {plan.maxStaff >= 999 ? "Unlimited" : `Up to ${plan.maxStaff} staff`} · {plan.maxLeads >= 999999 ? "Unlimited" : `${plan.maxLeads} leads`}
                                                </p>

                                                <div className="flex items-baseline mb-6">
                                                    <span className="text-3xl font-extrabold text-slate-900">₹{price.toLocaleString("en-IN")}</span>
                                                    <span className="text-slate-400 ml-1 text-sm">/{billingCycle === "annually" ? "mo" : "month"}</span>
                                                </div>

                                                <ul className="flex flex-col gap-2.5 flex-1">
                                                    {Array.isArray(plan.features) && plan.features.map((f, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <Check size={15} className="text-green-500 flex-shrink-0 mt-0.5"/>
                                                            <span className="text-slate-600 text-sm leading-tight">{f}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="p-6 pt-0">
                                                <button onClick={() => handleSubscribe(plan)} disabled={paying === plan.id}
                                                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition duration-200 hover:cursor-pointer disabled:opacity-60 ${plan.popular ? "text-white shadow-md" : "bg-gray-100 hover:bg-gray-200 text-slate-800"}`}
                                                    style={plan.popular ? { backgroundColor: plan.color || "#E97316" } : {}}>
                                                    {paying === plan.id ? (
                                                        <span className="flex items-center justify-center gap-2">
                                                            <RefreshCw size={14} className="animate-spin"/> Opening Payment...
                                                        </span>
                                                    ) : "Buy Now →"}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Test mode notice */}
                <div className="mx-3 md:mx-6 mb-8">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center gap-2">
                        <span className="text-yellow-600 text-xs font-semibold">🧪 Test Mode</span>
                        <span className="text-yellow-600 text-xs">Use card number <strong>4111 1111 1111 1111</strong>, any future expiry, any CVV to test payment.</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex bg-white h-10 border-t border-gray-200 justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionCards;
