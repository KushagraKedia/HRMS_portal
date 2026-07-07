import Sidebar from "../components/sidebar"
import fullScreen from "./assests_crm/fullscreen.png"
import messageIcon from "./assests_crm/message.png"
import personIcon from "./assests_crm/person9.webp"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Plus, Trash2, UserCheck, Mail, Shield, ShieldOff } from "lucide-react";

const API = "http://localhost:5000/api/auth";

function ManageStaff() {
    const navigate    = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("gic_user") || "{}");

    // Auth headers sent with every protected request
    const authHeaders = {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [staff,       setStaff]       = useState([]);
    const [loading,     setLoading]     = useState(true);

    // Add staff modal
    const [showModal, setShowModal] = useState(false);
    const [form,      setForm]      = useState({ name: "", email: "", password: "" });
    const [formError, setFormError] = useState("");
    const [saving,    setSaving]    = useState(false);

    // Redirect if not admin
    useEffect(() => {
        if (!currentUser.id || currentUser.role !== "admin") {
            navigate("/");
        }
    }, []);

    const fetchStaff = async () => {
        try {
            const r = await fetch(`${API}/staff`, { headers: authHeaders });
            if (r.ok) setStaff(await r.json());
        } catch {}
        setLoading(false);
    };

    useEffect(() => { fetchStaff(); }, []);

    const handleAdd = async () => {
        if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
            setFormError("All fields are required."); return;
        }
        if (form.password.length < 6) {
            setFormError("Password must be at least 6 characters."); return;
        }
        setSaving(true);
        try {
            const r = await fetch(`${API}/create-staff`, {
                method: "POST",
                headers: authHeaders,
                body: JSON.stringify(form)
            });
            const d = await r.json();
            if (!r.ok) { setFormError(d.error || "Failed."); setSaving(false); return; }
            await fetchStaff();
            setShowModal(false);
            setForm({ name: "", email: "", password: "" });
        } catch { setFormError("Could not reach server."); }
        setSaving(false);
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Remove ${name} from staff?`)) return;
        await fetch(`${API}/staff/${id}`, { method: "DELETE", headers: authHeaders });
        setStaff(prev => prev.filter(s => s.id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem("gic_user");
        navigate("/");
    };

    const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" });

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
                        <button onClick={handleLogout} className="text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:cursor-pointer transition-colors">
                            Logout
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-full hover:cursor-pointer"><img src={personIcon} alt="" className="h-7 w-7 rounded-full"/></button>
                    </div>
                </div>

                {/* Header */}
                <div className="mx-3 md:mx-6 mt-5 flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Manage Staff</h1>
                        <p className="text-sm text-gray-500 mt-0.5">🏠 &gt; Admin &gt; Manage Staff</p>
                    </div>
                    <button onClick={() => { setForm({ name:"", email:"", password:"" }); setFormError(""); setShowModal(true); }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:cursor-pointer transition-colors">
                        <Plus size={16}/> Add Staff
                    </button>
                </div>

                {/* Admin info */}
                <div className="mx-3 md:mx-6 mt-4">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
                        <Shield size={20} className="text-orange-500 flex-shrink-0"/>
                        <div>
                            <p className="text-sm font-semibold text-orange-700">
                                Admin: {currentUser.name}
                                {currentUser.companyName && currentUser.companyName !== currentUser.name &&
                                    <span className="text-orange-500"> — {currentUser.companyName}</span>}
                            </p>
                            <p className="text-xs text-gray-500">{currentUser.email} · Staff you create can only see leads assigned to them</p>
                        </div>
                    </div>
                </div>

                {/* Staff list */}
                <div className="mx-3 md:mx-6 mt-5 mb-8">
                    {loading ? (
                        <div className="text-center text-gray-400 py-20">Loading staff...</div>
                    ) : staff.length === 0 ? (
                        <div className="text-center py-20">
                            <UserCheck size={48} className="text-gray-300 mx-auto mb-3"/>
                            <p className="text-gray-400 font-medium">No staff members yet</p>
                            <p className="text-gray-400 text-sm mt-1">Click "Add Staff" to create a staff account</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {staff.map(s => (
                                <div key={s.id} className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4 flex items-center justify-between gap-3 flex-wrap">
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {s.name.split(" ").map(w => w[0]?.toUpperCase()).slice(0,2).join("")}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base">{s.name}</p>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Mail size={12}/>{s.email}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 border border-blue-200 font-medium flex items-center gap-1">
                                                    <ShieldOff size={10}/> Staff
                                                </span>
                                                <span className="text-xs text-gray-400">Joined {fmtDate(s.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(s.id, s.name)}
                                        className="flex items-center gap-1.5 text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:cursor-pointer transition-colors">
                                        <Trash2 size={14}/> Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex bg-white h-10 border-t border-gray-200 justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>

            {/* ADD STAFF MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold">Add Staff Member</h2>
                                <p className="text-xs text-gray-400 mt-0.5">They will be linked to your company</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>

                        {formError && (
                            <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</div>
                        )}

                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="e.g. Priya Sharma" value={form.name}
                                    onChange={e => setForm(p => ({...p, name: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Email <span className="text-red-500">*</span></label>
                                <input type="email" placeholder="e.g. priya@company.com" value={form.email}
                                    onChange={e => setForm(p => ({...p, email: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Password <span className="text-red-500">*</span></label>
                                <input type="password" placeholder="Min. 6 characters" value={form.password}
                                    onChange={e => setForm(p => ({...p, password: e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                <p className="text-xs text-gray-400 mt-1">Share this password with the staff member directly.</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleAdd} disabled={saving}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">
                                {saving ? "Creating..." : "Create Staff"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageStaff;
