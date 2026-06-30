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
import { Menu, X, Star, Lock, ChevronDown, Pencil, Phone, MessageCircle, FileText, Mail, CalendarDays, Link2, UserCircle2, Plus, ArrowLeft } from "lucide-react";

function Leads_details(){
    const { state } = useLocation();
    const navigate = useNavigate();
    const leadData = state?.lead || {};
    const columnStatus = state?.columnStatus || "Unknown";
    const columnColor  = state?.columnColor  || "#1AA3E8";

    // Use state so UI reflects edits immediately after save
    const [name,     setName]     = useState(leadData.name     || "Unknown Lead");
    const [email]                 = useState(leadData.email    || "N/A");   // identifier — not editable
    const [phone,    setPhone]    = useState(leadData.phone    || "N/A");
    const [location, setLocation] = useState(leadData.location || "N/A");
    const [value,    setValue]    = useState(leadData.value    || "$0");
    const [iconBg]                = useState(leadData.iconBg   || "#1AA3E8");

    // Derive initials from current name
    const initials = name.trim().split(' ').map(w => w[0]?.toUpperCase()).slice(0, 2).join('');

    // ── Edit modal state ────────────────────────────────────────────────────
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm]           = useState({});
    const [editError, setEditError]         = useState("");
    const [saving, setSaving]               = useState(false);

    const openEdit = () => {
        setEditForm({ name, phone, location, value });
        setEditError("");
        setShowEditModal(true);
    };

    const handleSave = async () => {
        if (!editForm.name?.trim()) { setEditError("Name is required."); return; }
        setSaving(true);
        try {
            const res = await fetch(
                `http://localhost:5000/api/leads/columns/${encodeURIComponent(columnStatus)}/leads/${encodeURIComponent(email)}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) }
            );
            if (!res.ok) { const e = await res.json(); setEditError(e.error || "Failed to save."); setSaving(false); return; }
            // Update local state so the page reflects changes without a reload
            setName(editForm.name.trim());
            setPhone(editForm.phone?.trim() || phone);
            setLocation(editForm.location?.trim() || location);
            setValue(editForm.value?.trim() || value);
            setShowEditModal(false);
        } catch {
            setEditError("Could not reach the server.");
        }
        setSaving(false);
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Activities");

    const tabs = ["Activities", "Notes", "Calls", "Files", "Email"];

    const pipelineStages = [
        { label: "Not Contacted", color: "bg-purple-500" },
        { label: "Contacted",     color: "bg-blue-500"   },
        { label: "Closed",        color: "bg-yellow-400" },
        { label: "Lost",          color: "bg-red-600"    },
    ];

    const activities = [
        {
            date: "15 Feb 2024",
            items: [
                { icon: "message", bg: "bg-cyan-500",    title: "You sent 1 Message to the contact.", time: "10:25 pm" },
                { icon: "phone",   bg: "bg-green-500",   title: "Denwar responded to your appointment schedule question by call at 09:30pm.", time: "09:25 pm" },
                { icon: "note",    bg: "bg-yellow-500",  title: "Notes added by Antony", time: "10:00 pm",
                  body: "Please accept my apologies for the inconvenience caused. It would be much appreciated if it's possible to reschedule to 6:00 PM, or any other day that week." },
                { icon: "meeting", bg: "bg-purple-500",  title: "Meeting With", person: "Abraham", time: "Schedueled on 05:00 pm" },
                { icon: "phone",   bg: "bg-green-500",   title: "Drain responded to your appointment schedule question.", time: "09:25 pm" },
            ],
        },
        {
            date: "Upcoming Activity",
            upcoming: true,
            items: [
                {
                    icon: "meeting", bg: "bg-purple-500",
                    title: "Product Meeting",
                    time: "Schedueled on 05:00 pm",
                    body: "A product team meeting is a gathering of the cross-functional product team — ideally including team members from product, engineering, marketing, and customer support.",
                    reminder: "Reminder",
                    taskPriority: "High",
                    assignedTo: "John",
                    assignedAvatar: meetingAvatar,
                },
            ],
        },
    ];

    const renderActivityIcon = (icon, bg) => {
        const cls = `w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${bg}`;
        if (icon === "message") return <div className={cls}><MessageCircle size={16} className="text-white" /></div>;
        if (icon === "phone")   return <div className={cls}><Phone size={16} className="text-white" /></div>;
        if (icon === "note")    return <div className={cls}><FileText size={16} className="text-white" /></div>;
        if (icon === "meeting") return <div className={cls}><UserCircle2 size={16} className="text-white" /></div>;
        return <div className={cls}></div>;
    };

    return(
        <div className="flex h-screen overflow-hidden">

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>
            )}

            <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md">
                <Menu size={22} />
            </button>

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
                            <img src={fullScreen} alt="full" className="h-4 w-4"/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer hidden md:block">
                            <img src={gridApplication} alt="grid" className="h-4 w-4"/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer">
                            <img src={messageIcon} alt="message" className="h-4 w-4"/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer hidden md:block">
                            <img src={mailIcon} alt="mail" className="h-4 w-4"/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer">
                            <img src={bellIcon} alt="notification" className="h-4 w-4"/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-full hover:cursor-pointer">
                            <img src={personIcon} alt="person" className="h-7 w-7 rounded-full"/>
                        </button>
                    </div>
                </div>

                {/* Breadcrumb */}
                <div className="mx-3 md:mx-6 mt-4 flex items-center gap-2 text-sm flex-wrap">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-500 hover:text-black hover:cursor-pointer">
                        <ArrowLeft size={16} />
                    </button>
                    <span onClick={() => navigate(-1)} className="text-gray-500 hover:text-black hover:cursor-pointer font-medium">Leads</span>
                    <span className="text-gray-400">/</span>
                    <span className="font-semibold">{name}</span>
                    <button className="ml-2 flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-100 hover:cursor-pointer">
                        <Link2 size={14} />
                        Marketing Pipeline
                        <ChevronDown size={14} />
                    </button>
                </div>

                {/* MAIN BODY */}
                <div className="flex flex-col lg:flex-row gap-5 mx-3 md:mx-6 mt-5 mb-8">

                    {/*LEFT PART*/}
                    <div className="w-full lg:w-[40%] flex flex-col gap-4">

                        {/*Profile*/}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] overflow-hidden">
                            
                            <div className="h-28 w-full bg-gradient-to-r from-orange-500 to-yellow-400"></div>
                            
                            <div className="flex justify-center -mt-10">
                                <div className="w-20 h-20 rounded-full border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: iconBg }}>
                                    {initials}
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center px-4 pt-3 pb-5 text-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold">{name}</span>
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                </div>
                                <span className="text-gray-500 text-sm mt-1">{location}</span>
                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                                    <Mail size={13} /><span>{email}</span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <span className="flex items-center gap-1 px-3 py-0.5 bg-gray-100 rounded-full text-sm border border-gray-200">
                                        <Lock size={12} /> Private
                                    </span>
                                    <span className="px-3 py-0.5 rounded-full text-sm border font-medium text-white" style={{ backgroundColor: columnColor }}>
                                        {columnStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Lead Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Lead information</span>
                                <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer" onClick={openEdit} />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><CalendarDays size={14} />Date Created</div>
                                    <span>{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Link2 size={14} />Value</div>
                                    <span>{value}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Phone size={14} />Phone</div>
                                    <span>{phone}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Mail size={14} />Email</div>
                                    <span className="truncate max-w-[180px]">{email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Link2 size={14} />Source</div>
                                    <span>Google</span>
                                </div>
                            </div>
                        </div>

                        {/* Owner */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Owner</span>
                                <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer" />
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={ownerAvatar} alt="owner" className="w-9 h-9 rounded-full object-cover" />
                                <span className="font-medium">Vaughan Iyer</span>
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
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    High
                                    <ChevronDown size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Contacts */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Contacts</span>
                                <button className="flex items-center gap-1 text-orange-500 text-sm hover:cursor-pointer">
                                    <Plus size={14} /> Add New
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={contactAvatar} alt="contact" className="w-9 h-9 rounded-full object-cover" />
                                <span className="font-medium">Shreya Roy</span>
                            </div>
                        </div>

                        {/* Other Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Other information</span>
                                <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer" />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><CalendarDays size={14} />Last Modified</div>
                                    <span>10 June 2026, 11:45 pm</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><UserCircle2 size={14} />Modified By</div>
                                    <div className="flex items-center gap-2">
                                        <img src={modifiedAvatar} alt="mod" className="w-5 h-5 rounded-full object-cover" />
                                        <span>Daksh Rikhari</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/*RIGHT PANEL*/}
                    <div className="w-full lg:w-[60%] flex flex-col gap-4">

                        {/* Lead Pipeline Status */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <span className="font-semibold text-base">Lead Pipeline Status</span>
                            {/* Pipeline arrows */}
                            <div className="flex mt-4 overflow-x-auto gap-1">
                                {pipelineStages.map((stage, i) => (
                                    <div
                                        key={stage.label}
                                        className={`flex-1 min-w-[90px] h-10 flex items-center justify-center text-white text-xs font-semibold relative transition-opacity
                                            ${stage.label === columnStatus ? "opacity-100 ring-2 ring-offset-1 ring-gray-400" : "opacity-40"}
                                            ${stage.color}
                                            ${i === 0 ? "rounded-l-full" : ""}
                                            ${i === pipelineStages.length - 1 ? "rounded-r-full" : ""}
                                        `}
                                        style={{
                                            clipPath: i < pipelineStages.length - 1
                                                ? "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)"
                                                : "polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)",
                                        }}
                                    >
                                        {stage.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex gap-4 md:gap-8 border-b border-gray-200 pb-0 overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 text-sm font-medium whitespace-nowrap flex items-center gap-1.5 hover:cursor-pointer border-b-2 transition-colors ${
                                            activeTab === tab
                                                ? "border-orange-500 text-orange-500"
                                                : "border-transparent text-gray-500 hover:text-black"
                                        }`}
                                    >
                                        {tab === "Activities" && <Plus size={14} />}
                                        {tab === "Notes"      && <FileText size={14} />}
                                        {tab === "Calls"      && <Phone size={14} />}
                                        {tab === "Files"      && <FileText size={14} />}
                                        {tab === "Email"      && <Mail size={14} />}
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Activities Tab Content */}
                            {activeTab === "Activities" && (
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold text-base">Activities</span>
                                        <button className="flex items-center gap-1 text-sm border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 hover:cursor-pointer">
                                            Sort By : Last 7 Days <ChevronDown size={14} />
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        {activities.map((section) => (
                                            <div key={section.date}>
                                                {/* Date badge */}
                                                <div className="mb-4">
                                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${section.upcoming ? "bg-green-100 text-green-600 border border-green-200" : "bg-purple-100 text-purple-600 border border-purple-200"}`}>
                                                        <span className="mr-1">📅</span>{section.date}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                    {section.items.map((item, idx) => (
                                                        <div key={idx} className={`flex gap-3 ${item.body || item.reminder ? "flex-col" : ""}`}>
                                                            <div className="flex gap-3 items-start">
                                                                {renderActivityIcon(item.icon, item.bg)}
                                                                <div className="flex flex-col flex-1">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <span className="font-semibold text-sm">{item.title}</span>
                                                                        {item.person && (
                                                                            <div className="flex items-center gap-1">
                                                                                <img src={meetingAvatar} alt="person" className="w-5 h-5 rounded-full object-cover" />
                                                                                <span className="text-sm font-semibold">{item.person}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-gray-400 text-xs mt-0.5">{item.time}</span>
                                                                    {item.body && !item.reminder && (
                                                                        <p className="text-gray-500 text-sm mt-1">{item.body}</p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Upcoming activity extra info */}
                                                            {item.reminder && (
                                                                <div className="ml-12 flex flex-col gap-2">
                                                                    <p className="text-gray-500 text-sm">{item.body}</p>
                                                                    <div className="flex flex-wrap gap-3 mt-2">
                                                                        <div className="flex flex-col gap-1">
                                                                            <span className="text-xs text-gray-400">Reminder</span>
                                                                            <button className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1 text-sm hover:bg-gray-50 hover:cursor-pointer">
                                                                                {item.reminder} <ChevronDown size={12} />
                                                                            </button>
                                                                        </div>
                                                                        <div className="flex flex-col gap-1">
                                                                            <span className="text-xs text-gray-400">Task Priority</span>
                                                                            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1 text-sm hover:bg-gray-50 hover:cursor-pointer">
                                                                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                                                {item.taskPriority} <ChevronDown size={12} />
                                                                            </button>
                                                                        </div>
                                                                        <div className="flex flex-col gap-1">
                                                                            <span className="text-xs text-gray-400">Assigned to</span>
                                                                            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1 text-sm hover:bg-gray-50 hover:cursor-pointer">
                                                                                <img src={item.assignedAvatar} alt="assigned" className="w-5 h-5 rounded-full object-cover" />
                                                                                {item.assignedTo} <ChevronDown size={12} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Placeholder for other tabs */}
                            {activeTab !== "Activities" && (
                                <div className="mt-8 text-center text-gray-400 text-sm py-8">
                                    No {activeTab} found.
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>

            </div>

            {/* ── EDIT LEAD MODAL ── */}
            {showEditModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Edit Lead</h2>
                                <p className="text-xs text-gray-400 mt-0.5">{email}</p>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {editError && (
                            <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                {editError}
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Deal Value</label>
                                <input
                                    type="text"
                                    value={editForm.value}
                                    onChange={e => setEditForm(p => ({ ...p, value: e.target.value }))}
                                    placeholder="e.g. $3,50,000"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone</label>
                                <input
                                    type="text"
                                    value={editForm.phone}
                                    onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Location</label>
                                <input
                                    type="text"
                                    value={editForm.location}
                                    onChange={e => setEditForm(p => ({ ...p, location: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer transition-colors"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Leads_details;
