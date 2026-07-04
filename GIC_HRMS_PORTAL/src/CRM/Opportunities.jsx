import Sidebar from "../components/sidebar"
import fullScreen from "./assests_crm/fullscreen.png"
import gridApplication from "./assests_crm/grid-2x2-check.png"
import messageIcon from "./assests_crm/message.png"
import mailIcon from "./assests_crm/mail.png"
import bellIcon from "./assests_crm/bell.png"
import personIcon from "./assests_crm/person9.webp"

import { useState, useEffect } from "react";
import { Menu, X, Plus, Pencil, Trash2, TrendingUp, Building2, ChevronDown } from "lucide-react";

const API = "http://localhost:5000/api/opportunities";

const STAGES = ["Prospecting","Qualification","Proposal","Negotiation","Closed Won","Closed Lost"];
const stageColor = (s) => ({ "Prospecting":"bg-gray-100 text-gray-600 border-gray-200", "Qualification":"bg-blue-100 text-blue-600 border-blue-200", "Proposal":"bg-yellow-100 text-yellow-600 border-yellow-200", "Negotiation":"bg-orange-100 text-orange-600 border-orange-200", "Closed Won":"bg-green-100 text-green-600 border-green-200", "Closed Lost":"bg-red-100 text-red-600 border-red-200" }[s] || "bg-gray-100 text-gray-600 border-gray-200");

function Opportunities() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterStage, setFilterStage] = useState("All");

    const [showAddModal, setShowAddModal] = useState(false);
    const [addForm, setAddForm] = useState({ name:"", company:"", amount:"", stage:"Prospecting", closeDate:"", assignedTo:"", notes:"" });
    const [addError, setAddError] = useState("");
    const [addSaving, setAddSaving] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [editError, setEditError] = useState("");
    const [editSaving, setEditSaving] = useState(false);

    const salesReps = ["Vaughan Iyer","Daksh Rikhari","Shreya Roy","Arjun Mehta","Priya Sharma"];

    const fetchOpportunities = async () => {
        try { const r = await fetch(API); if(r.ok) setOpportunities(await r.json()); } catch {}
        setLoading(false);
    };

    useEffect(() => { fetchOpportunities(); }, []);

    const handleAdd = async () => {
        if (!addForm.name.trim()) { setAddError("Opportunity name is required."); return; }
        setAddSaving(true);
        try {
            const r = await fetch(API, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(addForm) });
            if (!r.ok) { const e = await r.json(); setAddError(e.error||"Failed."); setAddSaving(false); return; }
            await fetchOpportunities();
            setShowAddModal(false);
            setAddForm({ name:"", company:"", amount:"", stage:"Prospecting", closeDate:"", assignedTo:"", notes:"" });
        } catch { setAddError("Could not reach server."); }
        setAddSaving(false);
    };

    const handleEdit = async () => {
        if (!editForm.name?.trim()) { setEditError("Opportunity name is required."); return; }
        setEditSaving(true);
        try {
            const r = await fetch(`${API}/${editForm.id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(editForm) });
            if (!r.ok) { const e = await r.json(); setEditError(e.error||"Failed."); setEditSaving(false); return; }
            await fetchOpportunities();
            setShowEditModal(false);
        } catch { setEditError("Could not reach server."); }
        setEditSaving(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this opportunity?")) return;
        await fetch(`${API}/${id}`, { method:"DELETE" });
        setOpportunities(prev => prev.filter(o => o.id !== id));
    };

    const handleStageChange = async (id, stage) => {
        await fetch(`${API}/${id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ stage }) });
        setOpportunities(prev => prev.map(o => o.id === id ? {...o, stage} : o));
    };

    const filtered = opportunities.filter(o =>
        (filterStage === "All" || o.stage === filterStage) &&
        (o.name?.toLowerCase().includes(search.toLowerCase()) || o.company?.toLowerCase().includes(search.toLowerCase()))
    );

    const totalValue = filtered.filter(o => o.stage === "Closed Won").reduce((sum, o) => sum + (parseFloat(o.amount?.replace(/[^0-9.]/g,"")) || 0), 0);

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

                <div className="mx-3 md:mx-6 mt-5 flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Opportunities</h1>
                        <p className="text-sm text-gray-500 mt-0.5">🏠 &gt; CRM &gt; Opportunities</p>
                    </div>
                    <button onClick={() => { setAddForm({ name:"", company:"", amount:"", stage:"Prospecting", closeDate:"", assignedTo:"", notes:"" }); setAddError(""); setShowAddModal(true); }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:cursor-pointer transition-colors">
                        <Plus size={16}/> Add Opportunity
                    </button>
                </div>

                {/* Stats */}
                <div className="mx-3 md:mx-6 mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[["Total","All",opportunities.length,"bg-blue-50 border-blue-200 text-blue-600"],["Won","Closed Won",opportunities.filter(o=>o.stage==="Closed Won").length,"bg-green-50 border-green-200 text-green-600"],["Lost","Closed Lost",opportunities.filter(o=>o.stage==="Closed Lost").length,"bg-red-50 border-red-200 text-red-600"],["In Progress","",opportunities.filter(o=>!["Closed Won","Closed Lost"].includes(o.stage)).length,"bg-orange-50 border-orange-200 text-orange-600"]].map(([label,,count,cls])=>(
                        <div key={label} className={`border rounded-xl p-3 ${cls}`}>
                            <p className="text-xs font-medium opacity-70">{label}</p>
                            <p className="text-2xl font-bold mt-0.5">{count}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="mx-3 md:mx-6 mt-4 flex gap-3 flex-wrap">
                    <input type="text" placeholder="Search opportunities..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full md:w-64 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"/>
                    <select value={filterStage} onChange={e => setFilterStage(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                        <option>All</option>
                        {STAGES.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>

                {/* List */}
                <div className="mx-3 md:mx-6 mt-5 mb-8 flex flex-col gap-3">
                    {loading ? (
                        <div className="text-center text-gray-400 py-20">Loading opportunities...</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <TrendingUp size={48} className="text-gray-300 mx-auto mb-3"/>
                            <p className="text-gray-400 font-medium">No opportunities yet</p>
                            <p className="text-gray-400 text-sm mt-1">Add one manually or convert a qualified lead</p>
                        </div>
                    ) : filtered.map(opp => (
                        <div key={opp.id} className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4 flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                                    <TrendingUp size={18} className="text-orange-500"/>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-bold text-base">{opp.name}</p>
                                        {opp.source === "converted" && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 border border-green-200">✓ Converted</span>}
                                    </div>
                                    {opp.company && <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5"><Building2 size={12}/>{opp.company}</div>}
                                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                                        {opp.amount     && <span className="text-sm font-semibold text-green-600">{opp.amount}</span>}
                                        {opp.closeDate  && <span className="text-xs text-gray-400">Close: {new Date(opp.closeDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>}
                                        {opp.assignedTo && <span className="text-xs text-gray-400">Assigned: {opp.assignedTo}</span>}
                                    </div>
                                    {opp.notes && <p className="text-xs text-gray-500 mt-1">{opp.notes}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <select value={opp.stage} onChange={e => handleStageChange(opp.id, e.target.value)}
                                    className={`text-xs border rounded-lg px-2 py-1.5 font-medium focus:outline-none hover:cursor-pointer ${stageColor(opp.stage)}`}>
                                    {STAGES.map(s => <option key={s}>{s}</option>)}
                                </select>
                                <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer" onClick={() => { setEditForm({...opp}); setEditError(""); setShowEditModal(true); }}/>
                                <Trash2 size={15} className="text-gray-400 hover:text-red-500 hover:cursor-pointer" onClick={() => handleDelete(opp.id)}/>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex bg-white h-10 border-t border-gray-200 justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>

            {/* ADD MODAL */}
            {showAddModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold">Add Opportunity</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        {addError && <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{addError}</div>}
                        <div className="flex flex-col gap-3">
                            {[["Opportunity Name *","text","name","e.g. Q3 Enterprise Deal"],["Company","text","company","e.g. BrightWave Innovations"],["Deal Amount","text","amount","e.g. $3,50,000"]].map(([label,type,key,ph])=>(
                                <div key={key}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
                                    <input type={type} placeholder={ph} value={addForm[key]||""} onChange={e=>setAddForm(p=>({...p,[key]:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                </div>
                            ))}
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Stage</label>
                                <select value={addForm.stage} onChange={e=>setAddForm(p=>({...p,stage:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    {STAGES.map(s=><option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Assigned To</label>
                                <select value={addForm.assignedTo} onChange={e=>setAddForm(p=>({...p,assignedTo:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    <option value="">Select sales rep</option>
                                    {salesReps.map(r=><option key={r}>{r}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Expected Close Date</label>
                                <input type="date" value={addForm.closeDate} onChange={e=>setAddForm(p=>({...p,closeDate:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Notes</label>
                                <textarea rows={2} value={addForm.notes} onChange={e=>setAddForm(p=>({...p,notes:e.target.value}))} placeholder="Any additional notes..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleAdd} disabled={addSaving} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">{addSaving?"Saving...":"Add Opportunity"}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold">Edit Opportunity</h2>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        {editError && <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{editError}</div>}
                        <div className="flex flex-col gap-3">
                            {[["Opportunity Name *","text","name",""],["Company","text","company",""],["Deal Amount","text","amount",""]].map(([label,type,key,ph])=>(
                                <div key={key}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
                                    <input type={type} placeholder={ph} value={editForm[key]||""} onChange={e=>setEditForm(p=>({...p,[key]:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                </div>
                            ))}
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Stage</label>
                                <select value={editForm.stage||"Prospecting"} onChange={e=>setEditForm(p=>({...p,stage:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    {STAGES.map(s=><option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Assigned To</label>
                                <select value={editForm.assignedTo||""} onChange={e=>setEditForm(p=>({...p,assignedTo:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    <option value="">Select sales rep</option>
                                    {salesReps.map(r=><option key={r}>{r}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Expected Close Date</label>
                                <input type="date" value={editForm.closeDate||""} onChange={e=>setEditForm(p=>({...p,closeDate:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Notes</label>
                                <textarea rows={2} value={editForm.notes||""} onChange={e=>setEditForm(p=>({...p,notes:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"/>
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

export default Opportunities;
