import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, CreditCard, Building2, LogOut, 
    Plus, Trash2, RefreshCw, CheckCircle2, X,
    TrendingUp, Users, DollarSign, ShieldCheck
} from 'lucide-react';

export default function SuperAdminDashboard() {
    const navigate = useNavigate();

    const [subscriptions, setSubscriptions] = useState([]);
    const [plans,         setPlans]         = useState([]);
    const [loading,       setLoading]       = useState(true);
    const [activeTab,     setActiveTab]     = useState("dashboard");

    // Add plan modal
    const [showModal, setShowModal]   = useState(false);
    const [newPlan,   setNewPlan]     = useState({ name:"", price:"", features:"", popular: false });
    const [saving,    setSaving]      = useState(false);
    const [planError, setPlanError]   = useState("");

    // Protect route — only superadmin can access
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role !== "superadmin") navigate("/superadmin/login");
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [plansRes, subsRes] = await Promise.all([
                fetch("http://localhost:5000/api/plans"),
                fetch("http://localhost:5000/api/subscriptions")
            ]);
            const plansData = await plansRes.json();
            const subsData  = await subsRes.json();
            setPlans(Array.isArray(plansData) ? plansData : []);
            setSubscriptions(Array.isArray(subsData) ? subsData : []);
        } catch (err) {
            console.error("Error loading data:", err);
        }
        setLoading(false);
    };

    const handleCreatePlan = async () => {
        if (!newPlan.name.trim() || !newPlan.price) { setPlanError("Name and price are required."); return; }
        setSaving(true);
        try {
            await fetch("http://localhost:5000/api/plans", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({
                    name:     newPlan.name.trim(),
                    price:    Number(newPlan.price),
                    features: newPlan.features.split(",").map(f => f.trim()).filter(Boolean),
                    popular:  newPlan.popular,
                    currency: "INR",
                    duration: "month"
                })
            });
            setNewPlan({ name:"", price:"", features:"", popular: false });
            setPlanError("");
            setShowModal(false);
            fetchData();
        } catch { setPlanError("Failed to create plan."); }
        setSaving(false);
    };

    const handleDeletePlan = async (id) => {
        if (!window.confirm("Delete this plan?")) return;
        await fetch(`http://localhost:5000/api/plans/${id}`, { method: "DELETE" });
        fetchData();
    };

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        navigate("/superadmin/login");
    };

    // Stats
    const totalRevenue   = subscriptions.reduce((sum, s) => sum + (Number(s.price) || 0), 0);
    const activeCompanies = subscriptions.filter(s => s.status === "active").length;

    const tabs = [
        { key: "dashboard", label: "Dashboard",    icon: LayoutDashboard },
        { key: "plans",     label: "Manage Plans", icon: CreditCard },
        { key: "companies", label: "Companies",    icon: Building2 },
    ];

    const planColors = ["#1AA3E8","#E97316","#8E24AA","#03C95A","#E53935"];

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col" style={{ fontFamily: "system-ui, sans-serif" }}>

            {/* Top Navbar */}
            <div className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <ShieldCheck size={18} className="text-white"/>
                    </div>
                    <div>
                        <span className="text-xl font-bold text-gray-900">GIC FOLKS</span>
                        <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold border border-purple-200">SuperAdmin</span>
                    </div>
                </div>
                <button onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
                    <LogOut size={14}/> Logout
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <div className="w-56 bg-white border-r border-gray-200 flex flex-col py-6 px-3 gap-1 flex-shrink-0">
                    <p className="text-xs font-bold text-gray-400 uppercase px-3 mb-2">Menu</p>
                    {tabs.map(tab => (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full text-left ${activeTab === tab.key ? "bg-orange-50 text-orange-600 border border-orange-100" : "text-gray-600 hover:bg-gray-100"}`}>
                            <tab.icon size={16}/>{tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6">

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <RefreshCw size={28} className="text-orange-500 animate-spin"/>
                        </div>
                    ) : (

                    <>
                    {/* ── DASHBOARD TAB ── */}
                    {activeTab === "dashboard" && (
                        <div className="flex flex-col gap-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">SuperAdmin Dashboard</h1>
                                <p className="text-sm text-gray-500 mt-0.5">Overview of all companies and subscriptions</p>
                            </div>

                            {/* Stats cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                {[
                                    { label:"Total Plans",      value: plans.length,       icon: CreditCard,   color:"bg-blue-50 border-blue-200",   iconColor:"text-blue-500"   },
                                    { label:"Total Companies",  value: subscriptions.length, icon: Building2,  color:"bg-purple-50 border-purple-200", iconColor:"text-purple-500" },
                                    { label:"Active Companies", value: activeCompanies,    icon: CheckCircle2, color:"bg-green-50 border-green-200",  iconColor:"text-green-500"  },
                                    { label:"Total Revenue",    value:`₹${totalRevenue.toLocaleString("en-IN")}`, icon: DollarSign, color:"bg-orange-50 border-orange-200", iconColor:"text-orange-500" },
                                ].map(stat => (
                                    <div key={stat.label} className={`bg-white rounded-xl border ${stat.color} p-4 flex items-center gap-4`}>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                                            <stat.icon size={20} className={stat.iconColor}/>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent subscriptions */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <h2 className="font-semibold text-base">Recent Company Subscriptions</h2>
                                </div>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Company</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Plan</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Amount</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscriptions.length === 0 ? (
                                            <tr><td colSpan="5" className="text-center py-8 text-gray-400">No subscriptions yet.</td></tr>
                                        ) : subscriptions.slice(0,5).map(sub => (
                                            <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">{sub.companyName}</td>
                                                <td className="px-4 py-3">{sub.planName}</td>
                                                <td className="px-4 py-3 font-semibold text-green-600">₹{Number(sub.price || sub.amountPaid || 0).toLocaleString("en-IN")}</td>
                                                <td className="px-4 py-3">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 border border-green-200 font-medium">{sub.status}</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-400 text-xs">{sub.paidAt ? new Date(sub.paidAt).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }) : "—"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ── PLANS TAB ── */}
                    {activeTab === "plans" && (
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Manage Plans</h1>
                                    <p className="text-sm text-gray-500 mt-0.5">Create and delete subscription plans visible to companies</p>
                                </div>
                                <button onClick={() => { setShowModal(true); setPlanError(""); }}
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg cursor-pointer transition-colors">
                                    <Plus size={16}/> New Plan
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {plans.map((plan, idx) => (
                                    <div key={plan.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                        <div className="h-1.5" style={{ backgroundColor: plan.color || planColors[idx % planColors.length] }}/>
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="font-bold text-lg">{plan.name}</p>
                                                    <p className="text-2xl font-bold text-orange-500 mt-1">₹{Number(plan.price).toLocaleString("en-IN")}<span className="text-sm text-gray-400 font-normal">/mo</span></p>
                                                </div>
                                                {plan.popular && <span className="text-xs bg-orange-100 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">Popular</span>}
                                            </div>
                                            <ul className="flex flex-col gap-1.5 mb-4">
                                                {Array.isArray(plan.features) && plan.features.map((f, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <CheckCircle2 size={13} className="text-green-500 flex-shrink-0"/>{f}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button onClick={() => handleDeletePlan(plan.id)}
                                                className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
                                                <Trash2 size={13}/> Delete Plan
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── COMPANIES TAB ── */}
                    {activeTab === "companies" && (
                        <div className="flex flex-col gap-5">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
                                <p className="text-sm text-gray-500 mt-0.5">All companies that have purchased a subscription</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">#</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Company</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Plan</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Billing</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Amount Paid</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Payment ID</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscriptions.length === 0 ? (
                                            <tr><td colSpan="8" className="text-center py-10 text-gray-400">No companies have subscribed yet.</td></tr>
                                        ) : subscriptions.map((sub, idx) => (
                                            <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                                                <td className="px-4 py-3 font-semibold">{sub.companyName}</td>
                                                <td className="px-4 py-3">{sub.planName}</td>
                                                <td className="px-4 py-3 capitalize text-gray-500">{sub.billingCycle || "monthly"}</td>
                                                <td className="px-4 py-3 font-semibold text-green-600">₹{Number(sub.price || sub.amountPaid || 0).toLocaleString("en-IN")}</td>
                                                <td className="px-4 py-3 text-xs text-gray-400 font-mono">{sub.paymentId || "—"}</td>
                                                <td className="px-4 py-3">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 border border-green-200 font-medium">{sub.status}</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-400 text-xs">{sub.paidAt ? new Date(sub.paidAt).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }) : "—"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    </>
                    )}
                </div>
            </div>

            {/* ── ADD PLAN MODAL ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold">Create New Plan</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 cursor-pointer"><X size={20}/></button>
                        </div>
                        {planError && <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{planError}</div>}
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Plan Name <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="e.g. Enterprise" value={newPlan.name} onChange={e => setNewPlan(p => ({...p, name: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Price per month (₹) <span className="text-red-500">*</span></label>
                                <input type="number" placeholder="e.g. 2999" value={newPlan.price} onChange={e => setNewPlan(p => ({...p, price: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Features <span className="text-gray-400">(comma separated)</span></label>
                                <textarea rows={3} placeholder="e.g. 10 Staff, 500 Leads, Full CRM" value={newPlan.features} onChange={e => setNewPlan(p => ({...p, features: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="popular" checked={newPlan.popular} onChange={e => setNewPlan(p => ({...p, popular: e.target.checked}))} className="w-4 h-4 accent-orange-500"/>
                                <label htmlFor="popular" className="text-sm text-gray-600 cursor-pointer">Mark as Most Popular</label>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                            <button onClick={handleCreatePlan} disabled={saving} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white cursor-pointer">
                                {saving ? "Saving..." : "Create Plan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
