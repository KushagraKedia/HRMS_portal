import Sidebar from "../components/sidebar";
import fullScreen from "./assests_crm/fullscreen.png";
import messageIcon from "./assests_crm/message.png";
import personIcon from "./assests_crm/person9.webp";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, CheckCircle2, Clock, CreditCard, AlertCircle, ArrowRight } from "lucide-react";

function MySubscription() {
    const navigate    = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("gic_user") || "{}");

    const [sidebarOpen,   setSidebarOpen]   = useState(false);
    const [subscription,  setSubscription]  = useState(null);
    const [loading,       setLoading]       = useState(true);

    const PLAN_COLORS = {
        "Starter":      "#1AA3E8",
        "Professional": "#E97316",
        "Growth":       "#03C95A",
        "Enterprise":   "#8E24AA",
    };

    const PLAN_FEATURES = {
        "Starter":      ["3 Staff Accounts", "50 Leads", "Tickets", "Payroll", "Basic CRM"],
        "Professional": ["10 Staff Accounts", "500 Leads", "Tickets", "Payroll", "Full CRM", "Email Templates"],
        "Growth":       ["25 Staff Accounts", "1000 Leads", "Full CRM", "Email Templates", "Analytics", "Account Manager"],
        "Enterprise":   ["Unlimited Staff", "Unlimited Leads", "Full CRM", "Email Templates", "Priority Support", "Custom Branding"],
    };

    useEffect(() => {
        if (!currentUser.id) { navigate("/"); return; }
        fetch(`http://localhost:5000/api/subscriptions/active?adminId=${currentUser.adminId}`)
            .then(r => r.json())
            .then(data => { setSubscription(data?.planName && data.planName !== "none" ? data : null); })
            .catch(() => setSubscription(null))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => { localStorage.removeItem("gic_user"); navigate("/"); };

    const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" }) : "—";

    const planColor   = subscription ? (PLAN_COLORS[subscription.planName] || "#E97316") : "#9CA3AF";
    const planFeatures = subscription ? (PLAN_FEATURES[subscription.planName] || []) : [];

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
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer"><img src={messageIcon} alt="" className="h-4 w-4"/></button>
                        <button onClick={handleLogout} className="text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:cursor-pointer transition-colors hidden md:block">Logout</button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-full hover:cursor-pointer"><img src={personIcon} alt="" className="h-7 w-7 rounded-full"/></button>
                    </div>
                </div>

                {/* Header */}
                <div className="mx-3 md:mx-6 mt-5 flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">My Subscription</h1>
                        <p className="text-sm text-gray-500 mt-0.5">🏠 &gt; My Subscription</p>
                    </div>
                    <button onClick={() => navigate("/company/subscription")}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:cursor-pointer transition-colors">
                        <CreditCard size={15}/> {subscription ? "Upgrade Plan" : "View Plans"}
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-400">Loading...</div>
                ) : (
                    <div className="mx-3 md:mx-6 mt-6 mb-8 flex flex-col gap-5 max-w-3xl">

                        {/* Current Plan Card */}
                        {subscription ? (
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] overflow-hidden">
                                <div className="h-2 w-full" style={{ backgroundColor: planColor }}/>
                                <div className="p-6">
                                    <div className="flex items-start justify-between flex-wrap gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-2xl font-bold">{subscription.planName} Plan</span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 border border-green-200 font-semibold flex items-center gap-1">
                                                    <CheckCircle2 size={11}/> Active
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm">Company: <span className="font-semibold text-gray-700">{subscription.companyName}</span></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold" style={{ color: planColor }}>₹{Number(subscription.price).toLocaleString("en-IN")}</p>
                                            <p className="text-xs text-gray-400">/{subscription.billingCycle === "annually" ? "mo billed yearly" : "month"}</p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {planFeatures.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle2 size={14} className="flex-shrink-0" style={{ color: planColor }}/>{f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* No Plan Card */
                            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center">
                                <AlertCircle size={40} className="text-gray-300 mx-auto mb-3"/>
                                <p className="text-lg font-semibold text-gray-700">No Active Plan</p>
                                <p className="text-sm text-gray-400 mt-1 mb-5">You don't have an active subscription. Choose a plan to unlock all features.</p>
                                <button onClick={() => navigate("/company/subscription")}
                                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:cursor-pointer transition-colors">
                                    View Plans <ArrowRight size={15}/>
                                </button>
                            </div>
                        )}

                        {/* Payment Details */}
                        {subscription && (
                            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-5">
                                <p className="font-semibold text-base mb-4">Payment Details</p>
                                <div className="flex flex-col gap-3 text-sm">
                                    {[
                                        ["Plan",         subscription.planName],
                                        ["Billing",      subscription.billingCycle === "annually" ? "Annual" : "Monthly"],
                                        ["Amount Paid",  `₹${Number(subscription.price).toLocaleString("en-IN")}`],
                                        ["Payment ID",   subscription.paymentId || "—"],
                                        ["Order ID",     subscription.orderId   || "—"],
                                        ["Paid On",      fmtDate(subscription.paidAt)],
                                        ["Status",       subscription.status],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex justify-between items-center border-b border-gray-50 pb-2">
                                            <span className="text-gray-500">{label}</span>
                                            <span className={`font-medium ${label === "Status" ? "text-green-600" : "text-gray-800"}`}>
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upgrade prompt */}
                        {subscription && subscription.planName !== "Enterprise" && (
                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                                <div>
                                    <p className="font-semibold text-orange-700 text-sm">Want more features?</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Upgrade your plan to unlock Accounts, Contacts, Opportunities and more.</p>
                                </div>
                                <button onClick={() => navigate("/company/subscription")}
                                    className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:cursor-pointer transition-colors whitespace-nowrap">
                                    Upgrade <ArrowRight size={14}/>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex bg-white h-10 border-t border-gray-200 justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
        </div>
    );
}

export default MySubscription;
