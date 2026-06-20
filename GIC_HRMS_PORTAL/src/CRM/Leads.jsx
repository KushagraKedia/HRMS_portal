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

import { useState } from "react";
import { Menu, X, Plus, Pencil, Trash2, Wallet, Mail, Phone, MapPin, MessageCircle, BookOpen } from "lucide-react";

function Leads(){

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const text ="  > CRM > Leads Grid";

    const leadColumns = [
        {   status: "Contacted",color: "#F4B400",count: 2,total: "$7,50,000",leads: [
                {initials: "SM",name: "Linda White",value: "$03,50,000",email: "linda@gmail.com",phone: "(193) 7839 748",location: "Austin, United States",iconBg: "#1AA3E8",},
            ],},
        {
            status: "Not Contacted",color: "#8E24AA",count: 2,total: "$7,60,000",
            leads: [{initials: "EJ",name: "Emily Johnson",value: "$3,50,000",email: "emily@gmail.com",phone: "(179) 7382 829",location: "Newyork, United States",iconBg: "#1F5FE0",
                },
                {
                    initials: "MG",name: "Maria Garcia",value: "$4,10,000",email: "maria@gmail.com",phone: "(120) 3728 039",location: "Denver, United States",iconBg: "#8E24AA",
                },],
        },
        {
            status: "Closed",color: "#03C95A",count: 45,total: "$15,44,540",
            leads: [{initials: "JS",name: "John Smith",value: "$3,20,000",email: "john@gmail.com",phone: "(123) 4567 890",location: "Chester, United Kingdom",iconBg: "#7C4DFF",
                },
                {
                    initials: "DL",name: "David Lee",value: "$3,10,000",email: "david@gmail.com",phone: "(183) 9302 890",location: "Charlotte, United States",iconBg: "#1F5FE0",
                },
                {
                    initials: "RM",name: "Robert Martinez",value: "$4,50,000",email: "robert@gmail.com",phone: "(163) 2459 315",location: "Bristol, United Kingdom",iconBg: "#2E7D32",
                },
            ],
        },
        {
            status: "Lost",color: "#E53935",count: 15,total: "$14,89,543",
            leads: [{initials: "MB",name: "Michael Brown",value: "$4,10,000",email: "micael@gmail.com",phone: "(184) 2719 738",location: "London, United Kingdom",iconBg: "#1F5FE0",
                },
                {
                    initials: "KD",name: "Karen Davis",value: "$4,00,000",email: "darleeo@gmail.com",phone: "(163) 2459 315",location: "Detroit, United States",iconBg: "#2E7D32",
                },
                {
                    initials: "JA",name: "James Anderson",value: "$3,40,000",email: "james@gmail.com",phone: "(168) 8392 823",location: "Manchester, United Kingdom",iconBg: "#1F5FE0",
                },
            ],
        },
    ];

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
                            <button className="bg-orange-500 rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-600">
                                <img src={plusIcon} alt="export" className="h-4 w-4"/>
                                <span className="text-white font-semibold text-sm">Add Ticket</span>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pb-8">
                        {leadColumns.map((column) => (
                            <div key={column.status} className="flex flex-col gap-4">

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
                                        <Plus size={16} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                                        <Pencil size={14} className="text-gray-500 hover:text-orange-500 hover:cursor-pointer" />
                                        <Trash2 size={14} className="text-gray-500 hover:text-red-500 hover:cursor-pointer" />
                                    </div>
                                </div>

                                {/* Lead Cards */}
                                {column.leads.map((lead) => (
                                    <div key={lead.email} className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] overflow-hidden">
                                        <div className="h-1" style={{ backgroundColor: column.color }}></div>
                                        <div className="p-3 md:p-4">

                                            {/* ICON And Name */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                                    {lead.initials}
                                                </div>
                                                <span className="font-semibold text-sm md:text-base">{lead.name}</span>
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
                        ))}
                    </div>

                </div>

                <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>

            </div>    
        </div>
    )
}

export default Leads;   