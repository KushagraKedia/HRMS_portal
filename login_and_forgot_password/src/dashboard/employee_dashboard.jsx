import Sidebar from "../components/sidebar";
import bellIcon from "./assests_d/bell.png";
import fullScreen from "./assests_d/fullscreen.png";
import gridApplication from "./assests_d/grid-2x2-check.png";
import messageIcon from "./assests_d/message.png";
import mailIcon from "./assests_d/mail.png";
import personIcon from "./assests_d/person9.webp";
import homeIcon from "./assests_d/home.png"
import exportIcon from "./assests_d/export.png"
import arrowIcon from "./assests_d/downArrow.png"
import plusIcon from "./assests_d/circle-plus.png"
import upArrowIcon from "./assests_d/upArrow.png"
import calendarIcon from "./assests_d/calendar-1.png"
import crossIcon from "./assests_d/x.png";
import person11 from "./assests_d/person11.webp";
import person12 from "./assests_d/person12.webp"
import bg1 from "./assests_d/background.webp";
import phone from "./assests_d/phone.png";
import chat from "./assests_d/chat.png";
import person13 from "./assests_d/person13.webp";
import person14 from "./assests_d/person14.webp";
import person15 from "./assests_d/person15.webp";
import person16 from "./assests_d/person16.webp";
import person17 from "./assests_d/person17.webp";
import ss1 from "./assests_d/ss1.png";
import ss2 from "./assests_d/ss2.png";
import ss3 from "./assests_d/ss3.png";
import ss4 from "./assests_d/ss4.png";
import increase from "./assests_d/arrow.png"
import decrease from "./assests_d/arrow-2.png"
import Dounet_chart from "./employee_dashboard_charts/Dounet_chart"
import AttendenceTrend from "./employee_dashboard_charts/AttendenceTrend"
import AttendenceSummary from "./employee_dashboard_charts/AttendenceSummary"
import WorkHoursTimeline from "./employee_dashboard_charts/WorkHoursTimeline"
import fingerprint from "./assests_d/fingerprint.png";
import noti_img from "./assests_d/noti_img.png";
import dots from "./assests_d/dots.png";
import users from "./assests_d/users.png"
import Deadline from "./assests_d/deadline.png"
import Tasks from "./assests_d/tasks.png"
import grid from "./assests_d/grid.png";
import star from "./assests_d/star.png";

import { useState } from "react";


function Employee_Dashboard(){
    const text =" > Dashboard > Employee Dashboard";
    const [checked, setChecked] = useState(false);
    return(
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="w-full bg-[#F8F9FA] text-black flex-1 h-screen overflow-y-auto">
                <div className="w-full border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 flex items-center justify-between p-3 bg-white">
                    <div>
                        <span className="ml-10 text-4xl font-bold">GIC FOLKS</span>
                    </div>
                    <div className="flex gap-4 mr-5">
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer">
                            <img src={fullScreen} alt="full" className="h-4 w-4 "/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer">
                            <img src={gridApplication} alt="grid" className="h-4 w-4 "/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer">
                            <img src={messageIcon} alt="message" className="h-4 w-4 "/>
                        </button>
                        <button className="p-2 hover:bg-[#D0D0D0] m-0 rounded-xl hover:cursor-pointer">
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

                <div className="h-20 flex mx-5">
                    <div className="w-[40%] pl-1 flex flex-col py-5 justify-between">
                        <div className="text-3xl font-semibold">Employee Dashboard</div>
                        <div className="flex items-center"><img src={homeIcon} alt="home" className="h-3 w-3"/><span className="pl-1.5">{text}</span></div>
                    </div>
                    <div className="w-[60%] flex items-center gap-4 justify-end">
                        <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <img src={exportIcon} alt="export" className="h-4 w-4"/>
                            <span>Export</span>
                            <img src={arrowIcon} alt="arrow" className="h-4 w-4"/>
                        </button>
                        <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-3 hover:cursor-pointer hover:bg-orange-600">
                            <span>10-06-2026</span>
                            <img src={calendarIcon} alt="export" className="h-4 w-4"/>
                        </button>
                        <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-500">
                            <img src={upArrowIcon} alt="export" className="h-4 w-4 m-1"/>
                        </button>
                    </div>
                </div>

                <div className="bg-gray-200 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-10 mx-5 mt-6 flex items-center justify-between">
                    <span className="text-gray-600 mx-3">Your Leave Request on “24th June 2026” has been Approved!!!</span>
                    <img src={crossIcon} alt="x" className="h-7 w-7 hover:cursor-pointer mr-3" />
                </div>


                {/* ROW 1 */}
                <div className="flex gap-5 mx-5 my-7 items-center h-95">
                    {/* PERSONAL DETAILS */}
                    <div className="h-full w-[33%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300 flex flex-col">
                        {/* HEADING */}
                        <div className="w-full h-[20%] bg-[#1F252D] rounded-t-lg flex gap-6">
                            <img src={person11} alt="person" className="w-12 h-12 rounded-full ml-7 border-3 border-white mt-3" />
                            <div className="flex flex-col mt-3">
                                <div className="text-white text-lg">Dev Patel</div>
                                <div className="text-white text-xs">Senior Product Designer -- UI/UX Design</div>
                            </div>
                        </div>
                        <div className="mx-7 mt-4.5 text-gray-500 text-lg">Phone Number</div>
                        <div className="mx-7 text-sm">+91-9732468312</div>
                        <div className="mx-7 mt-4.5 text-gray-500 text-lg">Email Address</div>
                        <div className="mx-7 text-sm">devpatel1@gmail.com</div>
                        <div className="mx-7 mt-4.5 text-gray-500 text-lg">Report Office</div>
                        <div className="mx-7 text-sm">Doglas Martini</div>
                        <div className="mx-7 mt-4.5 text-gray-500 text-lg">Joined on</div>
                        <div className="mx-7 text-sm">15 Jan 2024</div>
                    </div>

                    {/* LEAVE DETAILS */}
                    <div className="h-full w-[38%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                        {/* HEADING */}
                        <div className="w-full h-[20%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">Leave Details</span>
                            <button className="flex items-center gap-2.5 m-6 border border-gray-300 px-2 py-1 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={calendarIcon} alt="icon" className="w-4 h-4" />
                                <span>2026</span>
                            </button>
                        </div>
                        {/* BODY */}
                        <AttendenceSummary />
                    </div>

                    {/* LEAVE DETAILS */}
                    <div className="h-full w-[28%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300 flex flex-col">
                        {/* HEADING */}
                        <div className="w-full h-[20%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">Leave Details</span>
                            <button className="flex items-center gap-2.5 m-6 border border-gray-300 px-2 py-1 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={calendarIcon} alt="icon" className="w-4 h-4" />
                                <span>2026</span>
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="w-full h-[55%] flex mx-8 mt-5 mb-3">
                            <div className="w-[50%] flex flex-col ">
                                <div className="text-gray-500">Total Leaves</div>
                                <div className="font-bold text-xl">16</div>
                                <div className="text-gray-500 mt-4">Absent</div>
                                <div className="font-bold text-xl">2</div>
                                <div className="text-gray-500 mt-4">Worked Days</div>
                                <div className="font-bold text-xl">240</div>
                            </div>
                            <div className="w-[50%] flex flex-col ">
                                <div className="text-gray-500">Taken</div>
                                <div className="font-bold text-xl">10</div>
                                <div className="text-gray-500 mt-4">Request</div>
                                <div className="font-bold text-xl">0</div>
                                <div className="text-gray-500 mt-4">Loss of Pay</div>
                                <div className="font-bold text-xl">2</div>
                            </div>
                        </div>
                        <button className="h-10 text-white bg-[#1F252D] mx-8 mb-3 rounded-lg hover:cursor-pointer hover:bg-black">Apply New Leave</button>

                    </div>
                </div>

                {/* SECOND ROW */}
                <div className="flex gap-5 mx-5 my-7 items-center h-95">


                    {/* ATTENDENCE */}
                    <div className="h-full w-[33%] bg-[#FFF7ED] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-2 border-[#FF6B1A] flex flex-col items-center">
                        <div className="text-gray-500 text-lg font-semibold mt-3">Attendence</div>
                        <div className="text-xl font-semibold">08:35 AM, 11 June 2026</div>
                        <Dounet_chart />
                        <button className="px-4 py-1.5 font-semibold text-white bg-[#1F252D] rounded-lg text-sm hover:cursor-pointer">Production : 3.45 hrs</button>
                        <div className="flex items-center gap-2 mt-1">
                            <img src={fingerprint} alt="icon" className="h-6 w-6" />
                            <div className="font-semibold my-2">Punch In at 10.00 AM</div>
                        </div>
                        <button className="px-35 text-white font-semibold py-1 mt-2 hover:cursor-pointer hover:bg-orange-600 bg-orange-500 rounded-lg">Punch Out</button>
                    </div>

                    {/* RIGHT BOXES */}
                    <div className="h-full w-[66%] flex flex-col gap-4">
                        <div className="flex h-[50%] gap-4">

                            {/* BOX-1 */}
                            <div className="w-[25%] h-full bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300 flex flex-col">
                                <img src={ss1} alt="icon" className="h-8 w-8  mx-5 mt-5 rounded-lg" />
                                <div className="flex items-center mt-3 gap-2 ml-5">
                                    <span className="text-2xl font-semibold">8.36  / </span>
                                    <span className="text-2xl font-semibold text-gray-500">9</span>
                                </div>
                                <div className="font-semibold text-gray-600 mx-5 mt-2 border-b border-b-gray-200 pb-2">Total Hours Today</div>
                                <div className="flex gap-2 mx-5 mt-2 items-center">
                                    <img src={increase} alt="icon" className="w-5 h-5 rounded-full" />
                                    <span className="text-sm text-gray-500">5% This Week</span>
                                </div>
                            </div>

                            {/* BOX-2 */}
                            <div className="w-[25%] h-full bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                                <img src={ss2} alt="icon" className="h-8 w-8  mx-5 mt-5 rounded-lg" />
                                <div className="flex items-center mt-3 gap-2 ml-5">
                                    <span className="text-2xl font-semibold">10  / </span>
                                    <span className="text-2xl font-semibold text-gray-500">40</span>
                                </div>
                                <div className="font-semibold text-gray-600 mx-5 mt-2 border-b border-b-gray-200 pb-2">Total Hours Week</div>
                                <div className="flex gap-2 mx-5 mt-2 items-center">
                                    <img src={increase} alt="icon" className="w-5 h-5 rounded-full" />
                                    <span className="text-sm text-gray-500">7% Last Week</span>
                                </div>
                            </div>

                            {/* BOX-3 */}
                            <div className="w-[25%] h-full bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                                <img src={ss3} alt="icon" className="h-8 w-8  mx-5 mt-5 rounded-lg" />
                                <div className="flex items-center mt-3 gap-2 ml-5">
                                    <span className="text-2xl font-semibold">75  / </span>
                                    <span className="text-2xl font-semibold text-gray-500">98</span>
                                </div>
                                <div className="font-semibold text-gray-600 mx-5 mt-2 border-b border-b-gray-200 pb-2">Total Hours Month</div>
                                <div className="flex gap-2 mx-5 mt-2 items-center">
                                    <img src={decrease} alt="icon" className="w-5 h-5 rounded-full" />
                                    <span className="text-sm text-gray-500">8% Last Month</span>
                                </div>
                            </div>

                            {/* BOX-4 */}
                            <div className="w-[25%] h-full bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                                <img src={ss4} alt="icon" className="h-8 w-8  mx-5 mt-5 rounded-lg" />
                                <div className="flex items-center mt-3 gap-2 ml-5">
                                    <span className="text-2xl font-semibold">16  / </span>
                                    <span className="text-2xl font-semibold text-gray-500">28</span>
                                </div>
                                <div className="font-semibold text-gray-600 mx-5 mt-2 border-b border-b-gray-200 pb-2 text-sm">Overtime this Month</div>
                                <div className="flex gap-2 mx-5 mt-2 items-center">
                                    <img src={decrease} alt="icon" className="w-5 h-5 rounded-full" />
                                    <span className="text-sm text-gray-500">6% Last Month</span>
                                </div>
                            </div>

                        </div>

                        {/* LONG BOX */}
                        <div className="w-full bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300 h-[50%]">
                            <WorkHoursTimeline />
                        </div>
                    </div>
                </div>

                {/* THIRD ROW */}
                <div className="flex gap-5 mx-5 my-7 items-center h-95">
                    {/* PROJECTS */}
                    <div className="h-full w-[50%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                        {/* HEADING */}
                        <div className="w-full h-[20%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">Projects</span>
                            <button className="flex items-center gap-2.5 m-6 py-1 rounded-lg px-3 hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <span>Ongoing Projects</span>
                            </button>
                        </div>    
                            {/* BODY */}
                            <div className="flex gap-4 p-4 h-[80%]">
                                <div className="w-[50%] h-full border border-gray-200 rounded-lg px-3 flex flex-col justify-evenly">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Office Management</span>
                                        <img src={dots} alt="icon" className="h-4 w-4 hover:cursor-pointer" />
                                    </div>
                                    <div className="flex items-cente ">
                                        <img src={person17} alt="person" className="h-10 w-10 rounded-full" />
                                        <div className="flex flex-col gap-0 ml-3">
                                           <span className="whitespace-nowrap font-medium">Daksh Agrawal</span>
                                           <span className="text-sm text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-cente">
                                        <img src={Deadline} alt="person" className="h-10 w-10 rounded-full" />
                                        <div className="flex flex-col gap-0 ml-3">
                                           <span className="whitespace-nowrap font-medium">14th June 2026</span>
                                           <span className="text-sm text-gray-500">Deadline</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 w-full bg-gray-100 py-1 rounded border border-dashed border-gray-300">
                                        <img src={Tasks} alt="img" className="w-5 h-5 ml-2" />
                                        <span className="text-gray-500">Tasks:</span>
                                        <span>6</span>
                                        <span className="text-gray-500">/ 10</span>
                                        <img src={users} alt="icon" className="w-5 h-5 ml-23" />
                                    </div>
                                    <div className="flex items-center gap-1.5 w-full bg-gray-300 h-auto justify-between py-1.5 rounded px-2">
                                        <span className="text-sm text-gray-600">Time Spent</span>
                                        <div>
                                            <span className="font-bold">65/120</span>
                                            <span className="ml-1 text-gray-500">Hrs</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="w-[50%] h-full border border-gray-200 rounded-lg px-3 flex flex-col justify-evenly">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Office Management</span>
                                        <img src={dots} alt="icon" className="h-4 w-4 hover:cursor-pointer" />
                                    </div>
                                    <div className="flex items-cente ">
                                        <img src={person16} alt="person" className="h-10 w-10 rounded-full" />
                                        <div className="flex flex-col gap-0 ml-3">
                                           <span className="whitespace-nowrap font-medium">Amir Khan</span>
                                           <span className="text-sm text-gray-500">Project Leader</span>
                                        </div>
                                    </div>
                                    <div className="flex items-cente">
                                        <img src={Deadline} alt="person" className="h-10 w-10 rounded-full" />
                                        <div className="flex flex-col gap-0 ml-3">
                                           <span className="whitespace-nowrap font-medium">24th June 2026</span>
                                           <span className="text-sm text-gray-500">Deadline</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 w-full bg-gray-100 py-1 rounded border border-dashed border-gray-300">
                                        <img src={Tasks} alt="img" className="w-5 h-5 ml-2" />
                                        <span className="text-gray-500">Tasks:</span>
                                        <span>8</span>
                                        <span className="text-gray-500">/ 10</span>
                                        <img src={users} alt="icon" className="w-5 h-5 ml-23" />
                                    </div>
                                    <div className="flex items-center gap-1.5 w-full bg-gray-300 h-auto justify-between py-1.5 rounded px-2">
                                        <span className="text-sm text-gray-600">Time Spent</span>
                                        <div>
                                            <span className="font-bold">88/120</span>
                                            <span className="ml-1 text-gray-500">Hrs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    {/* TASKS */}
                    <div className="h-full w-[50%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                        {/* HEADING */}
                        <div className="w-full h-[20%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">Tasks</span>
                            <button className="flex items-center gap-2.5 m-6 py-1 rounded-lg px-3 hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <span>All Projects</span>
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="flex flex-col h-[80%] justify-evenly gap-3 px-5 py-3">
                            {/* ROW-1 */}
                            <div className="w-full border rounded-lg border-gray-300 h-auto flex items-center py-2 px-4">
                                <img src={grid} alt="grid" className="w-4 h-4" />
                                <button onClick={() => setChecked(!checked)} className={`w-4 h-4 border mx-3 rounded-md flex items-center justify-center transition-all ${checked ? "bg-orange-500 text-white" : "border-gray-300 bg-white" }`}>
                                    {checked && "✓"}</button>
                                <img src={star} alt="star" className="w-4 h-4 hover:cursor-pointer" />
                                <span className="font-semibold mx-4 text-sm">Patient appointment booking</span>
                                <span className="bg-[#FFDBEC] text-[#FD3995] px-3 py-1 ml-25 rounded-lg text-xs font-semibold">● Onhold</span>
                                <img src={users} alt="icon" className="w-5 h-5 ml-7 hover:cursor-pointer" />
                            </div>
                            {/* ROW-2 */}
                            <div className="w-full border rounded-lg border-gray-300 h-auto flex items-center py-2 px-4">
                                <img src={grid} alt="grid" className="w-4 h-4" />
                                <button onClick={() => setChecked(!checked)} className={`w-4 h-4 border mx-3 rounded-md flex items-center justify-center transition-all ${checked ? "bg-orange-500 text-white" : "border-gray-300 bg-white" }`}>
                                    {checked && "✓"}</button>
                                <img src={star} alt="star" className="w-4 h-4 hover:cursor-pointer" />
                                <span className="font-semibold mx-4 text-sm">Appointment booking with payment</span>
                                <span className="bg-[#F7EEF9] text-[#AB47BC] px-3 py-1 ml-14 rounded-lg text-xs font-semibold">● Inprogress</span>
                                <img src={users} alt="icon" className="w-5 h-5 ml-3 hover:cursor-pointer" />
                            </div>
                            {/* ROW-3 */}
                            <div className="w-full border rounded-lg border-gray-300 h-auto flex items-center py-2 px-4">
                                <img src={grid} alt="grid" className="w-4 h-4" />
                                <button onClick={() => setChecked(!checked)} className={`w-4 h-4 border mx-3 rounded-md flex items-center justify-center transition-all ${checked ? "bg-orange-500 text-white" : "border-gray-300 bg-white" }`}>
                                    {checked && "✓"}</button>
                                <img src={star} alt="star" className="w-4 h-4 hover:cursor-pointer" />
                                <span className="font-semibold mx-4 text-sm">Patient and Doctor video conferencing</span>
                                <span className="bg-[#E5F9EE] text-[#03C95A] px-3 py-1 ml-11 rounded-lg text-xs font-semibold">● Completed</span>
                                <img src={users} alt="icon" className="w-5 h-5 ml-2 hover:cursor-pointer" />
                            </div>
                            {/* ROW-4 */}
                            <div className="w-full border rounded-lg border-gray-300 h-auto flex items-center py-2 px-4">
                                <img src={grid} alt="grid" className="w-4 h-4" />
                                <button onClick={() => setChecked(!checked)} className={`w-4 h-4 border mx-3 rounded-md flex items-center justify-center transition-all ${checked ? "bg-orange-500 text-white" : "border-gray-300 bg-white" }`}>
                                    {checked && "✓"}</button>
                                <img src={star} alt="star" className="w-4 h-4 hover:cursor-pointer" />
                                <span className="font-semibold mx-4 text-sm">Private chat module</span>
                                <span className="bg-[#EDF2F4] text-[#0C4B5E] px-3 py-1 ml-41 rounded-lg text-xs font-semibold">● Pending</span>
                                <img src={users} alt="icon" className="w-5 h-5 ml-5 hover:cursor-pointer" />
                            </div>
                            {/* ROW-5 */}
                            <div className="w-full border rounded-lg border-gray-300 h-auto flex items-center py-2 px-4">
                                <img src={grid} alt="grid" className="w-4 h-4" />
                                <button onClick={() => setChecked(!checked)} className={`w-4 h-4 border mx-3 rounded-md flex items-center justify-center transition-all ${checked ? "bg-orange-500 text-white" : "border-gray-300 bg-white" }`}>
                                    {checked && "✓"}</button>
                                <img src={star} alt="star" className="w-4 h-4 hover:cursor-pointer" />
                                <span className="font-semibold mx-4 text-sm">Go-Live and Post-Implementation Support</span>
                                <span className="bg-[#F7EEF9] text-[#AB47BC] px-3 py-1 ml-6 rounded-lg text-xs font-semibold">● Inprogress</span>
                                <img src={users} alt="icon" className="w-5 h-5 ml-2 hover:cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOURTH ROW */}
                <div className="flex gap-5 mx-5 my-7 items-center h-105">

                    {/* PERFORMANCE */}
                    <div className="h-full w-[40%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                        {/* HEADING */}
                        <div className="w-full h-[17%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">Performance</span>
                            <button className="flex items-center gap-2.5 m-6 border border-gray-300 px-2 py-1 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={calendarIcon} alt="icon" className="w-4 h-4" />
                                <span>2026</span>
                            </button>
                        </div>
                        {/* HEADING-2 */}
                        <div className="flex items-center mx-4 my-4 bg-gray-200 py-1 rounded-lg gap-3">
                            <div className="font-bold text-lg ml-2">98%</div>
                            <div className="text-xs text-green-500 px-1.5 bg-green-200 rounded-xl border border-green-500 mt-1">12%</div>
                            <div className="text-sm text-gray-600">vs Last Years</div>
                        </div>
                        {/* BODY */}
                        <AttendenceTrend />
                    </div>

                    {/* MY SKILLS */}
                    <div className="h-full w-[35%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                        {/* HEADING */}
                        <div className="w-full h-[17%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">My Skills</span>
                            <button className="flex items-center gap-2.5 m-6 border border-gray-300 px-2 py-1 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={calendarIcon} alt="icon" className="w-4 h-4" />
                                <span>2026</span>
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="flex flex-col justify-evenly h-[82%] mx-4">
                            <div className="bg-gray-200 px-3 py-1.5 rounded-lg">
                                <div className="font-semibold">Figma</div>
                                <div className="text-sm text-gray-600">Updated : 15 May 2026</div>
                            </div>
                            <div className="bg-gray-200 px-3 py-1.5 rounded-lg">
                                <div className="font-semibold ">HTML</div>
                                <div className="text-sm text-gray-600">Updated : 12 May 2026</div>
                            </div>
                            <div className="bg-gray-200 px-3 py-1.5 rounded-lg">
                                <div className="font-semibold ">CSS</div>
                                <div className="text-sm text-gray-600">Updated : 11 June 2026</div>
                            </div>
                            <div className="bg-gray-200 px-3 py-1.5 rounded-lg">
                                <div className="font-semibold ">Wordpress</div>
                                <div className="text-sm text-gray-600">Updated : 10 June 2026</div>
                            </div>
                            <div className="bg-gray-200 px-3 py-1.5 rounded-lg">
                                <div className="font-semibold ">Javascript</div>
                                <div className="text-sm text-gray-600">Updated : 25 May 2026</div>
                            </div>
                        </div>
                    </div>

                    {/* THREE BOXES */}
                    <div className="h-full w-[29%] flex flex-col gap-4">

                        {/* BIRTHDAY BOX */}
                        <div className="w-full h-[60%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300 flex flex-col items-center" style={{backgroundImage: `url(${bg1})`,}}>
                            <span className="text-xl text-white font-semibold px-6 pt-6 pb-4">Team Birthday</span>
                            <img src={person12} alt="perosn" className="h-15 w-15 rounded-full" />
                            <span className=" text-white font-semibold pt-2">Vijay Singhanaya</span>
                            <span className="text-sm text-gray-500 font-semibold ">IOS Developer</span>
                            <button className="px-2.5 py-1 rounded-lg bg-orange-500 mt-2 text-white text-sm hover:cursor-pointer hover:bg-orange-600">Send Wishes</button>
                        </div>

                        {/* LEAVE POLICY */}
                        <div className="w-full h-[20%] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300 flex items-center bg-[#0C4B5E]">
                            <div className="flex flex-col w-[55%] ml-6">
                                <div className="text-white font-bold text-lg">Leave Policy</div>
                                <div className="text-white ">Last Updated : Today</div>
                            </div>
                            <button className="flex items-center gap-2.5 m-6 bg-white px-2.5 py-1 rounded-lg hover:cursor-pointer hover:bg-orange-400 hover:text-white">
                                <span className="font-semibold text-sm">View All</span>
                            </button>
                        </div>

                        {/* HOLDIDAY BOX */}
                        <div className="w-full h-[20%] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300 flex items-center bg-[#FFC107]">
                            <div className="flex flex-col w-[55%] ml-6">
                                <div className=" font-bold text-lg">Next Holiday</div>
                                <div className="text-sm">Independence Day, 15th Aug 2026</div>
                            </div>
                            <button className="flex items-center gap-2.5 m-6 bg-white px-2.5 py-1 rounded-lg hover:cursor-pointer hover:bg-orange-400 hover:text-white">
                                <span className="font-semibold text-sm">View All</span>
                            </button>
                        </div>
                    </div>
                </div>


                {/* FIFTH ROW */}
                <div className="flex gap-5 mx-5 my-7 items-center h-110">

                    {/* TEAM MEMBERS */}
                    <div className="h-full w-[33%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                        {/* HEADING */}
                        <div className="w-full h-[17%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">Team Members</span>
                            <button className="flex items-center gap-2.5 m-6 border border-gray-300 px-2.5 py-1 rounded-lg hover:cursor-pointer hover:bg-[#f3f0f0] bg-[#d0d0d0]">
                                <span className="font-semibold text-sm">View All</span>
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="flex flex-col justify-around mx-6 h-[83%]">
                            {/* ROW-1 */}
                            <div className="flex items-center">
                                <img src={person12} alt="person" className="h-10 w-10 rounded-full" />
                                <div className="flex flex-col gap-0 ml-3">
                                    <span className="whitespace-nowrap font-medium">Alexander Jermai</span>
                                    <span className="text-sm text-gray-500">UI/UX Designer</span>
                                </div>
                                <div className="ml-auto flex gap-1.5">
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={phone} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={mailIcon} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={chat} alt="icon" className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                            {/* ROW-2 */}
                            <div className="flex items-center">
                                <img src={person13} alt="person" className="h-10 w-10 rounded-full" />
                                <div className="flex flex-col gap-0 ml-3">
                                    <span className="whitespace-nowrap font-medium">Alia Bhat</span>
                                    <span className="text-sm text-gray-500">Product Designer</span>
                                </div>
                                <div className="ml-auto flex gap-1.5">
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={phone} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={mailIcon} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={chat} alt="icon" className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                            {/* ROW-3 */}
                            <div className="flex items-center">
                                <img src={person15} alt="person" className="h-10 w-10 rounded-full" />
                                <div className="flex flex-col gap-0 ml-3">
                                    <span className="whitespace-nowrap font-medium">Varun Dhawan</span>
                                    <span className="text-sm text-gray-500">Project Manger</span>
                                </div>
                                <div className="ml-auto flex gap-1.5">
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={phone} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={mailIcon} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={chat} alt="icon" className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                            {/* ROW-4 */}
                            <div className="flex items-center">
                                <img src={person16} alt="person" className="h-10 w-10 rounded-full" />
                                <div className="flex flex-col gap-0 ml-3">
                                    <span className="whitespace-nowrap font-medium">Amir Khan</span>
                                    <span className="text-sm text-gray-500">Team Lead</span>
                                </div>
                                <div className="ml-auto flex gap-1.5">
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={phone} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={mailIcon} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={chat} alt="icon" className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                            {/* ROW-5 */}
                            <div className="flex items-center">
                                <img src={person14} alt="person" className="h-10 w-10 rounded-full" />
                                <div className="flex flex-col gap-0 ml-3">
                                    <span className="whitespace-nowrap font-medium">Shreya Goshwal</span>
                                    <span className="text-sm text-gray-500">Team Lead</span>
                                </div>
                                <div className="ml-auto flex gap-1.5">
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={phone} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={mailIcon} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={chat} alt="icon" className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                            {/* ROW-6 */}
                            <div className="flex items-center">
                                <img src={person17} alt="person" className="h-10 w-10 rounded-full" />
                                <div className="flex flex-col gap-0 ml-3">
                                    <span className="whitespace-nowrap font-medium">Daksh Agrawal</span>
                                    <span className="text-sm text-gray-500">Project Lead</span>
                                </div>
                                <div className="ml-auto flex gap-1.5">
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={phone} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={mailIcon} alt="icon" className="h-4 w-4" />
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-gray-200">
                                        <img src={chat} alt="icon" className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NOTIFICATIONS */}
                    <div className="h-full w-[33%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                        {/* HEADING */}
                        <div className="w-full h-[17%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">Notifications</span>
                            <button className="flex items-center gap-2.5 m-6 border border-gray-300 px-2.5 py-1 rounded-lg hover:cursor-pointer hover:bg-[#f3f0f0] bg-[#ded5d5]">
                                <span className="font-semibold text-sm">View All</span>
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="px-5 py-5">
                            {/* NOTI-1 */}
                        <div className="flex gap-2.5">
                            <img src={person11} alt="person" className="w-9 h-9 rounded-full" />
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Dev Patel sent dashboard report</div>
                                <span className="font-semibold text-xs text-gray-500">Today at 9:42 AM</span>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <img src={noti_img} alt="image" className="h-6 w-6 rounded-lg border-2 border-gray-300 mt-2 ml-12" />
                            <span className="hover:pointer-cursor hover:text-orange-500 mt-1">EY_review.pdf</span>
                        </div>
                        {/* NOTI-2 */}
                        <div className="flex gap-2.5 mt-5">
                            <img src={person12} alt="person" className="w-9 h-9 rounded-full" />
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Alexander Jermai requested access to UNIX</div>
                                <span className="font-semibold text-xs text-gray-500">Today at 10:00 AM</span>
                            </div>
                        </div>
                        {/* NOTI-3 */}
                        <div className="flex gap-2.5 mt-5">
                            <img src={person13} alt="person" className="w-9 h-9 rounded-full" />
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Lex Murphy requested access to UNIX</div>
                                <span className="font-semibold text-xs text-gray-500">Today at 10:50 AM</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="text-white px-2.5 text-sm py-1 h-auto bg-orange-500 rounded-lg mt-2 ml-15 hover:cursor-pointer hover:bg-orange-600">Approve</button>
                            <button className="border px-2.5 text-sm py-1 h-auto border-orange-500 rounded-lg mt-2 text-orange-500 hover:cursor-pointer hover:bg-orange-500 hover:text-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.12)]">Decline</button>
                        </div>
                        {/* NOTI-4 */}
                        <div className="flex gap-2.5 mt-5">
                            <img src={person14} alt="person" className="w-9 h-9 rounded-full" />
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Shreya Goshwal requested access to UNIX</div>
                                <span className="font-semibold text-xs text-gray-500">Today at 12:00 PM</span>
                            </div>
                        </div>
                        {/* NOTI-5 */}
                        <div className="flex gap-2.5 mt-5">
                            <img src={person15} alt="person" className="w-9 h-9 rounded-full" />
                            <div className="flex flex-col">
                                <div className="font-semibold text-sm">Varun Dhawan requested access for ppt</div>
                                <span className="font-semibold text-xs text-gray-500">Today at 05:00 PM</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* MEETING SCHEDULE */}
                    <div className="h-full w-[33%] bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-gray-300">
                        {/* HEADING */}
                        <div className="w-full h-[17%] rounded-t-lg flex gap-6 border-b border-b-gray-200 items-center justify-between">
                            <span className="p-5 text-xl font-semibold">Meeting Schedule</span>
                            <button className="flex items-center gap-2.5 m-6 border border-gray-300 px-2 py-1 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={calendarIcon} alt="icon" className="w-4 h-4" />
                                <span>Today</span>
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="h-full flex mt-5 mx-4">
                            <div className="h-full w-[30%] mr-4 mt-4">
                                <div className="h-[67%] flex flex-col justify-between relative">
                                <div className="absolute left-[78px] top-2 bottom-2 border-r border-dashed border-gray-300 z-0"></div>
                                <div className="flex items-center relative z-10">
                                  <span className="text-gray-500 text-sm w-[75px]">12:25 AM</span>
                                  <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
                                </div>
                                <div className="flex items-center relative z-10">
                                  <span className="text-gray-500 text-sm w-[75px]">11:20 AM</span>
                                  <div className="w-3 h-3 rounded-full bg-[#0C4B5E]"></div>
                                </div>
                                <div className="flex items-center relative z-10">
                                  <span className="text-gray-500 text-sm w-[75px]">10:18 AM</span>
                                  <div className="w-3 h-3 rounded-full bg-[#F4B400]"></div>
                                </div>
                                <div className="flex items-center relative z-10">
                                  <span className="text-gray-500 text-sm w-[75px]">09:10 AM</span>
                                  <div className="w-3 h-3 rounded-full bg-[#03C95A]"></div>
                                </div>
                            </div>
                            </div>
                            <div className="h-[82%] w-[70%] flex flex-col gap-6">
                                <div className="px-3 py-2 bg-gray-200 rounded-lg">
                                    <div className="font-semibold text-sm">Marketing Strategy Presentation</div>
                                    <div className="text-sm text-gray-500">Marketing</div>
                                </div>
                                <div className="px-3 py-2 bg-gray-200 rounded-lg">
                                    <div className="font-semibold text-sm">Design Review Hospital, doctors Management Project</div>
                                    <div className="text-sm text-gray-500">Review</div>
                                </div>
                                <div className="px-3 py-2 bg-gray-200 rounded-lg">
                                    <div className="font-semibold text-sm">Birthday Celebration of Employee</div>
                                    <div className="text-sm text-gray-500">Celebration</div>
                                </div>
                                <div className="px-3 py-2 bg-gray-200 rounded-lg">
                                    <div className="font-semibold text-sm">Update of Project Flow</div>
                                    <div className="text-sm text-gray-500">Development</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex bg-white border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12 mt-0 justify-between p-2 w-auto">
                    <p>Copyright-2026 ©KK.</p>
                    <p>Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
        </div>
    )
}

export default Employee_Dashboard;