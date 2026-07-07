import Sidebar from "../components/sidebar"
import fullScreen from "./assests_crm/fullscreen.png"
import gridApplication from "./assests_crm/grid-2x2-check.png"
import messageIcon from "./assests_crm/message.png"
import mailIcon from "./assests_crm/mail.png"
import bellIcon from "./assests_crm/bell.png"
import personIcon from "./assests_crm/person9.webp"
import homeIcon from "./assests_crm/home.png"
import exportIcon from "./assests_crm/export.png"
import arrowIcon from "./assests_crm/downArrow.png"
import plusIcon from "./assests_crm/circle-plus.png"
import upArrowIcon from "./assests_crm/upArrow.png"
import grid from "./assests_crm/grid-2x2.png"
import list from "./assests_crm/list.png"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Plus, Pencil, Trash2, Wallet, Mail, Phone, MapPin, MessageCircle, BookOpen, UserCheck } from "lucide-react";

const API      = "http://localhost:5000/api/leads";
const AUTH_API = "http://localhost:5000/api/auth";

function Leads(){
    const navigate    = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("gic_user") || "{}");
    const isAdmin     = currentUser.role === "admin";

    // Redirect to login if not logged in
    useEffect(() => {
        if (!currentUser.id) navigate("/");
    }, []);

    const authHeaders = { "Content-Type": "application/json", "x-user-id": currentUser.id };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const text = "  > CRM > Leads Grid";

    // ── Staff list (for admin assignment dropdown) ───────────────────────────
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        if (isAdmin) {
            fetch(`${AUTH_API}/staff`, { headers: authHeaders })
                .then(r => r.json())
                .then(d => { if (Array.isArray(d)) setStaffList(d); })
                .catch(() => {});
        }
    }, []);

    // ── Column state ─────────────────────────────────────────────────────────
    const [leadColumns, setLeadColumns] = useState([]);
    const [loading,     setLoading]     = useState(true);

    const fetchColumns = async () => {
        try {
            // Admin sees all leads, staff sees only assigned leads
            const url = isAdmin
                ? `${API}/columns?adminId=${currentUser.adminId}`
                : `${API}/columns?adminId=${currentUser.adminId}&assignedTo=${encodeURIComponent(currentUser.name)}`;
            const res  = await fetch(url, { headers: authHeaders });
            const data = await res.json();
            setLeadColumns(Array.isArray(data) ? data : []);
        } catch { setLeadColumns([]); }
        setLoading(false);
    };

    useEffect(() => { fetchColumns(); }, []);

    // ── Add Lead Modal ───────────────────────────────────────────────────────
    const [showAddModal,      setShowAddModal]      = useState(false);
    const [activeColumnStatus,setActiveColumnStatus]= useState(null);
    const [newLead,           setNewLead]           = useState({ name:"", value:"", email:"", phone:"", location:"", assignedTo:"" });
    const [formError,         setFormError]         = useState("");

    const avatarColors = ["#1AA3E8","#1F5FE0","#8E24AA","#03C95A","#E53935","#2E7D32","#F4B400"];

    const openAddModal = (status) => {
        setActiveColumnStatus(status);
        setNewLead({ name:"", value:"", email:"", phone:"", location:"", assignedTo: isAdmin ? "" : currentUser.name });
        setFormError("");
        setShowAddModal(true);
    };

    const closeAddModal = () => { setShowAddModal(false); setActiveColumnStatus(null); };

    const handleAddLead = async () => {
        const { name, value, email, phone, location, assignedTo } = newLead;
        if (!name.trim() || !email.trim()) { setFormError("Name and Email are required."); return; }
        if (isAdmin && !assignedTo) { setFormError("Please assign this lead to a staff member."); return; }

        const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
        try {
            const res = await fetch(`${API}/columns/${encodeURIComponent(activeColumnStatus)}/leads`, {
                method:  "POST",
                headers: authHeaders,
                body:    JSON.stringify({
                    name: name.trim(), value: value.trim() || "$0",
                    email: email.trim(), phone: phone.trim() || "N/A",
                    location: location.trim() || "N/A", iconBg: randomColor,
                    assignedTo: isAdmin ? assignedTo : currentUser.name,
                    adminId: currentUser.adminId,
                    createdBy: currentUser.name
                }),
            });
            if (!res.ok) { const e = await res.json(); setFormError(e.error || "Failed to add lead."); return; }
            await fetchColumns();
            closeAddModal();
        } catch { setFormError("Could not reach the server."); }
    };

    // ── Add Column Modal ─────────────────────────────────────────────────────
    const [showAddColumnModal, setShowAddColumnModal] = useState(false);
    const [newColumn,          setNewColumn]          = useState({ status:"", color:"#1AA3E8" });
    const [columnError,        setColumnError]        = useState("");

    const handleAddColumn = async () => {
        if (!newColumn.status.trim()) { setColumnError("Column name is required."); return; }
        try {
            const res = await fetch(`${API}/columns`, {
                method: "POST", headers: authHeaders,
                body: JSON.stringify({ status: newColumn.status.trim(), color: newColumn.color, adminId: currentUser.adminId }),
            });
            if (!res.ok) { const e = await res.json(); setColumnError(e.error || "Failed."); return; }
            await fetchColumns();
            setShowAddColumnModal(false);
            setNewColumn({ status:"", color:"#1AA3E8" });
        } catch { setColumnError("Could not reach the server."); }
    };

    // ── Edit Column Modal ────────────────────────────────────────────────────
    const [showEditColumnModal, setShowEditColumnModal] = useState(false);
    const [editingColumn,       setEditingColumn]       = useState(null);
    const [editColumnForm,      setEditColumnForm]      = useState({ status:"", color:"" });
    const [editColumnError,     setEditColumnError]     = useState("");
    const [editColumnSaving,    setEditColumnSaving]    = useState(false);

    const openEditColumn = (column) => { setEditingColumn(column); setEditColumnForm({ status: column.status, color: column.color }); setEditColumnError(""); setShowEditColumnModal(true); };

    const handleEditColumn = async () => {
        if (!editColumnForm.status.trim()) { setEditColumnError("Column name is required."); return; }
        setEditColumnSaving(true);
        try {
            const res = await fetch(`${API}/columns/${encodeURIComponent(editingColumn.status)}`, {
                method: "PATCH", headers: authHeaders,
                body: JSON.stringify({ status: editColumnForm.status.trim(), color: editColumnForm.color }),
            });
            if (!res.ok) { const e = await res.json(); setEditColumnError(e.error || "Failed."); setEditColumnSaving(false); return; }
            await fetchColumns();
            setShowEditColumnModal(false);
        } catch { setEditColumnError("Could not reach the server."); }
        setEditColumnSaving(false);
    };

    // ── Delete Column ────────────────────────────────────────────────────────
    const handleDeleteColumn = async (status) => {
        if (!window.confirm(`Delete the "${status}" column and all its leads?`)) return;
        try {
            await fetch(`${API}/columns/${encodeURIComponent(status)}`, { method: "DELETE", headers: authHeaders });
            await fetchColumns();
        } catch { alert("Could not reach the server."); }
    };

    // ── Drag and Drop ────────────────────────────────────────────────────────
    const [draggedLead, setDraggedLead] = useState(null);

    const handleDragStart = (lead, sourceStatus) => { setDraggedLead({ lead, sourceStatus }); };
    const handleDragOver  = (e) => { e.preventDefault(); };

    const handleDrop = (targetStatus) => {
        if (!draggedLead) return;
        const { lead, sourceStatus } = draggedLead;
        if (sourceStatus === targetStatus) { setDraggedLead(null); return; }

        // Staff can only drag their own assigned leads
        if (!isAdmin && lead.assignedTo !== currentUser.name) { setDraggedLead(null); return; }

        setLeadColumns(prev => prev.map(col => {
            if (col.status === sourceStatus) return { ...col, leads: col.leads.filter(l => l.email !== lead.email), count: col.count - 1 };
            if (col.status === targetStatus) return { ...col, leads: [...col.leads, lead], count: col.count + 1 };
            return col;
        }));

        fetch(`${API}/move`, {
            method: "PATCH", headers: authHeaders,
            body: JSON.stringify({ email: lead.email, fromStatus: sourceStatus, toStatus: targetStatus }),
        }).catch(() => {});

        setDraggedLead(null);
    };

    const handleLogout = () => { localStorage.removeItem("gic_user"); navigate("/"); };

    return(
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
                    <div><span className="ml-12 md:ml-10 text-2xl md:text-4xl font-bold">GIC FOLKS</span></div>
                    <div className="flex gap-2 md:gap-4 mr-2 md:mr-5 items-center">
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={fullScreen} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={gridApplication} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer"><img src={messageIcon} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={mailIcon} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer"><img src={bellIcon} alt="" className="h-4 w-4"/></button>

                        {/* Show who is logged in */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-lg">
                            <span className="text-xs font-semibold text-orange-600">{currentUser.name}</span>
                            <span className="text-xs text-gray-400">({isAdmin ? "Admin" : "Staff"})</span>
                        </div>

                        <button onClick={handleLogout} className="text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:cursor-pointer transition-colors hidden md:block">
                            Logout
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-full hover:cursor-pointer"><img src={personIcon} alt="" className="h-7 w-7 rounded-full"/></button>
                    </div>
                </div>

                <div className="mx-3 md:mx-5">

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:h-20 py-3 md:py-0">
                        <div className="md:w-[40%] pl-2 md:pl-7 flex flex-col py-2 md:py-5 justify-between">
                            <div className="text-2xl md:text-3xl font-semibold">Leads</div>
                            <div className="flex items-center text-sm"><img src={homeIcon} alt="" className="h-3 w-3"/><span className="pl-1.5">{text}</span></div>
                        </div>
                        <div className="md:w-[60%] flex items-center gap-2 md:gap-4 justify-start md:justify-end mt-3 md:mt-0 flex-wrap">
                            <div className="flex p-2 bg-white rounded-lg border border-gray-200 gap-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
                                <img src={list} alt="" className="h-4 w-4 hover:bg-orange-400 rounded hover:cursor-pointer"/>
                                <img src={grid} alt="" className="h-4 w-4 hover:bg-orange-400 rounded hover:cursor-pointer"/>
                            </div>
                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-[#f3f0f0] text-sm">
                                <img src={exportIcon} alt="" className="h-4 w-4"/>
                                <span>Export</span>
                                <img src={arrowIcon} alt="" className="h-4 w-4"/>
                            </button>
                            {/* Only admin can add columns */}
                            {isAdmin && (
                                <button onClick={() => { setNewColumn({ status:"", color:"#1AA3E8" }); setColumnError(""); setShowAddColumnModal(true); }}
                                    className="bg-orange-500 rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-600">
                                    <img src={plusIcon} alt="" className="h-4 w-4"/>
                                    <span className="text-white font-semibold text-sm">Add Column</span>
                                </button>
                            )}
                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-500">
                                <img src={upArrowIcon} alt="" className="h-4 w-4 m-1"/>
                            </button>
                        </div>
                    </div>

                    {/* Leads Grid Header */}
                    <div className="flex flex-col md:flex-row w-full min-h-16 md:h-20 items-start md:items-center border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 bg-white rounded-lg p-3 gap-3 md:gap-0 my-8">
                        <div className="w-full md:w-[40%] font-semibold text-xl md:text-2xl">
                            {isAdmin ? "Leads Grid (All)" : `My Assigned Leads`}
                        </div>
                        <div className="w-full md:w-[60%] flex items-center justify-start md:justify-end gap-2 md:gap-3 flex-wrap">
                            <button className="border-gray-200 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] py-2 px-3 flex items-center gap-1 hover:cursor-pointer hover:bg-[#f3f0f0] text-xs">
                                <span>Sort By: Last 7 Days</span>
                                <img src={arrowIcon} alt="" className="h-4 w-4"/>
                            </button>
                        </div>
                    </div>

                    {/* STATUS COLUMNS GRID */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading columns...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pb-8">
                            {leadColumns.map((column) => (
                                <div key={column.status} className="flex flex-col gap-4 rounded-lg transition-colors"
                                    onDragOver={handleDragOver} onDrop={() => handleDrop(column.status)}>

                                    {/* Column Header */}
                                    <div className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-3 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: column.color }}></span>
                                                <span className="font-semibold text-sm md:text-base">{column.status}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {String(column.count).padStart(2,"0")} Leads - {column.total}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Plus size={16} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" onClick={() => openAddModal(column.status)}/>
                                            {/* Only admin can edit/delete columns */}
                                            {isAdmin && <>
                                                <Pencil size={14} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" onClick={() => openEditColumn(column)}/>
                                                <Trash2 size={14} className="text-gray-500 hover:text-red-500 hover:cursor-pointer" onClick={() => handleDeleteColumn(column.status)}/>
                                            </>}
                                        </div>
                                    </div>

                                    {/* Lead Cards */}
                                    <div className="flex flex-col gap-4 min-h-[80px]">
                                        {column.leads.map((lead) => (
                                            <div key={lead.email}
                                                className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] overflow-hidden cursor-grab active:cursor-grabbing"
                                                draggable onDragStart={() => handleDragStart(lead, column.status)}>
                                                <div className="h-1" style={{ backgroundColor: column.color }}></div>
                                                <div className="p-3 md:p-4">

                                                    {/* Name + assigned badge */}
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                                            {lead.initials}
                                                        </div>
                                                        <div className="flex flex-col flex-1 min-w-0">
                                                            <button onClick={() => navigate("/CRM/Leads_details", { state: { lead, columnStatus: column.status, columnColor: column.color } })}
                                                                className="font-semibold text-sm md:text-base hover:text-orange-500 hover:cursor-pointer text-left truncate">
                                                                {lead.name}
                                                            </button>
                                                            {lead.assignedTo && (
                                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                                    <UserCheck size={10}/> {lead.assignedTo}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex flex-col gap-1.5 text-xs md:text-sm text-gray-600">
                                                        <div className="flex items-center gap-2"><Wallet size={14} className="text-gray-400 flex-shrink-0"/><span>{lead.value}</span></div>
                                                        <div className="flex items-center gap-2"><Mail   size={14} className="text-gray-400 flex-shrink-0"/><span className="truncate">{lead.email}</span></div>
                                                        <div className="flex items-center gap-2"><Phone  size={14} className="text-gray-400 flex-shrink-0"/><span>{lead.phone}</span></div>
                                                        <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400 flex-shrink-0"/><span className="truncate">{lead.location}</span></div>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                                        <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ backgroundColor: lead.iconBg }}></div>
                                                        <div className="flex items-center gap-3">
                                                            <Phone        size={15} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer"/>
                                                            <MessageCircle size={15} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer"/>
                                                            <BookOpen     size={15} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>

            {/* ── ADD LEAD MODAL ── */}
            {showAddModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Add New Lead</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Adding to: <span className="font-semibold text-orange-500">{activeColumnStatus}</span></p>
                            </div>
                            <button onClick={closeAddModal} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>

                        {formError && <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</div>}

                        <div className="flex flex-col gap-3">
                            {[["Full Name","text","name","e.g. John Smith",true],["Email","email","email","e.g. john@gmail.com",true],["Deal Value","text","value","e.g. $3,50,000",false],["Phone","text","phone","e.g. (193) 7839 748",false],["Location","text","location","e.g. Austin, United States",false]].map(([label,type,key,ph,req])=>(
                                <div key={key}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}{req&&<span className="text-red-500"> *</span>}</label>
                                    <input type={type} placeholder={ph} value={newLead[key]||""}
                                        onChange={e=>setNewLead(p=>({...p,[key]:e.target.value}))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                </div>
                            ))}

                            {/* Assign to staff — admin only, required */}
                            {isAdmin && (
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Assign To <span className="text-red-500">*</span></label>
                                    {staffList.length === 0 ? (
                                        <div className="text-xs text-orange-500 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                                            No staff members yet. <a href="/Admin/ManageStaff" className="underline font-semibold">Create staff first →</a>
                                        </div>
                                    ) : (
                                        <select value={newLead.assignedTo} onChange={e=>setNewLead(p=>({...p,assignedTo:e.target.value}))}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                            <option value="">Select a staff member...</option>
                                            {staffList.map(s=><option key={s.id} value={s.name}>{s.name} — {s.email}</option>)}
                                        </select>
                                    )}
                                </div>
                            )}

                            {/* Staff sees their own name auto-assigned */}
                            {!isAdmin && (
                                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                                    <UserCheck size={14} className="text-blue-500 flex-shrink-0"/>
                                    <span className="text-xs text-blue-600">This lead will be assigned to you: <strong>{currentUser.name}</strong></span>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={closeAddModal} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleAddLead} className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer flex items-center justify-center gap-2">
                                <Plus size={15}/> Add Lead
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── ADD COLUMN MODAL ── */}
            {showAddColumnModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Add New Column</h2>
                            <button onClick={() => setShowAddColumnModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        {columnError && <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{columnError}</div>}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Column Name <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="e.g. In Progress" value={newColumn.status}
                                    onChange={e=>setNewColumn(p=>({...p,status:e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Column Color</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" value={newColumn.color} onChange={e=>setNewColumn(p=>({...p,color:e.target.value}))} className="w-10 h-10 rounded-lg border border-gray-200 hover:cursor-pointer p-0.5"/>
                                    <span className="text-sm text-gray-500">{newColumn.color}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowAddColumnModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleAddColumn} className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer flex items-center justify-center gap-2">
                                <Plus size={15}/> Create Column
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT COLUMN MODAL ── */}
            {showEditColumnModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Edit Column</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Editing: <span className="font-semibold text-orange-500">{editingColumn?.status}</span></p>
                            </div>
                            <button onClick={() => setShowEditColumnModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        {editColumnError && <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{editColumnError}</div>}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Column Name <span className="text-red-500">*</span></label>
                                <input type="text" value={editColumnForm.status} onChange={e=>setEditColumnForm(p=>({...p,status:e.target.value}))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Column Color</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" value={editColumnForm.color} onChange={e=>setEditColumnForm(p=>({...p,color:e.target.value}))} className="w-10 h-10 rounded-lg border border-gray-200 hover:cursor-pointer p-0.5"/>
                                    <span className="text-sm text-gray-500">{editColumnForm.color}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowEditColumnModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleEditColumn} disabled={editColumnSaving} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">
                                {editColumnSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Leads;
