import Sidebar from "../components/sidebar"
import fullScreen from "./assests_crm/fullscreen.png"
import gridApplication from "./assests_crm/grid-2x2-check.png"
import messageIcon from "./assests_crm/message.png"
import mailIcon from "./assests_crm/mail.png"
import bellIcon from "./assests_crm/bell.png"
import personIcon from "./assests_crm/person9.webp"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Plus, Pencil, Trash2, Building2, Mail, Phone, MapPin, ChevronDown } from "lucide-react";

const API = "http://localhost:5000/api/accounts";

function Accounts() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // ── Add Modal ────────────────────────────────────────────────────────────
    const [showAddModal, setShowAddModal] = useState(false);
    const [addForm, setAddForm] = useState({ company: "", email: "", phone: "", location: "", industry: "", website: "" });
    const [addError, setAddError] = useState("");
    const [addSaving, setAddSaving] = useState(false);

    // ── Edit Modal ───────────────────────────────────────────────────────────
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [editError, setEditError] = useState("");
    const [editSaving, setEditSaving] = useState(false);

    const fetchAccounts = async () => {
        try {
            const r = await fetch(API);
            if (r.ok) setAccounts(await r.json());
        } catch { /* server down */ }
        setLoading(false);
    };

    useEffect(() => { fetchAccounts(); }, []);

    const handleAdd = async () => {
        if (!addForm.company.trim()) { setAddError("Company name is required."); return; }
        setAddSaving(true);
        try {
            const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(addForm) });
            if (!r.ok) { const e = await r.json(); setAddError(e.error || "Failed."); setAddSaving(false); return; }
            await fetchAccounts();
            setShowAddModal(false);
            setAddForm({ company: "", email: "", phone: "", location: "", industry: "", website: "" });
        } catch { setAddError("Could not reach server."); }
        setAddSaving(false);
    };

    const handleEdit = async () => {
        if (!editForm.company?.trim()) { setEditError("Company name is required."); return; }
        setEditSaving(true);
        try {
            const r = await fetch(`${API}/${editForm.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) });
            if (!r.ok) { const e = await r.json(); setEditError(e.error || "Failed."); setEditSaving(false); return; }
            await fetchAccounts();
            setShowEditModal(false);
        } catch { setEditError("Could not reach server."); }
        setEditSaving(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this account?")) return;
        await fetch(`${API}/${id}`, { method: "DELETE" });
        setAccounts(prev => prev.filter(a => a.id !== id));
    };

    const filtered = accounts.filter(a => a.company?.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase()));

    const industries = ["Technology", "Finance", "Healthcare", "Retail", "Manufacturing", "Education", "Real Estate", "Other"];

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
                    <div className="flex gap-2 md:gap-4 mr-2 md:mr-5">
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={fullScreen} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={gridApplication} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer"><img src={messageIcon} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={mailIcon} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-full hover:cursor-pointer"><img src={personIcon} alt="" className="h-7 w-7 rounded-full"/></button>
                    </div>
                </div>

                {/* Header */}
                <div className="mx-3 md:mx-6 mt-5 flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Accounts</h1>
                        <p className="text-sm text-gray-500 mt-0.5">🏠 &gt; CRM &gt; Accounts</p>
                    </div>
                    <button onClick={() => { setAddForm({ company:"", email:"", phone:"", location:"", industry:"", website:"" }); setAddError(""); setShowAddModal(true); }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:cursor-pointer transition-colors">
                        <Plus size={16}/> Add Account
                    </button>
                </div>

                {/* Search */}
                <div className="mx-3 md:mx-6 mt-4">
                    <input type="text" placeholder="Search accounts..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full md:w-80 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"/>
                </div>

                {/* Accounts Grid */}
                <div className="mx-3 md:mx-6 mt-5 mb-8">
                    {loading ? (
                        <div className="text-center text-gray-400 py-20">Loading accounts...</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <Building2 size={48} className="text-gray-300 mx-auto mb-3"/>
                            <p className="text-gray-400 font-medium">No accounts yet</p>
                            <p className="text-gray-400 text-sm mt-1">Add one manually or convert a lead</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filtered.map(acc => (
                                <div key={acc.id} className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-5 flex flex-col gap-3">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                <Building2 size={20} className="text-orange-500"/>
                                            </div>
                                            <div>
                                                <p className="font-bold text-base">{acc.company}</p>
                                                {acc.industry && <p className="text-xs text-gray-400">{acc.industry}</p>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer" onClick={() => { setEditForm({...acc}); setEditError(""); setShowEditModal(true); }}/>
                                            <Trash2 size={15} className="text-gray-400 hover:text-red-500 hover:cursor-pointer" onClick={() => handleDelete(acc.id)}/>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-col gap-2 text-sm">
                                        {acc.email    && <div className="flex items-center gap-2 text-gray-600"><Mail     size={13} className="text-gray-400 flex-shrink-0"/>{acc.email}</div>}
                                        {acc.phone    && <div className="flex items-center gap-2 text-gray-600"><Phone    size={13} className="text-gray-400 flex-shrink-0"/>{acc.phone}</div>}
                                        {acc.location && <div className="flex items-center gap-2 text-gray-600"><MapPin   size={13} className="text-gray-400 flex-shrink-0"/>{acc.location}</div>}
                                        {acc.website  && <div className="flex items-center gap-2 text-gray-600"><span className="text-gray-400 text-xs flex-shrink-0">🌐</span><a href={acc.website} target="_blank" rel="noreferrer" className="text-orange-500 hover:underline truncate">{acc.website}</a></div>}
                                    </div>

                                    {/* Source badge */}
                                    {acc.source === "converted" && (
                                        <span className="self-start text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 border border-green-200 font-medium">✓ From Converted Lead</span>
                                    )}

                                    <p className="text-xs text-gray-400 mt-1">Added {new Date(acc.createdAt).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}</p>
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

            {/* ── ADD MODAL ── */}
            {showAddModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold">Add Account</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        {addError && <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{addError}</div>}
                        <div className="flex flex-col gap-3">
                            {[["Company Name *","text","company","e.g. BrightWave Innovations"],["Email","email","email","e.g. info@company.com"],["Phone","text","phone","e.g. (193) 7839 748"],["Location","text","location","e.g. Austin, United States"],["Website","text","website","e.g. https://company.com"]].map(([label,type,key,ph])=>(
                                <div key={key}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
                                    <input type={type} placeholder={ph} value={addForm[key]||""} onChange={e=>setAddForm(p=>({...p,[key]:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                </div>
                            ))}
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Industry</label>
                                <select value={addForm.industry} onChange={e=>setAddForm(p=>({...p,industry:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    <option value="">Select industry</option>
                                    {industries.map(i=><option key={i}>{i}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleAdd} disabled={addSaving} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">{addSaving?"Saving...":"Add Account"}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT MODAL ── */}
            {showEditModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold">Edit Account</h2>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        {editError && <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{editError}</div>}
                        <div className="flex flex-col gap-3">
                            {[["Company Name *","text","company",""],["Email","email","email",""],["Phone","text","phone",""],["Location","text","location",""],["Website","text","website",""]].map(([label,type,key,ph])=>(
                                <div key={key}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
                                    <input type={type} placeholder={ph} value={editForm[key]||""} onChange={e=>setEditForm(p=>({...p,[key]:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                </div>
                            ))}
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Industry</label>
                                <select value={editForm.industry||""} onChange={e=>setEditForm(p=>({...p,industry:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    <option value="">Select industry</option>
                                    {industries.map(i=><option key={i}>{i}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleEdit} disabled={editSaving} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">{editSaving?"Saving...":"Save Changes"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Accounts;
