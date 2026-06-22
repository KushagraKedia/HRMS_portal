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
import { Menu, X, Star, Lock, ChevronDown, Pencil, Phone, MessageCircle, FileText, Mail, CalendarDays, Link2, UserCircle2, Plus, ArrowLeft } from "lucide-react";

function Leads_details(){
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
                    <button className="flex items-center gap-1 text-gray-500 hover:text-black hover:cursor-pointer">
                        <ArrowLeft size={16} />
                    </button>
                    <span className="text-gray-500 hover:text-black hover:cursor-pointer font-medium">Leads</span>
                    <span className="text-gray-400">/</span>
                    <span className="font-semibold">John Smith</span>
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
                                <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-gray-700">
                                    KK
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center px-4 pt-3 pb-5 text-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold">Kushagra Kedia  </span>
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                </div>
                                <span className="text-gray-500 text-sm mt-1">1861 Bayonne Ave, Manchester, NJ, 08759</span>
                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                                    <span>BrightWave Innovations</span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <span className="flex items-center gap-1 px-3 py-0.5 bg-gray-100 rounded-full text-sm border border-gray-200">
                                        <Lock size={12} /> Private
                                    </span>
                                    <span className="px-3 py-0.5 bg-green-100 text-green-600 rounded-full text-sm border border-green-200 font-medium">
                                        Closed
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Lead Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-base">Lead information</span>
                                <Pencil size={15} className="text-gray-400 hover:text-orange-500 hover:cursor-pointer" />
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><CalendarDays size={14} />Date Created</div>
                                    <span>10 June 2026, 11:45 pm</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Link2 size={14} />Value</div>
                                    <span>$4,50,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><CalendarDays size={14} />Due Date</div>
                                    <span>25 June 2026, 11:45 pm</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500"><Phone size={14} />Follow Up</div>
                                    <span>25 June 2026</span>
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
                                        className={`flex-1 min-w-[90px] h-10 flex items-center justify-center text-white text-xs font-semibold relative ${stage.color}
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
        </div>
    )
}

export default Leads_details;
