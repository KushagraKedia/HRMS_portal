import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, CreditCard, Building2, LogOut,
    Plus, Trash2, RefreshCw, CheckCircle2, X,
    Users, DollarSign, ShieldCheck, Clock
} from 'lucide-react';

export default function SuperAdminDashboard() {
    const navigate = useNavigate();

    const [subscriptions, setSubscriptions] = useState([]);
    const [plans,         setPlans]         = useState([]);
    const [companies,     setCompanies]     = useState([]); // all signed up admins
    const [loading,       setLoading]       = useState(true);
    const [activeTab,     setActiveTab]     = useState("dashboard");

    // Add plan modal
    const [showModal, setShowModal] = useState(false);
    const [newPlan,   setNewPlan]   = useState({ name:"", price:"", features:"", popular: false });
    const [saving,    setSaving]    = useState(false);
    const [planError, setPlanError] = useState("");

    // Protect route
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role !== "superadmin") navigate("/superadmin/login");
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [plansRes, subsRes, companiesRes] = await Promise.all([
                fetch("http://localhost:5000/api/plans"),
                fetch("http://localhost:5000/api/subscriptions"),
                fetch("http://localhost:5000/api/auth/companies"),
            ]);
            const plansData     = await plansRes.json();
            const subsData      = await subsRes.json();
            const companiesData = await companiesRes.json();

            setPlans(Array.isArray(plansData)     ? plansData     : []);
            setSubscriptions(Array.isArray(subsData) ? subsData   : []);
            setCompanies(Array.isArray(companiesData) ? companiesData : []);
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

    // ── Stats ────────────────────────────────────────────────────────────────
    // Total Companies = all admins who signed up (from users.json)
    const totalCompanies  = companies.length;
    // Active Companies = companies that have paid (from subscriptions.json)
    const activeCompanies = subscriptions.filter(s => s.status === "active").length;
    const totalRevenue    = subscriptions.reduce((sum, s) => sum + (Number(s.price) || 0), 0);

    // Merge companies with their subscription info
    const companiesWithSub = companies.map(company => {
        const sub = subscriptions.find(s =>
            String(s.adminId) === String(company.adminId) ||
            s.companyName?.toLowerCase() === (company.companyName || company.name)?.toLowerCase()
        );
        return { ...company, subscription: sub || null };
    });

    const tabs = [
        { key: "dashboard", label: "Dashboard",    icon: LayoutDashboard },
        { key: "plans",     label: "Manage Plans", icon: CreditCard },
        { key: "companies", label: "Companies",    icon: Building2 },
    ];

    const planColors = ["#1AA3E8","#E97316","#8E24AA","#03C95A","#E53935"];

    const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }) : "—";

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col" style={{ fontFamily:"system-ui,sans-serif" }}>

            {/* Navbar */}
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

                {/* Main */}
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

                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                {[
                                    { label:"Total Plans",       value: plans.length,     icon: CreditCard,   color:"bg-blue-50 border-blue-200",    iconColor:"text-blue-500"   },
                                    { label:"Total Companies",   value: totalCompanies,   icon: Building2,    color:"bg-purple-50 border-purple-200", iconColor:"text-purple-500",
                                      sub: "All signed up companies" },
                                    { label:"Active Companies",  value: activeCompanies,  icon: CheckCircle2, color:"bg-green-50 border-green-200",   iconColor:"text-green-500",
                                      sub: "Paid subscription" },
                                    { label:"Total Revenue",     value:`₹${totalRevenue.toLocaleString("en-IN")}`, icon: DollarSign, color:"bg-orange-50 border-orange-200", iconColor:"text-orange-500" },
                                ].map(stat => (
                                    <div key={stat.label} className={`bg-white rounded-xl border ${stat.color} p-4`}>
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                                                <stat.icon size={18} className={stat.iconColor}/>
                                            </div>
                                            <p className="text-xs text-gray-500">{stat.label}</p>
                                        </div>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                        {stat.sub && <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>}
                                    </div>
                                ))}
                            </div>

                            {/* Recent subscriptions table */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="font-semibold text-base">Recent Subscriptions</h2>
                                    <span className="text-xs text-gray-400">{subscriptions.length} total</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                {["Company","Plan","Amount","Status","Date"].map(h => (
                                                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subscriptions.length === 0 ? (
                                                <tr><td colSpan="5" className="text-center py-8 text-gray-400">No subscriptions yet.</td></tr>
                                            ) : subscriptions.slice(0,5).map(sub => (
                                                <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-medium">{sub.companyName}</td>
                                                    <td className="px-4 py-3">{sub.planName}</td>
                                                    <td className="px-4 py-3 font-semibold text-green-600">₹{Number(sub.price||0).toLocaleString("en-IN")}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 border border-green-200 font-medium">{sub.status}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-400 text-xs">{fmtDate(sub.paidAt)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── PLANS TAB ── */}
                    {activeTab === "plans" && (
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Manage Plans</h1>
                                    <p className="text-sm text-gray-500 mt-0.5">Plans visible to all companies on the subscription page</p>
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
                                                    <p className="text-2xl font-bold text-orange-500 mt-1">
                                                        ₹{Number(plan.price).toLocaleString("en-IN")}
                                                        <span className="text-sm text-gray-400 font-normal">/mo</span>
                                                    </p>
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
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
                                    <p className="text-sm text-gray-500 mt-0.5">All companies that have signed up — {totalCompanies} total, {activeCompanies} active</p>
                                </div>
                                <button onClick={fetchData} className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <RefreshCw size={14}/> Refresh
                                </button>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label:"Total Signed Up", value: totalCompanies,               color:"bg-purple-50 border-purple-200 text-purple-700" },
                                    { label:"Active (Paid)",   value: activeCompanies,              color:"bg-green-50 border-green-200 text-green-700"   },
                                    { label:"Not Subscribed",  value: totalCompanies-activeCompanies, color:"bg-gray-50 border-gray-200 text-gray-600"    },
                                ].map(s => (
                                    <div key={s.label} className={`border rounded-xl p-3 text-center ${s.color}`}>
                                        <p className="text-2xl font-bold">{s.value}</p>
                                        <p className="text-xs mt-0.5 opacity-70">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Companies table */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                {["#","Company","Email","Signed Up","Plan","Amount Paid","Payment Status"].map(h => (
                                                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {companiesWithSub.length === 0 ? (
                                                <tr><td colSpan="7" className="text-center py-10 text-gray-400">No companies have signed up yet.</td></tr>
                                            ) : companiesWithSub.map((company, idx) => (
                                                <tr key={company.id} className="border-b border-gray-50 hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                                {(company.companyName || company.name || "?")[0].toUpperCase()}
                                                            </div>
                                                            <span className="font-semibold">{company.companyName || company.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-500">{company.email}</td>
                                                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{fmtDate(company.createdAt)}</td>
                                                    <td className="px-4 py-3">
                                                        {company.subscription
                                                            ? <span className="font-medium text-orange-600">{company.subscription.planName}</span>
                                                            : <span className="text-gray-400 text-xs">No plan</span>}
                                                    </td>
                                                    <td className="px-4 py-3 font-semibold text-green-600">
                                                        {company.subscription
                                                            ? `₹${Number(company.subscription.price||0).toLocaleString("en-IN")}`
                                                            : <span className="text-gray-400 font-normal text-xs">—</span>}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {company.subscription ? (
                                                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 border border-green-200 font-medium flex items-center gap-1 w-fit">
                                                                <CheckCircle2 size={11}/> Active
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200 font-medium flex items-center gap-1 w-fit">
                                                                <Clock size={11}/> Not Subscribed
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    </>
                    )}
                </div>
            </div>

            {/* ADD PLAN MODAL */}
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
                                <input type="text" placeholder="e.g. Enterprise" value={newPlan.name}
                                    onChange={e => setNewPlan(p => ({...p, name: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Price per month (₹) <span className="text-red-500">*</span></label>
                                <input type="number" placeholder="e.g. 2999" value={newPlan.price}
                                    onChange={e => setNewPlan(p => ({...p, price: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Features <span className="text-gray-400">(comma separated)</span></label>
                                <textarea rows={3} placeholder="e.g. 10 Staff, 500 Leads, Full CRM" value={newPlan.features}
                                    onChange={e => setNewPlan(p => ({...p, features: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="popular" checked={newPlan.popular}
                                    onChange={e => setNewPlan(p => ({...p, popular: e.target.checked}))}
                                    className="w-4 h-4 accent-orange-500"/>
                                <label htmlFor="popular" className="text-sm text-gray-600 cursor-pointer">Mark as Most Popular</label>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                            <button onClick={handleCreatePlan} disabled={saving}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white cursor-pointer">
                                {saving ? "Saving..." : "Create Plan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
