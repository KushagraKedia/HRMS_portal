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
import Leads_details from "./Leads_details"

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { Menu, X, Plus, Pencil, Trash2, Wallet, Mail, Phone, MapPin, MessageCircle, BookOpen } from "lucide-react";

const API = "http://localhost:5000/api/leads";   // ← change port if yours is different

function Leads(){

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const text ="  > CRM > Leads Grid";

    // ── Column state (loaded from backend) ──────────────────────────────────
    const [leadColumns, setLeadColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all columns from backend on first render
    useEffect(() => {
        fetch(`${API}/columns`)
            .then(res => res.json())
            .then(data => { setLeadColumns(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    // ── Add Lead Modal state ─────────────────────────────────────────────────
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeColumnStatus, setActiveColumnStatus] = useState(null);
    const [newLead, setNewLead] = useState({ name: "", value: "", email: "", phone: "", location: "" });
    const [formError, setFormError] = useState("");

    const avatarColors = ["#1AA3E8", "#1F5FE0", "#8E24AA", "#03C95A", "#E53935", "#2E7D32", "#F4B400"];

    const openAddModal = (status) => {
        setActiveColumnStatus(status);
        setNewLead({ name: "", value: "", email: "", phone: "", location: "" });
        setFormError("");
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
        setActiveColumnStatus(null);
    };

    // POST lead → backend, then refresh columns from server
    const handleAddLead = async () => {
        const { name, value, email, phone, location } = newLead;
        if (!name.trim() || !email.trim()) {
            setFormError("Name and Email are required.");
            return;
        }
        const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
        try {
            const res = await fetch(`${API}/columns/${encodeURIComponent(activeColumnStatus)}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), value: value.trim() || "$0", email: email.trim(), phone: phone.trim() || "N/A", location: location.trim() || "N/A", iconBg: randomColor }),
            });
            if (!res.ok) { const e = await res.json(); setFormError(e.error || "Failed to add lead."); return; }
            // Refresh from server so UI matches JSON file exactly
            const updated = await fetch(`${API}/columns`).then(r => r.json());
            setLeadColumns(updated);
            closeAddModal();
        } catch {
            setFormError("Could not reach the server.");
        }
    };

    // ── Add Column Modal state ───────────────────────────────────────────────
    const [showAddColumnModal, setShowAddColumnModal] = useState(false);
    const [newColumn, setNewColumn] = useState({ status: "", color: "#1AA3E8" });
    const [columnError, setColumnError] = useState("");

    const openAddColumnModal = () => {
        setNewColumn({ status: "", color: "#1AA3E8" });
        setColumnError("");
        setShowAddColumnModal(true);
    };

    const closeAddColumnModal = () => setShowAddColumnModal(false);

    // POST new column → backend
    const handleAddColumn = async () => {
        if (!newColumn.status.trim()) { setColumnError("Column name is required."); return; }
        try {
            const res = await fetch(`${API}/columns`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newColumn.status.trim(), color: newColumn.color }),
            });
            if (!res.ok) { const e = await res.json(); setColumnError(e.error || "Failed to create column."); return; }
            const updated = await fetch(`${API}/columns`).then(r => r.json());
            setLeadColumns(updated);
            closeAddColumnModal();
        } catch {
            setColumnError("Could not reach the server.");
        }
    };

    // DELETE column → backend
    const handleDeleteColumn = async (status) => {
        if (!window.confirm(`Delete the "${status}" column and all its leads?`)) return;
        try {
            await fetch(`${API}/columns/${encodeURIComponent(status)}`, { method: "DELETE" });
            const updated = await fetch(`${API}/columns`).then(r => r.json());
            setLeadColumns(updated);
        } catch {
            alert("Could not reach the server.");
        }
    };

    // ── Drag-and-drop ────────────────────────────────────────────────────────
    // 2) Track which lead is currently being dragged, and which column it came from.
    const [draggedLead, setDraggedLead] = useState(null); // { lead, sourceStatus }

    // 3) Fired on the card the user starts dragging.
    const handleDragStart = (lead, sourceStatus) => {
        setDraggedLead({ lead, sourceStatus });
    };

    // 4) Fired continuously while a dragged card hovers over a column.
    //    preventDefault() is REQUIRED — by default, browsers block dropping
    //    anything anywhere. This line is what makes the column a valid drop target.
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 5) Fired when the user releases the card over a column.
    const handleDrop = (targetStatus) => {
        if (!draggedLead) return;

        const { lead, sourceStatus } = draggedLead;

        if (sourceStatus === targetStatus) {
            setDraggedLead(null);
            return;
        }

        // Optimistic UI update
        setLeadColumns((prevColumns) =>
            prevColumns.map((column) => {
                if (column.status === sourceStatus) {
                    return { ...column, leads: column.leads.filter((l) => l.email !== lead.email), count: column.count - 1 };
                }
                if (column.status === targetStatus) {
                    return { ...column, leads: [...column.leads, lead], count: column.count + 1 };
                }
                return column;
            })
        );

        // Persist move to backend (fire-and-forget — optimistic update already applied)
        fetch(`${API}/move`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: lead.email, fromStatus: sourceStatus, toStatus: targetStatus }),
        }).catch(() => console.warn("Failed to persist drag-drop move to server."));

        setDraggedLead(null);
    };

    return(
        <div className="flex h-screen overflow-hidden">

            {sidebarOpen && (
                 <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>
            )}

            <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"> <Menu size={22} /> </button>

                {/* Sidebar */}
                <div className={`fixed lg:static top-0 left-0 z-50 h-screen transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                    <div className="relative h-full">
                        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 lg:hidden z-50"><X size={22} /></button>
                        <Sidebar />
                    </div>
                </div>             

            <div className="w-full bg-[#F8F9FA] text-black flex-1 h-screen overflow-y-auto">

                {/* Navbar */}
                <div className="w-full border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 flex items-center justify-between p-3 bg-white">
                    <div>
                        <span className="ml-12 md:ml-10 text-2xl md:text-4xl font-bold">GIC FOLKS</span>
                    </div>
                    <div className="flex gap-2 md:gap-4 mr-2 md:mr-5">
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer hidden md:block">
                            <img src={fullScreen} alt="full" className="h-4 w-4 "/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer hidden md:block">
                            <img src={gridApplication} alt="grid" className="h-4 w-4 "/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer">
                            <img src={messageIcon} alt="message" className="h-4 w-4 "/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer hidden md:block">
                            <img src={mailIcon} alt="mail" className="h-4 w-4 "/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer">
                            <img src={bellIcon} alt="notification" className="h-4 w-4 "/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-full hover:cursor-pointer">
                            <img src={personIcon} alt="person" className="h-7 w-7 rounded-full"/>
                        </button>
                    </div>
                </div>

                <div className="mx-3 md:mx-5">

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:h-20 py-3 md:py-0">
                        <div className="md:w-[40%] pl-2 md:pl-7 flex flex-col py-2 md:py-5 justify-between">
                            <div className="text-2xl md:text-3xl font-semibold">Leads</div>
                            <div className="flex items-center text-sm"><img src={homeIcon} alt="home" className="h-3 w-3"/><span className="pl-1.5">{text}</span></div>
                        </div>
                        <div className="md:w-[60%] flex items-center gap-2 md:gap-4 justify-start md:justify-end mt-3 md:mt-0 flex-wrap">
                            <div className="flex p-2 bg-white rounded-lg border border-gray-200 gap-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
                                <img src={list} alt="icon" className="h-4 w-4 hover:bg-orange-400 rounded hover:cursor-pointer" />
                                <img src={grid} alt="icon" className="h-4 w-4 hover:bg-orange-400 rounded hover:cursor-pointer" />
                            </div>                            
                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-[#f3f0f0] text-sm">
                                <img src={exportIcon} alt="export" className="h-4 w-4"/>
                                <span>Export</span>
                                <img src={arrowIcon} alt="arrow" className="h-4 w-4"/>
                            </button>
                            <button onClick={openAddColumnModal} className="bg-orange-500 rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-600">
                                <img src={plusIcon} alt="export" className="h-4 w-4"/>
                                <span className="text-white font-semibold text-sm">Add Column</span>
                            </button>
                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-500">
                                <img src={upArrowIcon} alt="export" className="h-4 w-4 m-1"/>
                            </button>
                        </div>
                    </div>

                    {/* Leads Grid Header */}
                    <div className="flex flex-col md:flex-row w-full min-h-16 md:h-20 items-start md:items-center border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 bg-white rounded-lg p-3 gap-3 md:gap-0 my-8">
                        <div className="w-full md:w-[40%] font-semibold text-xl md:text-2xl">Leads Grid</div>
                        <div className="w-full md:w-[60%] flex items-center justify-start md:justify-end gap-2 md:gap-3 flex-wrap">
                            <button className="border-gray-200 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] py-2 px-3 flex items-center gap-1 hover:cursor-pointer hover:bg-[#f3f0f0] text-xs">
                                <span>Sort By: Last 7 Days</span>
                                <img src={arrowIcon} alt="arrow" className="h-4 w-4"/>
                            </button>
                        </div>
                    </div>

                    {/* STATUS COLUMNS GRID */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading columns...</div>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pb-8">
                        {leadColumns.map((column) => (
                            <div
                                key={column.status}
                                className="flex flex-col gap-4 rounded-lg transition-colors"
                                // 6) Make the WHOLE column a drop zone
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(column.status)}
                            >

                                {/* Column Header */}
                                <div className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-3 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: column.color }}></span>
                                            <span className="font-semibold text-sm md:text-base">{column.status}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {String(column.count).padStart(2, "0")} Leads - {column.total}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <Plus size={16} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" onClick={() => openAddModal(column.status)} />
                                        <Pencil size={14} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                                        <Trash2 size={14} className="text-gray-500 hover:text-red-500 hover:cursor-pointer" onClick={() => handleDeleteColumn(column.status)} />
                                    </div>
                                </div>

                                {/* Minimum drop area height so empty columns are still droppable */}
                                <div className="flex flex-col gap-4 min-h-[80px]">
                                    {/* Lead Cards */}
                                    {column.leads.map((lead) => (
                                        <div
                                            key={lead.email}
                                            className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] overflow-hidden cursor-grab active:cursor-grabbing"
                                            // 7) Make the card itself draggable
                                            draggable
                                            onDragStart={() => handleDragStart(lead, column.status)}
                                        >
                                            <div className="h-1" style={{ backgroundColor: column.color }}></div>
                                            <div className="p-3 md:p-4">

                                                {/* ICON And Name */}
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                                        {lead.initials}
                                                    </div>
                                                    <Link to="/CRM/Leads_details"  className="font-semibold text-sm md:text-base hover:text-blue-800">{lead.name}</Link>
                                                </div>

                                                {/* DETAILS */}
                                                <div className="flex flex-col gap-1.5 text-xs md:text-sm text-gray-600">

                                                    <div className="flex items-center gap-2">
                                                        <Wallet size={14} className="text-gray-400 flex-shrink-0" />
                                                        <span>{lead.value}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Mail size={14} className="text-gray-400 flex-shrink-0" />
                                                        <span className="truncate">{lead.email}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Phone size={14} className="text-gray-400 flex-shrink-0" />
                                                        <span>{lead.phone}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                                                        <span className="truncate">{lead.location}</span>
                                                    </div>
                                                </div>

                                                {/* FOOTER */}
                                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: lead.iconBg }}>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Phone size={15} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                                                        <MessageCircle size={15} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                                                        <BookOpen size={15} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
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

                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Add New Lead</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Adding to: <span className="font-semibold text-orange-500">{activeColumnStatus}</span></p>
                            </div>
                            <button onClick={closeAddModal} className="text-gray-400 hover:text-red-500 hover:cursor-pointer transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Error */}
                        {formError && (
                            <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                {formError}
                            </div>
                        )}

                        {/* Form Fields */}
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. John Smith"
                                    value={newLead.name}
                                    onChange={e => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    placeholder="e.g. john@gmail.com"
                                    value={newLead.email}
                                    onChange={e => setNewLead(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Deal Value</label>
                                <input
                                    type="text"
                                    placeholder="e.g. $3,50,000"
                                    value={newLead.value}
                                    onChange={e => setNewLead(prev => ({ ...prev, value: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone</label>
                                <input
                                    type="text"
                                    placeholder="e.g. (193) 7839 748"
                                    value={newLead.phone}
                                    onChange={e => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Austin, United States"
                                    value={newLead.location}
                                    onChange={e => setNewLead(prev => ({ ...prev, location: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={closeAddModal}
                                className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddLead}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={15} />
                                Add Lead
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── ADD COLUMN MODAL ── */}
            {showAddColumnModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative">

                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Add New Column</h2>
                            <button onClick={closeAddColumnModal} className="text-gray-400 hover:text-red-500 hover:cursor-pointer transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {columnError && (
                            <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                {columnError}
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Column Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. In Progress"
                                    value={newColumn.status}
                                    onChange={e => setNewColumn(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Column Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={newColumn.color}
                                        onChange={e => setNewColumn(prev => ({ ...prev, color: e.target.value }))}
                                        className="w-10 h-10 rounded-lg border border-gray-200 hover:cursor-pointer p-0.5"
                                    />
                                    <span className="text-sm text-gray-500">{newColumn.color}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={closeAddColumnModal}
                                className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddColumn}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={15} />
                                Create Column
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Leads;
