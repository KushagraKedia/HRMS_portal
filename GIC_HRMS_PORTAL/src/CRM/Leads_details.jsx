import Sidebar from "../components/sidebar"
import fullScreen from "./assests_crm/fullscreen.png"
import gridApplication from "./assests_crm/grid-2x2-check.png"
import messageIcon from "./assests_crm/message.png"
import mailIcon from "./assests_crm/mail.png"
import bellIcon from "./assests_crm/bell.png"
import personIcon from "./assests_crm/person9.webp"
import ownerAvatar from "./assests_crm/person-m-1.webp"
import contactAvatar from "./assests_crm/person-f-1.webp"
import modifiedAvatar from "./assests_crm/person-m-2.webp"
import meetingAvatar from "./assests_crm/person-m-3.webp"

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Star, Lock, ChevronDown, Pencil, Trash2, Phone, MessageCircle, FileText, Mail, CalendarDays, Link2, UserCircle2, Plus, ArrowLeft, CheckCircle2, XCircle, Clock, MapPin, Activity } from "lucide-react";

const API = "http://localhost:5000/api/leads";

function Leads_details(){
    const { state } = useLocation();
    const navigate  = useNavigate();
    const leadData     = state?.lead         || {};
    const columnStatus = state?.columnStatus || "Unknown";
    const columnColor  = state?.columnColor  || "#1AA3E8";

    // ── Lead fields (editable) ───────────────────────────────────────────────
    const [name,     setName]     = useState(leadData.name     || "Unknown Lead");
    const [email]                 = useState(leadData.email    || "N/A");
    const [phone,    setPhone]    = useState(leadData.phone    || "N/A");
    const [location, setLocation] = useState(leadData.location || "N/A");
    const [value,    setValue]    = useState(leadData.value    || "$0");
    const [iconBg]                = useState(leadData.iconBg   || "#1AA3E8");
    const [leadStatus, setLeadStatus] = useState(leadData.leadOutcome || null); // Converted | Nurture | Junk | Dead

    const initials = name.trim().split(' ').map(w => w[0]?.toUpperCase()).slice(0, 2).join('');

    // ── UI state ─────────────────────────────────────────────────────────────
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab,   setActiveTab]   = useState("Activities");

    // ── Edit Lead modal ──────────────────────────────────────────────────────
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm,      setEditForm]      = useState({});
    const [editError,     setEditError]     = useState("");
    const [saving,        setSaving]        = useState(false);

    const openEdit = () => { setEditForm({ name, phone, location, value }); setEditError(""); setShowEditModal(true); };

    const handleSave = async () => {
        if (!editForm.name?.trim()) { setEditError("Name is required."); return; }
        setSaving(true);
        try {
            const res = await fetch(`${API}/columns/${encodeURIComponent(columnStatus)}/leads/${encodeURIComponent(email)}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) });
            if (!res.ok) { const e = await res.json(); setEditError(e.error || "Failed to save."); setSaving(false); return; }
            setName(editForm.name.trim());
            setPhone(editForm.phone?.trim() || phone);
            setLocation(editForm.location?.trim() || location);
            setValue(editForm.value?.trim() || value);
            setShowEditModal(false);
        } catch { setEditError("Could not reach the server."); }
        setSaving(false);
    };

    // ── Qualify / Outcome modal ──────────────────────────────────────────────
    const [showQualifyModal,  setShowQualifyModal]  = useState(false);
    const [showConvertModal,  setShowConvertModal]  = useState(false);
    const [convertForm,       setConvertForm]       = useState({ company: "", opportunity: "", amount: value, stage: "Qualification", assignedRep: "" });
    const [convertSaving,     setConvertSaving]     = useState(false);
    const [disqualifyReason,  setDisqualifyReason]  = useState("No Budget");
    const [showDisqualifyModal, setShowDisqualifyModal] = useState(false);

    // Existing accounts for dropdown
    const [existingAccounts, setExistingAccounts] = useState([]);
    const opportunityStages = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won"];

    const openConvertModal = async () => {
        setShowQualifyModal(false);
        // Fetch existing accounts to populate dropdown
        try {
            const r = await fetch("http://localhost:5000/api/accounts");
            if (r.ok) setExistingAccounts(await r.json());
        } catch { setExistingAccounts([]); }
        setConvertForm({ company: "", isNewCompany: true, opportunity: `${name} Deal`, amount: value, stage: "Qualification", assignedRep: assignedTo || "" });
        setShowConvertModal(true);
    };

    const handleSetOutcome = async (outcome) => {
        try {
            await fetch(`${API}/columns/${encodeURIComponent(columnStatus)}/leads/${encodeURIComponent(email)}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leadOutcome: outcome }) });
            setLeadStatus(outcome);
        } catch { alert("Could not reach server."); }
        setShowQualifyModal(false);
        setShowDisqualifyModal(false);
    };

    // ── Lead Assignment Engine ───────────────────────────────────────────────
    const salesReps = ["Vaughan Iyer", "Daksh Rikhari", "Shreya Roy", "Arjun Mehta", "Priya Sharma"];
    const [assignedTo, setAssignedTo] = useState(leadData.assignedTo || "");
    const [assignSaving, setAssignSaving] = useState(false);

    const handleAssign = async (rep) => {
        setAssignedTo(rep);
        setAssignSaving(true);
        try {
            await fetch(`${API}/columns/${encodeURIComponent(columnStatus)}/leads/${encodeURIComponent(email)}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ assignedTo: rep }) });
        } catch { /* silent */ }
        setAssignSaving(false);
    };

    const handleConvert = async () => {
        setConvertSaving(true);
        try {
            // 1. Update lead outcome
            await fetch(`${API}/columns/${encodeURIComponent(columnStatus)}/leads/${encodeURIComponent(email)}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leadOutcome: "Converted", convertedData: convertForm }) });

            // 2. Create Account (only if new)
            if (convertForm.isNewCompany && convertForm.company.trim()) {
                await fetch("http://localhost:5000/api/accounts", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ company: convertForm.company.trim(), email, phone, location, source: "converted" })
                });
            }

            // 3. Create Contact
            await fetch("http://localhost:5000/api/contacts", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, location, company: convertForm.company || "", iconBg, source: "converted" })
            });

            // 4. Create Opportunity
            await fetch("http://localhost:5000/api/opportunities", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: convertForm.opportunity || `${name} Deal`, company: convertForm.company || name, amount: convertForm.amount || value, stage: convertForm.stage || "Qualification", assignedTo: convertForm.assignedRep || assignedTo, source: "converted" })
            });

            setLeadStatus("Converted");
            setShowConvertModal(false);
        } catch { alert("Could not reach server."); }
        setConvertSaving(false);
    };

    // ── Notes ────────────────────────────────────────────────────────────────
    const [notes,       setNotes]       = useState([]);
    const [noteText,    setNoteText]    = useState("");
    const [editingNote, setEditingNote] = useState(null);
    const [noteSaving,  setNoteSaving]  = useState(false);

    // ── Calls ────────────────────────────────────────────────────────────────
    const [calls,      setCalls]      = useState([]);
    const [callNote,   setCallNote]   = useState("");
    const [callStatus, setCallStatus] = useState("Answered");
    const [callType,   setCallType]   = useState("Call");
    const [callSaving, setCallSaving] = useState(false);
    const callStatuses = ["Answered", "Busy", "No Answer", "Left Voicemail"];
    const callTypes    = ["Call", "Visit"];

    // ── Files ────────────────────────────────────────────────────────────────
    const [files,          setFiles]          = useState([]);
    const [showFileModal,  setShowFileModal]  = useState(false);
    const [fileForm,       setFileForm]       = useState({ title: "", description: "", type: "Proposal", owner: name });
    const [fileSaving,     setFileSaving]     = useState(false);

    // ── Follow-up ────────────────────────────────────────────────────────────
    const [showFollowUpModal,  setShowFollowUpModal]  = useState(false);
    const [followUpForm,       setFollowUpForm]       = useState({ date: "", time: "", note: "", priority: "Medium" });
    const [followUps,          setFollowUps]          = useState([]);
    const [followUpSaving,     setFollowUpSaving]     = useState(false);

    // ── Tab fetch ────────────────────────────────────────────────────────────
    const fetchTab = async (tab) => {
        try {
            if (tab === "Notes")     { const r = await fetch(`${API}/lead/${encodeURIComponent(email)}/notes`);    if(r.ok) setNotes(await r.json()); }
            if (tab === "Calls")     { const r = await fetch(`${API}/lead/${encodeURIComponent(email)}/calls`);    if(r.ok) setCalls(await r.json()); }
            if (tab === "Files")     { const r = await fetch(`${API}/lead/${encodeURIComponent(email)}/files`);    if(r.ok) setFiles(await r.json()); }
            if (tab === "Activities"){ const r = await fetch(`${API}/lead/${encodeURIComponent(email)}/followups`);if(r.ok) setFollowUps(await r.json()); }
        } catch { /* server might be down */ }
    };

    const handleTabClick = (tab) => { setActiveTab(tab); fetchTab(tab); };

    // ── Notes handlers ───────────────────────────────────────────────────────
    const handleAddNote = async () => {
        if (!noteText.trim()) return;
        setNoteSaving(true);
        const r = await fetch(`${API}/lead/${encodeURIComponent(email)}/notes`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ text: noteText }) });
        if (r.ok) { setNotes(await fetch(`${API}/lead/${encodeURIComponent(email)}/notes`).then(x=>x.json())); setNoteText(""); }
        setNoteSaving(false);
    };
    const handleEditNote = async (id, text) => {
        await fetch(`${API}/lead/${encodeURIComponent(email)}/notes/${id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ text }) });
        setNotes(await fetch(`${API}/lead/${encodeURIComponent(email)}/notes`).then(x=>x.json()));
        setEditingNote(null);
    };
    const handleDeleteNote = async (id) => {
        await fetch(`${API}/lead/${encodeURIComponent(email)}/notes/${id}`, { method:"DELETE" });
        setNotes(prev => prev.filter(n => n.id !== id));
    };

    // ── Calls handlers ───────────────────────────────────────────────────────
    const handleLogCall = async () => {
        if (!callNote.trim()) return;
        setCallSaving(true);
        const r = await fetch(`${API}/lead/${encodeURIComponent(email)}/calls`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ note: callNote, status: callStatus, type: callType }) });
        if (r.ok) { setCalls(await fetch(`${API}/lead/${encodeURIComponent(email)}/calls`).then(x=>x.json())); setCallNote(""); setCallStatus("Answered"); setCallType("Call"); }
        setCallSaving(false);
    };
    const handleUpdateCallStatus = async (id, status) => {
        await fetch(`${API}/lead/${encodeURIComponent(email)}/calls/${id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ status }) });
        setCalls(prev => prev.map(c => c.id === id ? {...c, status} : c));
    };
    const handleDeleteCall = async (id) => {
        await fetch(`${API}/lead/${encodeURIComponent(email)}/calls/${id}`, { method:"DELETE" });
        setCalls(prev => prev.filter(c => c.id !== id));
    };

    // ── Files handlers ───────────────────────────────────────────────────────
    const handleAddFile = async () => {
        if (!fileForm.title.trim()) return;
        setFileSaving(true);
        const r = await fetch(`${API}/lead/${encodeURIComponent(email)}/files`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ ...fileForm, owner: name }) });
        if (r.ok) { setFiles(await fetch(`${API}/lead/${encodeURIComponent(email)}/files`).then(x=>x.json())); setShowFileModal(false); setFileForm({ title:"", description:"", type:"Proposal", owner:name }); }
        setFileSaving(false);
    };
    const handleDeleteFile = async (id) => {
        await fetch(`${API}/lead/${encodeURIComponent(email)}/files/${id}`, { method:"DELETE" });
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    // ── Follow-up handlers ───────────────────────────────────────────────────
    const handleAddFollowUp = async () => {
        if (!followUpForm.date) return;
        setFollowUpSaving(true);
        try {
            const r = await fetch(`${API}/lead/${encodeURIComponent(email)}/followups`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(followUpForm) });
            if (r.ok) { setFollowUps(await fetch(`${API}/lead/${encodeURIComponent(email)}/followups`).then(x=>x.json())); setShowFollowUpModal(false); setFollowUpForm({ date:"", time:"", note:"", priority:"Medium" }); }
        } catch { alert("Could not reach server."); }
        setFollowUpSaving(false);
    };
    const handleDeleteFollowUp = async (id) => {
        await fetch(`${API}/lead/${encodeURIComponent(email)}/followups/${id}`, { method:"DELETE" });
        setFollowUps(prev => prev.filter(f => f.id !== id));
    };

    // ── Helpers ──────────────────────────────────────────────────────────────
    const fmtDate     = (iso) => new Date(iso).toLocaleString("en-GB", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
    const fmtDay      = (d)   => new Date(d).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" });
    const statusColor = (s)   => ({ Answered:"bg-green-100 text-green-600 border-green-200", Busy:"bg-red-100 text-red-500 border-red-200", "No Answer":"bg-purple-100 text-purple-600 border-purple-200", "Left Voicemail":"bg-yellow-100 text-yellow-600 border-yellow-200" }[s] || "bg-gray-100 text-gray-600 border-gray-200");
    const priorityColor = (p) => ({ High:"bg-red-100 text-red-600 border-red-200", Medium:"bg-yellow-100 text-yellow-600 border-yellow-200", Low:"bg-green-100 text-green-600 border-green-200" }[p] || "bg-gray-100 text-gray-600");
    const outcomeStyle  = () => {
        if (!leadStatus) return null;
        return { Converted:"bg-green-100 text-green-700 border-green-300", Nurture:"bg-blue-100 text-blue-700 border-blue-300", Junk:"bg-gray-100 text-gray-600 border-gray-300", Dead:"bg-red-100 text-red-600 border-red-300" }[leadStatus];
    };

    const tabs = ["Activities", "Notes", "Calls", "Files", "Email"];

    const pipelineStages = [
        { label: "Not Contacted", color: "bg-purple-500" },
        { label: "Contacted",     color: "bg-blue-500"   },
        { label: "Closed",        color: "bg-yellow-400" },
        { label: "Lost",          color: "bg-red-600"    },
    ];

    // Static recent activities for the Activities tab
    const recentActivities = [
        { icon: "message", bg: "bg-cyan-500",   title: "You sent 1 message to the contact.",                                                            time: "10:25 pm" },
        { icon: "phone",   bg: "bg-green-500",  title: "Denwar responded to your appointment schedule question by call at 09:30pm.",                    time: "09:25 pm" },
        { icon: "note",    bg: "bg-yellow-500", title: "Notes added by Antony", body: "Please accept my apologies for the inconvenience. Rescheduling?", time: "10:00 pm" },
        { icon: "meeting", bg: "bg-purple-500", title: "Meeting With Abraham",                                                                           time: "Scheduled 05:00 pm" },
    ];

    const renderIcon = (icon, bg) => {
        const cls = `w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${bg}`;
        if (icon === "message") return <div className={cls}><MessageCircle size={16} className="text-white"/></div>;
        if (icon === "phone")   return <div className={cls}><Phone         size={16} className="text-white"/></div>;
        if (icon === "note")    return <div className={cls}><FileText      size={16} className="text-white"/></div>;
        if (icon === "meeting") return <div className={cls}><UserCircle2   size={16} className="text-white"/></div>;
        if (icon === "visit")   return <div className={cls}><MapPin        size={16} className="text-white"/></div>;
        return <div className={cls}/>;
    };

    return(
        <div className="flex h-screen overflow-hidden">

            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>}
            <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"><Menu size={22}/></button>

            {/* Sidebar */}
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
                    <div className="flex gap-2 md:gap-4 mr-2 md:mr-5">
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer hidden md:block"><img src={fullScreen} alt="full" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer hidden md:block"><img src={gridApplication} alt="grid" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer"><img src={messageIcon} alt="message" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer hidden md:block"><img src={mailIcon} alt="mail" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer"><img src={bellIcon} alt="notification" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-full hover:cursor-pointer"><img src={personIcon} alt="person" className="h-7 w-7 rounded-full"/></button>
                    </div>
                </div>

                {/* Breadcrumb */}
                <div className="mx-3 md:mx-6 mt-4 flex items-center gap-2 text-sm flex-wrap">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-500 hover:text-black hover:cursor-pointer"><ArrowLeft size={16}/></button>
                    <span onClick={() => navigate(-1)} className="text-gray-500 hover:text-black hover:cursor-pointer font-medium">Leads</span>
                    <span className="text-gray-400">/</span>
                    <span className="font-semibold">{name}</span>

                    {/* Outcome badge */}
                    {leadStatus && (
                        <span className={`ml-1 px-3 py-0.5 rounded-full text-xs font-semibold border ${outcomeStyle()}`}>
                            {leadStatus === "Converted" && <CheckCircle2 size={11} className="inline mr-1"/>}
                            {leadStatus === "Junk"      && <XCircle      size={11} className="inline mr-1"/>}
                            {leadStatus === "Dead"      && <XCircle      size={11} className="inline mr-1"/>}
                            {leadStatus === "Nurture"   && <Clock        size={11} className="inline mr-1"/>}
                            {leadStatus}
                        </span>
                    )}

                    <div className="ml-auto flex gap-2 flex-wrap">
                        {/* Qualify button */}
                        <button onClick={() => setShowQualifyModal(true)} className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:cursor-pointer transition-colors">
                            <CheckCircle2 size={14}/> Qualify Lead
                        </button>
                        {/* Disqualify button */}
                        <button onClick={() => setShowDisqualifyModal(true)} className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:cursor-pointer transition-colors">
                            <XCircle size={14}/> Disqualify
                        </button>
                        {/* Follow-up button */}
                        <button onClick={() => setShowFollowUpModal(true)} className="flex items-center gap-1.5 border border-gray-200 hover:bg-gray-100 text-gray-700 text-sm font-semibold px-3 py-1.5 rounded-lg hover:cursor-pointer transition-colors">
                            <Clock size={14}/> Schedule Follow-Up
                        </button>
                    </div>
                </div>

                {/* MAIN BODY */}
                <div className="flex flex-col lg:flex-row gap-5 mx-3 md:mx-6 mt-5 mb-8">

                    {/* LEFT PANEL */}
                    <div className="w-full lg:w-[40%] flex flex-col gap-4">

                        {/* Profile */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] overflow-hidden">
                            <div className="h-28 w-full bg-gradient-to-r from-orange-500 to-yellow-400"></div>
                            <div className="flex justify-center -mt-10">
                                <div className="w-20 h-20 rounded-full border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: iconBg }}>{initials}</div>
                            </div>
                            <div className="flex flex-col items-center px-4 pt-3 pb-5 text-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold">{name}</span>
                                    <Star size={16} className="text-yellow-400 fill-yellow-400"/>
                                </div>
                                <span className="text-gray-500 text-sm mt-1">{location}</span>
                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm"><Mail size={13}/><span>{email}</span></div>
                                <div className="flex gap-2 mt-3 flex-wrap justify-center">
                                    <span className="flex items-center gap-1 px-3 py-0.5 bg-gray-100 rounded-full text-sm border border-gray-200"><Lock size={12}/> Private</span>
                                    <span className="px-3 py-0.5 rounded-full text-sm border font-medium text-white" style={{ backgroundColor: columnColor }}>{columnStatus}</span>
                                    {leadStatus && <span className={`px-3 py-0.5 rounded-full text-sm border font-medium ${outcomeStyle()}`}>{leadStatus}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Lead Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Lead information</span>
                                <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer" onClick={openEdit}/>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><CalendarDays size={14}/>Date Created</div>
                                    <span>{new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Link2 size={14}/>Value</div>
                                    <span>{value}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Phone size={14}/>Phone</div>
                                    <span>{phone}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Mail size={14}/>Email</div>
                                    <span className="truncate max-w-[180px]">{email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Link2 size={14}/>Source</div>
                                    <span>Google</span>
                                </div>
                                {leadStatus === "Converted" && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-gray-500"><CheckCircle2 size={14}/>Outcome</div>
                                        <span className="text-green-600 font-semibold">Converted</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Owner */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Owner</span>
                                <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer"/>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={ownerAvatar} alt="owner" className="w-9 h-9 rounded-full object-cover"/>
                                <span className="font-medium">Vaughan Iyer</span>
                            </div>
                        </div>

                        {/* Lead Assignment */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Assigned To</span>
                                {assignSaving && <span className="text-xs text-orange-500">Saving...</span>}
                            </div>
                            {assignedTo ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                                            {assignedTo.split(" ").map(w=>w[0]).join("")}
                                        </div>
                                        <span className="text-sm font-medium">{assignedTo}</span>
                                    </div>
                                    <button onClick={() => handleAssign("")} className="text-xs text-gray-400 hover:text-red-500 hover:cursor-pointer">Unassign</button>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 mb-2">Not assigned yet</p>
                            )}
                            <div className="mt-3">
                                <select value={assignedTo} onChange={e => handleAssign(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    <option value="">Select a sales rep...</option>
                                    {salesReps.map(rep => <option key={rep} value={rep}>{rep}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <span className="font-semibold text-base">Tags</span>
                            <div className="flex gap-2 mt-3 flex-wrap">
                                <span className="px-3 py-0.5 bg-green-100 text-green-600 rounded-full text-sm border border-green-200">Collab</span>
                                <span className="px-3 py-0.5 bg-yellow-100 text-yellow-600 rounded-full text-sm border border-yellow-200">Rated</span>
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <span className="font-semibold text-base">Projects</span>
                            <div className="flex gap-2 mt-3 flex-wrap">
                                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm border border-gray-200">Devops Design</span>
                                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm border border-gray-200">Material Design</span>
                            </div>
                        </div>

                        {/* Priority */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <span className="font-semibold text-base">Priority</span>
                            <div className="mt-3">
                                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 hover:cursor-pointer">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> High <ChevronDown size={14}/>
                                </button>
                            </div>
                        </div>

                        {/* Contacts */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Contacts</span>
                                <button className="flex items-center gap-1 text-orange-500 text-sm hover:cursor-pointer"><Plus size={14}/> Add New</button>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={contactAvatar} alt="contact" className="w-9 h-9 rounded-full object-cover"/>
                                <span className="font-medium">Shreya Roy</span>
                            </div>
                        </div>

                        {/* Other Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Other information</span>
                                <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer"/>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><CalendarDays size={14}/>Last Modified</div>
                                    <span>10 June 2026, 11:45 pm</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><UserCircle2 size={14}/>Modified By</div>
                                    <div className="flex items-center gap-2">
                                        <img src={modifiedAvatar} alt="mod" className="w-5 h-5 rounded-full object-cover"/>
                                        <span>Daksh Rikhari</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT PANEL */}
                    <div className="w-full lg:w-[60%] flex flex-col gap-4">

                        {/* Lead Pipeline Status */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <span className="font-semibold text-base">Lead Pipeline Status</span>
                            <div className="flex mt-4 overflow-x-auto gap-1">
                                {pipelineStages.map((stage, i) => (
                                    <div key={stage.label}
                                        className={`flex-1 min-w-[90px] h-10 flex items-center justify-center text-white text-xs font-semibold transition-opacity ${stage.label === columnStatus ? "opacity-100 ring-2 ring-offset-1 ring-gray-400" : "opacity-40"} ${stage.color} ${i===0?"rounded-l-full":""} ${i===pipelineStages.length-1?"rounded-r-full":""}`}
                                        style={{ clipPath: i < pipelineStages.length-1 ? "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)" }}>
                                        {stage.label}
                                    </div>
                                ))}
                            </div>

                            {/* Qualification outcome row */}
                            <div className="flex gap-2 mt-4 flex-wrap">
                                {["Converted","Nurture","Junk","Dead"].map(o => (
                                    <span key={o} className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${leadStatus === o ? outcomeStyle() : "bg-gray-50 text-gray-400 border-gray-200"}`}>
                                        {o}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Scheduled Follow-ups */}
                        {followUps.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-base flex items-center gap-2"><Clock size={15} className="text-orange-500"/> Scheduled Follow-Ups</span>
                                    <button onClick={() => setShowFollowUpModal(true)} className="text-orange-500 text-sm flex items-center gap-1 hover:cursor-pointer"><Plus size={13}/> Add</button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {followUps.map(f => (
                                        <div key={f.id} className="flex items-start justify-between gap-2 border border-gray-100 rounded-lg p-3">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-sm font-semibold">{fmtDay(f.date)}{f.time ? ` at ${f.time}` : ""}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColor(f.priority)}`}>{f.priority}</span>
                                                </div>
                                                {f.note && <p className="text-xs text-gray-500">{f.note}</p>}
                                            </div>
                                            <Trash2 size={14} className="text-gray-400 hover:text-red-500 hover:cursor-pointer flex-shrink-0 mt-0.5" onClick={() => handleDeleteFollowUp(f.id)}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tabs */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex gap-4 md:gap-8 border-b border-gray-200 overflow-x-auto">
                                {tabs.map(tab => (
                                    <button key={tab} onClick={() => handleTabClick(tab)}
                                        className={`pb-3 text-sm font-medium whitespace-nowrap flex items-center gap-1.5 hover:cursor-pointer border-b-2 transition-colors ${activeTab===tab ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:text-black"}`}>
                                        {tab==="Activities" && <Activity  size={14}/>}
                                        {tab==="Notes"      && <FileText  size={14}/>}
                                        {tab==="Calls"      && <Phone     size={14}/>}
                                        {tab==="Files"      && <FileText  size={14}/>}
                                        {tab==="Email"      && <Mail      size={14}/>}
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* ── ACTIVITIES TAB ── */}
                            {activeTab === "Activities" && (
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold text-base">Activities</span>
                                        <button className="flex items-center gap-1 text-sm border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 hover:cursor-pointer">
                                            Sort By: Last 7 Days <ChevronDown size={14}/>
                                        </button>
                                    </div>

                                    {/* Recent activity list */}
                                    <div className="mb-3">
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-600 border border-purple-200">📅 Recent</span>
                                    </div>
                                    <div className="flex flex-col gap-4 mb-6">
                                        {recentActivities.map((item, idx) => (
                                            <div key={idx} className="flex gap-3 items-start">
                                                {renderIcon(item.icon, item.bg)}
                                                <div className="flex flex-col flex-1">
                                                    <span className="font-semibold text-sm">{item.title}</span>
                                                    {item.body && <p className="text-xs text-gray-500 mt-1">{item.body}</p>}
                                                    <span className="text-xs text-gray-400 mt-1">{item.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Scheduled follow-ups inside activities tab */}
                                    {followUps.length > 0 && (
                                        <>
                                            <div className="mb-3">
                                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600 border border-green-200">📅 Upcoming Activity</span>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                {followUps.map(f => (
                                                    <div key={f.id} className="flex gap-3 items-start">
                                                        <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0"><Clock size={16} className="text-white"/></div>
                                                        <div className="flex flex-col flex-1">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <span className="font-semibold text-sm">Follow-Up Scheduled</span>
                                                                <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColor(f.priority)}`}>{f.priority}</span>
                                                            </div>
                                                            <span className="text-xs text-gray-400">{fmtDay(f.date)}{f.time ? ` at ${f.time}` : ""}</span>
                                                            {f.note && <p className="text-xs text-gray-500 mt-1">{f.note}</p>}
                                                        </div>
                                                        <Trash2 size={14} className="text-gray-400 hover:text-red-500 hover:cursor-pointer flex-shrink-0" onClick={() => handleDeleteFollowUp(f.id)}/>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* ── NOTES TAB ── */}
                            {activeTab === "Notes" && (
                                <div className="mt-4 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-base">Notes</span>
                                        <button className="flex items-center gap-1 text-sm border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 hover:cursor-pointer">
                                            Sort By: Last 7 Days <ChevronDown size={14}/>
                                        </button>
                                    </div>

                                    {/* Add note */}
                                    <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2">
                                        <textarea rows={3} placeholder="Write a note..." value={noteText} onChange={e => setNoteText(e.target.value)}
                                            className="w-full text-sm resize-none focus:outline-none text-gray-700 placeholder-gray-400"/>
                                        <div className="flex justify-end">
                                            <button onClick={handleAddNote} disabled={noteSaving || !noteText.trim()}
                                                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:cursor-pointer transition-colors">
                                                {noteSaving ? "Saving..." : "Add Note"}
                                            </button>
                                        </div>
                                    </div>

                                    {notes.length === 0 && <p className="text-center text-gray-400 text-sm py-6">No notes yet. Add one above.</p>}
                                    {notes.map(note => (
                                        <div key={note.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: iconBg }}>{initials}</div>
                                                    <div>
                                                        <p className="font-semibold text-sm">{name}</p>
                                                        <p className="text-xs text-gray-400">{fmtDate(note.createdAt)}{note.updatedAt ? " · edited" : ""}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer" onClick={() => setEditingNote({ id: note.id, text: note.text })}/>
                                                    <Trash2 size={15} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"  onClick={() => handleDeleteNote(note.id)}/>
                                                </div>
                                            </div>
                                            {editingNote?.id === note.id ? (
                                                <div className="flex flex-col gap-2 mt-1">
                                                    <textarea rows={3} value={editingNote.text} onChange={e => setEditingNote(p => ({...p, text: e.target.value}))}
                                                        className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"/>
                                                    <div className="flex gap-2 justify-end">
                                                        <button onClick={() => setEditingNote(null)} className="text-xs px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                                                        <button onClick={() => handleEditNote(note.id, editingNote.text)} className="text-xs px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 hover:cursor-pointer">Save</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-600 leading-relaxed">{note.text}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ── CALLS TAB ── */}
                            {activeTab === "Calls" && (
                                <div className="mt-4 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-base">Calls & Visits</span>
                                        <button onClick={handleLogCall} disabled={callSaving || !callNote.trim()} className="flex items-center gap-1 text-sm text-orange-500 font-semibold hover:cursor-pointer disabled:opacity-40">
                                            <Plus size={15}/> Add New
                                        </button>
                                    </div>

                                    {/* Log call input */}
                                    <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-3">
                                        <textarea rows={2} placeholder="Call / visit notes..." value={callNote} onChange={e => setCallNote(e.target.value)}
                                            className="w-full text-sm resize-none focus:outline-none text-gray-700 placeholder-gray-400"/>
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs text-gray-500">Type:</span>
                                                    <select value={callType} onChange={e => setCallType(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400">
                                                        {callTypes.map(t => <option key={t}>{t}</option>)}
                                                    </select>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs text-gray-500">Status:</span>
                                                    <select value={callStatus} onChange={e => setCallStatus(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400">
                                                        {callStatuses.map(s => <option key={s}>{s}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <button onClick={handleLogCall} disabled={callSaving || !callNote.trim()}
                                                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:cursor-pointer transition-colors">
                                                {callSaving ? "Logging..." : `Log ${callType}`}
                                            </button>
                                        </div>
                                    </div>

                                    {calls.length === 0 && <p className="text-center text-gray-400 text-sm py-6">No calls or visits logged yet.</p>}
                                    {calls.map(call => (
                                        <div key={call.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    {renderIcon(call.type === "Visit" ? "visit" : "phone", call.type === "Visit" ? "bg-purple-500" : "bg-green-500")}
                                                    <div>
                                                        <span className="font-semibold text-sm">{name}</span>
                                                        <span className="text-gray-500 text-sm"> logged a {call.type || "call"} on {fmtDate(call.loggedAt)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <select value={call.status} onChange={e => handleUpdateCallStatus(call.id, e.target.value)}
                                                        className={`text-xs border rounded-lg px-2 py-1 font-medium focus:outline-none hover:cursor-pointer ${statusColor(call.status)}`}>
                                                        {callStatuses.map(s => <option key={s}>{s}</option>)}
                                                    </select>
                                                    <Trash2 size={15} className="text-gray-400 hover:text-red-500 hover:cursor-pointer" onClick={() => handleDeleteCall(call.id)}/>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed ml-12">{call.note}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ── FILES TAB ── */}
                            {activeTab === "Files" && (
                                <div className="mt-4 flex flex-col gap-4">
                                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm">Manage Documents</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Send customizable quotes, proposals and contracts to close deals faster.</p>
                                        </div>
                                        <button onClick={() => { setShowFileModal(true); setFileForm({ title:"", description:"", type:"Proposal", owner:name }); }}
                                            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:cursor-pointer transition-colors whitespace-nowrap">
                                            Create Document
                                        </button>
                                    </div>

                                    {files.length === 0 && <p className="text-center text-gray-400 text-sm py-6">No documents yet.</p>}
                                    {files.map(file => (
                                        <div key={file.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-semibold text-sm">{file.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{file.description || "No description."}</p>
                                                </div>
                                                <Trash2 size={15} className="text-gray-400 hover:text-red-500 hover:cursor-pointer flex-shrink-0" onClick={() => handleDeleteFile(file.id)}/>
                                            </div>
                                            <div className="flex items-center justify-between flex-wrap gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: iconBg }}>{initials}</div>
                                                    <div>
                                                        <p className="text-xs text-gray-400">Owner</p>
                                                        <p className="text-sm font-semibold">{file.owner}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs px-2 py-0.5 rounded-full border border-pink-200 text-pink-500">{file.type}</span>
                                                    <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>{file.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ── EMAIL TAB ── */}
                            {activeTab === "Email" && (
                                <div className="mt-4">
                                    <span className="font-semibold text-base">Email</span>
                                    <div className="mt-4 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm">Manage Emails</p>
                                            <p className="text-xs text-gray-500 mt-0.5">You can send and reply to emails directly via this section.</p>
                                        </div>
                                        <a href={`mailto:${email}`} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:cursor-pointer transition-colors whitespace-nowrap">
                                            Send Email
                                        </a>
                                    </div>
                                    <div className="mt-4 flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                                        <Mail size={18} className="text-orange-500 flex-shrink-0"/>
                                        <div>
                                            <p className="text-sm font-semibold">{email}</p>
                                            <p className="text-xs text-gray-400">Lead email address</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>{/* end tabs card */}
                    </div>{/* end right panel */}
                </div>{/* end main body */}

                {/* Footer */}
                <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>

            </div>{/* end main area */}

            {/* ══ EDIT LEAD MODAL ══════════════════════════════════════════════════════ */}
            {showEditModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div><h2 className="text-lg font-bold text-gray-800">Edit Lead</h2><p className="text-xs text-gray-400 mt-0.5">{email}</p></div>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        {editError && <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{editError}</div>}
                        <div className="flex flex-col gap-3">
                            {[["Full Name","text",editForm.name,"name","Name is required"],["Deal Value","text",editForm.value,"value","e.g. $3,50,000"],["Phone","text",editForm.phone,"phone",""],["Location","text",editForm.location,"location",""]].map(([label,type,val,key,ph])=>(
                                <div key={key}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}{key==="name"&&<span className="text-red-500"> *</span>}</label>
                                    <input type={type} value={val||""} placeholder={ph} onChange={e=>setEditForm(p=>({...p,[key]:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">{saving?"Saving...":"Save Changes"}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ QUALIFY MODAL ════════════════════════════════════════════════════════ */}
            {showQualifyModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Qualify Lead</h2>
                            <button onClick={() => setShowQualifyModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        <p className="text-sm text-gray-500 mb-5">Is <span className="font-semibold text-gray-800">{name}</span> a qualified lead based on BANT criteria?</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={openConvertModal}
                                className="w-full flex items-center gap-3 border-2 border-green-400 rounded-xl p-3 hover:bg-green-50 hover:cursor-pointer transition-colors">
                                <CheckCircle2 size={22} className="text-green-500 flex-shrink-0"/>
                                <div className="text-left">
                                    <p className="font-semibold text-sm text-green-700">Yes — Convert Lead</p>
                                    <p className="text-xs text-gray-400">Create account, contact & opportunity</p>
                                </div>
                            </button>
                            <button onClick={() => { setShowQualifyModal(false); handleSetOutcome("Nurture"); }}
                                className="w-full flex items-center gap-3 border-2 border-blue-300 rounded-xl p-3 hover:bg-blue-50 hover:cursor-pointer transition-colors">
                                <Clock size={22} className="text-blue-500 flex-shrink-0"/>
                                <div className="text-left">
                                    <p className="font-semibold text-sm text-blue-700">Not Yet — Nurture</p>
                                    <p className="text-xs text-gray-400">Keep in marketing drip, follow up later</p>
                                </div>
                            </button>
                        </div>
                        <button onClick={() => setShowQualifyModal(false)} className="mt-4 w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                    </div>
                </div>
            )}

            {/* ══ CONVERT MODAL ════════════════════════════════════════════════════════ */}
            {showConvertModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Convert Lead</h2>
                                <p className="text-xs text-gray-400 mt-0.5">This will create an Account, Contact & Opportunity</p>
                            </div>
                            <button onClick={() => setShowConvertModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>

                        <div className="flex flex-col gap-4">

                            {/* ── Account ── */}
                            <div className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Account</p>
                                <div className="flex gap-2 mb-2">
                                    <button onClick={() => setConvertForm(p => ({...p, isNewCompany: true, company: ""}))}
                                        className={`flex-1 text-xs py-1.5 rounded-lg border font-semibold transition-colors hover:cursor-pointer ${convertForm.isNewCompany ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                                        + New Account
                                    </button>
                                    <button onClick={() => setConvertForm(p => ({...p, isNewCompany: false, company: ""}))}
                                        className={`flex-1 text-xs py-1.5 rounded-lg border font-semibold transition-colors hover:cursor-pointer ${!convertForm.isNewCompany ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                                        Existing Account
                                    </button>
                                </div>
                                {convertForm.isNewCompany ? (
                                    <input type="text" placeholder="Enter company name..." value={convertForm.company}
                                        onChange={e => setConvertForm(p => ({...p, company: e.target.value}))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"/>
                                ) : (
                                    <select value={convertForm.company} onChange={e => setConvertForm(p => ({...p, company: e.target.value}))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                                        <option value="">Select existing account...</option>
                                        {existingAccounts.map(a => <option key={a.id} value={a.company}>{a.company}</option>)}
                                    </select>
                                )}
                            </div>

                            {/* ── Contact ── */}
                            <div className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Contact</p>
                                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: iconBg }}>{initials}</div>
                                    <div>
                                        <p className="text-sm font-semibold">{name}</p>
                                        <p className="text-xs text-gray-400">{email}</p>
                                    </div>
                                    <CheckCircle2 size={16} className="text-green-500 ml-auto flex-shrink-0"/>
                                </div>
                                <p className="text-xs text-gray-400 mt-1.5 ml-1">This lead will be saved as a contact automatically.</p>
                            </div>

                            {/* ── Opportunity ── */}
                            <div className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Opportunity</p>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Opportunity Name</label>
                                        <input type="text" value={convertForm.opportunity}
                                            onChange={e => setConvertForm(p => ({...p, opportunity: e.target.value}))}
                                            placeholder="e.g. Q3 Enterprise Deal"
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"/>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Deal Amount</label>
                                        <input type="text" value={convertForm.amount}
                                            onChange={e => setConvertForm(p => ({...p, amount: e.target.value}))}
                                            placeholder="e.g. $3,50,000"
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"/>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Stage</label>
                                        <select value={convertForm.stage} onChange={e => setConvertForm(p => ({...p, stage: e.target.value}))}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                                            {opportunityStages.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Assign To</label>
                                        <select value={convertForm.assignedRep} onChange={e => setConvertForm(p => ({...p, assignedRep: e.target.value}))}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                                            <option value="">Select sales rep...</option>
                                            {salesReps.map(r => <option key={r}>{r}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowConvertModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleConvert} disabled={convertSaving} className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">
                                {convertSaving ? "Converting..." : "Convert Lead"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ DISQUALIFY MODAL ═════════════════════════════════════════════════════ */}
            {showDisqualifyModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Disqualify Lead</h2>
                            <button onClick={() => setShowDisqualifyModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Why is <span className="font-semibold text-gray-800">{name}</span> being disqualified?</p>
                        <div className="flex flex-col gap-2 mb-4">
                            {[["No Budget","Junk"],["Not Decision Maker","Junk"],["No Need","Junk"],["Permanently Lost","Dead"]].map(([label,outcome])=>(
                                <button key={label} onClick={()=>{ setDisqualifyReason(label); }}
                                    className={`flex items-center gap-2 p-3 border-2 rounded-xl text-sm font-medium hover:cursor-pointer transition-colors ${disqualifyReason===label?"border-red-400 bg-red-50 text-red-700":"border-gray-200 hover:bg-gray-50 text-gray-700"}`}>
                                    <XCircle size={16} className={disqualifyReason===label?"text-red-500":"text-gray-400"}/>
                                    {label}
                                    <span className="ml-auto text-xs text-gray-400">→ {outcome}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDisqualifyModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={() => handleSetOutcome(["Permanently Lost"].includes(disqualifyReason) ? "Dead" : "Junk")}
                                className="flex-1 bg-red-500 hover:bg-red-600 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">
                                Disqualify
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ FOLLOW-UP MODAL ══════════════════════════════════════════════════════ */}
            {showFollowUpModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Schedule Follow-Up</h2>
                            <button onClick={() => setShowFollowUpModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Date <span className="text-red-500">*</span></label>
                                <input type="date" value={followUpForm.date} onChange={e=>setFollowUpForm(p=>({...p,date:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Time</label>
                                <input type="time" value={followUpForm.time} onChange={e=>setFollowUpForm(p=>({...p,time:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Priority</label>
                                <select value={followUpForm.priority} onChange={e=>setFollowUpForm(p=>({...p,priority:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    <option>High</option><option>Medium</option><option>Low</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Note</label>
                                <textarea rows={2} placeholder="What to discuss..." value={followUpForm.note} onChange={e=>setFollowUpForm(p=>({...p,note:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowFollowUpModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleAddFollowUp} disabled={followUpSaving || !followUpForm.date}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">
                                {followUpSaving ? "Saving..." : "Schedule"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ CREATE DOCUMENT MODAL ════════════════════════════════════════════════ */}
            {showFileModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Create Document</h2>
                            <button onClick={() => setShowFileModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Title <span className="text-red-500">*</span></label>
                                <input type="text" value={fileForm.title} onChange={e=>setFileForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Collier-Turner Proposal" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Description</label>
                                <input type="text" value={fileForm.description} onChange={e=>setFileForm(p=>({...p,description:e.target.value}))} placeholder="Brief description..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Type</label>
                                <select value={fileForm.type} onChange={e=>setFileForm(p=>({...p,type:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    <option>Proposal</option><option>Quote</option><option>Contract</option><option>Invoice</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowFileModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Cancel</button>
                            <button onClick={handleAddFile} disabled={fileSaving || !fileForm.title.trim()} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer">
                                {fileSaving ? "Creating..." : "Create Document"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Leads_details;
