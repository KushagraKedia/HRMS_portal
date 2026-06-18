import Button from "./Button"
import homeIcon from "../assets/home.png"
import calenderIcon from "../assets/calendar.png"
import yearlyReport from "../assets/file-input.png"
import dashboardIcon from "../assets/layout-dashboard.png"
import userIcon from "../assets/user-star.png"
import extraIcon from "../assets/boxes.png"
import pageIcon from "../assets/sticky-note.png"
import applicationIcon from "../assets/layout-grid.png"
import layoutIcon from "../assets/layout-panel-left.png"
import background from "../assets/background.webp"
import calendar from "../assets/calendar-1.png";
import clockIcon from "../assets/clock-11.png";
import calendar2Icon from "../assets/calendar-2.png";
import videoIcon from "../assets/video.png";
import calendar3Icon from "../assets/calendar-3.png";
import GICLogo from "../assets/gic-logo-white.png"
import benifitDeductionGraph from "../assets/benifit-deduction-graph.png"
import personM1 from "../assets/person-m-1.webp"
import personM2 from "../assets/person-m-2.webp"
import personM3 from "../assets/person-m-3.webp"
import personF1 from "../assets/person-f-1.webp"
import personF2 from "../assets/person-f-2.webp"
import personM4 from "../assets/person-m-4.webp"
import personM5 from "../assets/person-m-5.webp"
import personM6 from "../assets/person-m-6.webp"
import attendenceTrendGraph from "../assets/attendence-trend.png"
import recruitmentGraph from "../assets/recruitment-statistics.png"
import totalEmployeeGraph from "../assets/total_employee.png";
import newJoineesGraph from "../assets/new_joinees.png";
import lateArrivalsGraph from "../assets/late_arrivals.png";
import totalPayroll from "../assets/total_payroll.png"
import increaseIcon from "../assets/arrow.png";
import decreaseIcon from "../assets/arrow-2.png";
import salaryIcon from "../assets/salary.png";
import Sidebar from "../components/sidebar";
import AttendenceChart from "./charts/AttendenceGraph.jsx";
import SkillChart from "./charts/SkillChart.jsx";
import RecruitmentStatistics from "./charts/RecuritmentStatistics.jsx"
import TopEmployeeGraph from "./charts/TopEmployeeGraph.jsx";

import { useState } from "react";
import { Menu, X } from "lucide-react";

function Dashboard(){
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const text =" > Dashboard > HR Dashboard";

    const fullTime = 42;
    const contract = 18;
    const probation = 5;

    return (
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

            {/* Top Navbar */}
            <div className="w-full border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 flex items-center justify-begin p-3">
                <span className="ml-14 md:ml-10 text-2xl md:text-4xl font-bold" >GIC FOLKS</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] items-start md:justify-around md:items-center py-3 md:py-2 px-4 md:px-0 gap-3 md:gap-0">
                <div>
                    <h1 className="font-bold text-black text-2xl md:text-3xl">HR Dashboard</h1>
                    <h3 className="font-AbeeZee text-[#808080]">
                        <div className="flex flex-row">
                        <img src={homeIcon} alt="Home" className="h-3 w-3 mt-3"/>
                        <p className="m-1 text-sm">{text}</p>
                        </div>
                    </h3>
                </div>

               <div className="bg-white flex flex-row justify-center items-center gap-2 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-2 border-gray-200 border text-sm">
                    <img src={calenderIcon} alt="calendar" className="h-4 w-4" />
                    <p>01/06/2026 - 30/06/2026</p>
                </div>

                <div className="flex gap-3">
                    <button className="bg-white hover:cursor-pointer p-2 rounded-lg flex justify-around items-center gap-2 hover:bg-[#f3f0f0] border-gray-200 border shadow-[0_1px_3px_rgba(0,0,0,0.12)] text-sm">
                        <img src={yearlyReport} alt="calendar" className="h-4 w-4 " />
                        Yearly Report
                    </button>

                    <button className="text-white bg-orange-500 hover:cursor-pointer hover:bg-orange-700 p-2 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 border text-sm">
                        Add New
                    </button>
                </div>
            </div>

            {/* Row 1: Employee Status + Pending Approvals */}
            <div className="flex flex-col md:flex-row md:h-120">
                <div className="flex w-full md:w-[70%] flex-col mt-8">

                    {/* EMPLOYEE BOX */}
                    <div className="bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-60 rounded-lg p-2 mx-3 md:ml-10 md:mr-0">
                        <div className=" w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-11 flex items-center rounded-lg px-3 justify-between border-l-orange-500 border-l-4">
                        <p className="text-base font-bold">Employee Status & type</p>
                        <button className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg  text-sm py-1 px-2 bg-[#f3f0f0] hover:cursor-pointer hover:bg-white">View All</button>
                        </div>
                        <div className="flex gap-[3px] items-end h-16 mt-5 mx-1">
                           {[...Array(fullTime)].map((_, i) => (
                             <div key={`f-${i}`} className="w-[4px] h-16 bg-orange-500 rounded-full" />
                           ))}
                           {[...Array(contract)].map((_, i) => (
                             <div key={`c-${i}`} className="w-[4px] h-16 bg-cyan-700 rounded-full" />
                           ))}
                           {[...Array(probation)].map((_, i) => (
                             <div key={`p-${i}`} className="w-[4px] h-16 bg-gray-200 rounded-full" />
                           ))}
                         </div>
                     <div className="flex justify-between mt-3 px-5">
                           <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">1054</h2>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                                <span className="text-gray-500">Full-Time</span>
                              </div>
                            </div>
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">568</h2>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-1 h-8 bg-cyan-700 rounded-full"></div>
                                <span className="text-gray-500">Contract</span>
                              </div>
                            </div>
                            <div>
                              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">80</h2>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-1 h-8 bg-gray-300 rounded-full"></div>
                                <span className="text-gray-500">Probation</span>
                              </div>
                            </div>
                          </div>
                    </div>

                    {/* LEAVE BOX */}
                    <div className="bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg h-45 mt-7 p-2 mx-3 md:ml-10 md:mr-0">
                        <div className=" w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-11 flex items-center rounded-lg px-3 justify-between border-l-orange-500 border-l-4">
                        <p className="text-base font-bold">Leave Type Distribution</p>
                        <button className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg  text-sm py-1 px-2 flex items-center gap-1 hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <img src={calendar} alt="Home" className="h-4 w-4"/>
                            <p>Monthly</p>
                        </button>
                        </div>
                        <div className="bg-white rounded-xl flex justify-between items-center">

                        {/* Left Side Graph */}
                        <div className="relative w-[180px] h-[70px]">
                          <svg viewBox="0 0 180 100" className="absolute inset-0">
                            <path d="M20 90 A70 70 0 0 1 160 90" fill="none" stroke="#ececec" strokeWidth="6" />
                            <path d="M35 90 A55 55 0 0 1 145 90" fill="none" stroke="#ececec" strokeWidth="6" />
                            <path d="M50 90 A40 40 0 0 1 130 90" fill="none" stroke="#ececec" strokeWidth="6" />
                            <path d="M20 90 A70 70 0 0 1 160 90" fill="none" stroke="#ef8b57" strokeWidth="6" strokeDasharray="180 40" />
                            <path d="M35 90 A55 55 0 0 1 145 90" fill="none" stroke="#ef8b57" strokeWidth="6" strokeDasharray="120 50" />
                            <path d="M50 90 A40 40 0 0 1 130 90" fill="none" stroke="#efb18f" strokeWidth="6" strokeDasharray="60 80" />
                          </svg>
                        </div>

                        {/* Right Side */}
                        <div className="pt-5">
                         <div className="flex items-center justify-between p-1 gap-1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              <span className="text-sm">Sick Leave</span>
                            </div>
                            <div className="px-3 rounded-full bg-gray-100">45</div>
                          </div>
                          <div className="flex items-center justify-between p-1 gap-1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              <span className="text-sm">Casual Leave</span>
                            </div>
                            <div className="px-3  rounded-full bg-gray-100">68</div>
                          </div>
                          <div className="flex items-center justify-between p-1 gap-1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              <span className="text-sm">Unpaid</span>
                            </div>
                            <div className="px-3 rounded-full bg-gray-100">12</div>
                          </div>
                        </div>

                      </div>
                    </div>
                </div>

                {/* OVERVIEW STATISTICS */}
                <div className="border bg-white border-gray-200 mx-3 md:ml-10 mt-8 w-auto md:w-full md:mr-10 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12)] px-4 py-2">
                    <div className=" w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-12 flex items-center rounded-lg p-3 justify-between border-l-orange-500 border-l-4">
                        <p className="text-lg font-bold">Overview Statistics</p>
                        <button className="border-gray-200 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)]  text-sm py-1 px-2 flex items-center gap-1 hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <img src={calendar} alt="Home" className="h-4 w-4"/>
                            <p>Monthly</p>
                        </button>
                    </div>

                    <div className="flex mt-7 gap-4">
                        {/* TOTAL EMPLOYEE BOX */}
                       <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] w-[50%] rounded-lg h-40 p-2">
                        <div className="p-2 flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <img src={totalEmployeeGraph} alt="Home" className="h-11 w-11 rounded-full"/>
                                <span className="text-sm md:text-lg font-bold text-gray-500">Total Employess</span>
                            </div>
                            <div className="flex items-center justify-between mr-3">
                                <span className="text-lg md:text-3xl ml-1 font-bold pt-2">1,848</span>
                                <div className="flex mt-2 ml-2 px-2 md:px-3 py-1.5 border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] bg-[#f3f0f0] border rounded-2xl gap-1 md:gap-2 items-center">
                                    <span className="text-xs md:text-sm"> +18% </span>
                                    <img src={increaseIcon} alt="inc" className="h-5 w-5 rounded-full rotate-35"/>
                                </div>
                            </div>
                            <span className="text-gray-500 text-sm mt-0.5 ml-1">Headcount Overview</span>
                        </div>
                        </div>

                       {/* NEW JOINEE BOX */}
                       <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] w-[50%] rounded-lg p-2">
                        <div className="p-2 flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <img src={newJoineesGraph} alt="Home" className="h-11 w-11 rounded-full"/>
                                <span className="text-sm md:text-lg font-bold text-gray-500">New Joinees</span>
                            </div>
                            <div className="flex items-center justify-between mr-3">
                                <span className="text-lg md:text-3xl ml-1 font-bold pt-2">1,248</span>
                                <div className="flex mt-2 ml-2 px-2 md:px-3 py-1.5 border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] bg-[#f3f0f0] border rounded-2xl gap-1 md:gap-2 items-center">
                                    <span className="text-xs md:text-sm"> +22% </span>
                                    <img src={increaseIcon} alt="inc" className="h-5 w-5 rounded-full rotate-35"/>
                                </div>
                            </div>
                            <span className="text-gray-500 md:text-sm text-xs mt-0.5 md:ml-1">All Department</span>
                        </div>
                       </div>
                    </div>

                    <div className="flex mt-7 gap-4">
                        {/* LATE ARRIVAL BOX */}
                       <div className="border-gray-200 border shadow-[0_1px_3px_rgba(0,0,0,0.12)] w-[50%] rounded-xl h-40 p-2">
                        <div className="p-2 flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <img src={lateArrivalsGraph} alt="Home" className="h-11 w-11 rounded-full"/>
                                <span className="text-sm md:text-lg font-bold text-gray-500">Late Arrivals Today</span>
                            </div>
                            <div className="flex items-center justify-between mr-3">
                                <span className="text-lg md:text-3xl ml-1 font-bold pt-2">12</span>
                                <div className="flex mt-2 ml-2 px-2 md:px-3 py-1.5 border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] bg-[#f3f0f0] border rounded-2xl gap-1 md:gap-2 items-center">
                                    <span className="text-xs md:text-sm"> -16% </span>
                                    <img src={decreaseIcon} alt="inc" className="h-5 w-5 rounded-full rotate-[-35deg]"/>
                                </div>
                            </div>
                            <span className="text-gray-500 text-xs md:text-xs mt-0.5 md:ml-1">Delayed Logins Today</span>
                        </div>
                        </div>

                       {/* TOTAL PAYROLL BOX */}
                       <div className="border-gray-200 border shadow-[0_1px_3px_rgba(0,0,0,0.12)] w-[50%] rounded-xl p-2">
                        <div className="p-2 flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <img src={totalPayroll} alt="Home" className="h-11 w-11 rounded-full"/>
                                <span className="text-sm md:text-lg font-bold text-gray-500">Total Payroll Cost</span>
                            </div>
                            <div className="flex items-center justify-between mr-3">
                                <span className="text-lg md:text-3xl ml-1 font-bold pt-2">$2.4M</span>
                                <div className="flex mt-2 ml-2  px-2 md:px-3 py-1.5 border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] bg-[#f3f0f0] border rounded-2xl gap-2 items-center">
                                    <span className="text-xs md:text-sm"> +16% </span>
                                    <img src={increaseIcon} alt="inc" className="h-5 w-5 rounded-full rotate-35"/>
                                </div>
                            </div>
                            <span className="text-gray-500 text-sm mt-0.5 ml-1">Payroll Outflow</span>
                        </div>
                       </div>
                    </div>
                </div>
            </div>


            {/* Row 2: Attendance + Skill Chart */}
            <div className="flex flex-col md:flex-row mt-5 mx-3 md:mx-10 gap-5 md:h-140">
                {/* ATTENDANCE BOX */}
                <div className="bg-white w-full md:w-[65%] md:h-120 md:my-10 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg p-2">
                        <div className=" w-full border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 h-11 flex items-center rounded-lg px-3 justify-between border-l-orange-500 border-l-4">
                        <p className="text-base font-bold">Attendence Trend</p>
                        <button className="border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border rounded-lg  text-sm py-1 px-2 flex gap-1 items-center hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <img src={calendar} alt="Home" className="h-4 w-4"/>
                            Weekly
                        </button>
                        </div>
                        <AttendenceChart />
                </div>
                {/* TOP EMPLOYEE DISTRIBUTION BOX */}
                <div className="bg-white w-full md:w-[35%] md:h-120 md:my-10 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg p-2">
                        <div className=" w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-11 flex items-center rounded-lg pl-3 px-3 justify-between border-l-orange-500 border-l-4">
                        <p className="text-base font-bold">Top Employee Distribution</p>
                        <button className="border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border rounded-lg  text-sm px-2 py-1 bg-[#f3f0f0] hover:bg-white hover:cursor-pointer">View All</button>
                        </div>
                        <div>
                            <SkillChart />
                        </div>
                </div>
            </div>

            {/* Row 3: Late Arrivals + Recruitment + Upcoming Interviews */}
            <div className="flex flex-col md:flex-row md:h-140 mx-3 md:mx-10 mt-5 gap-5">

                {/* LATE ARRIVALS BOX */}
                <div className="bg-white w-full md:w-[33%] md:h-120 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg p-2">
                    <div className=" w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-11 flex items-center rounded-lg pl-3 px-3 justify-between border-l-orange-500 border-l-4">
                        <p className="text-base font-bold">Late Arrivals Today</p>
                        <button className="border-gray-200 border shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg  text-sm py-1 px-2 flex gap-1 items-center hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <img src={calendar} alt="Home" className="h-4 w-4"/>
                            Today
                        </button>
                    </div>
                        <div className="flex flex-col mt-2 h-100 justify-evenly items-left gap-2">

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-[19%] p-2 rounded-lg bg-[#f7f0f0] gap-0 flex flex-col">
                            <div className="flex justify-between px-3">
                                <div className="flex items-center justify-center gap-1">
                                    <img src={personM1} alt="person" className="h-8 w-8 rounded-full"/>
                                    <span className="font-bold">Aarav Sharma</span>
                                </div>
                            <div className="flex justify-center items-center gap-1">
                                <img src={clockIcon} alt="Calendar" className="h-3 w-3"/>
                                <span>10:15 AM</span>
                            </div>
                            </div>
                            <div className="flex justify-between px-3">
                                <span className="ml-9 text-sm">Customer Support</span>
                                <span className="text-red-500 bg-red-200 font-bold px-1 rounded-2xl text-sm">+45 min</span>
                            </div>
                        </div>

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-[19%] p-2 rounded-lg bg-[#f7f0f0] gap-0 flex flex-col">
                            <div className="flex justify-between px-3 gap-2">
                            <div className="flex items-center justify-center gap-1">
                                    <img src={personF1} alt="person" className="h-8 w-8 rounded-full"/>
                                    <span className="font-bold">Priya Patel</span>
                                </div>
                            <div className="flex justify-center items-center gap-1">
                                <img src={clockIcon} alt="Calendar" className="h-3 w-3"/>
                                <span>10:25 AM</span>
                            </div>
                            </div>
                            <div className="flex justify-between px-3">
                                <span className="ml-9 text-sm">HR Admin</span>
                                <span className="text-red-500 bg-red-200 font-bold px-1 rounded-2xl text-sm">+55 min</span>
                            </div>
                        </div>

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-[19%] p-2 rounded-lg bg-[#f7f0f0] gap-0 flex flex-col">
                            <div className="flex justify-between px-3 gap-2">
                            <div className="flex items-center justify-center gap-1">
                                    <img src={personM2} alt="person" className="h-8 w-8 rounded-full"/>
                                    <span className="font-bold">Aman Jain</span>
                            </div>
                            <div className="flex justify-center items-center gap-1">
                                <img src={clockIcon} alt="Calendar" className="h-3 w-3"/>
                                <span>10:00 AM</span>
                            </div>
                            </div>
                            <div className="flex justify-between px-3">
                                <span className="ml-9 text-sm">Sales</span>
                                <span className="text-red-500 bg-red-200 font-bold px-1 rounded-2xl text-sm">+30 min</span>
                            </div>
                        </div>

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-[19%] p-2 rounded-lg bg-[#f7f0f0] gap-0 flex flex-col">
                            <div className="flex justify-between px-3 gap-2">
                            <div className="flex items-center justify-center gap-1">
                                    <img src={personF2} alt="person" className="h-8 w-8 rounded-full"/>
                                    <span className="font-bold">Meera Iyer</span>
                            </div>
                            <div className="flex justify-center items-center gap-1">
                                <img src={clockIcon} alt="Calendar" className="h-3 w-3"/>
                                <span>9:50 AM</span>
                            </div>
                            </div>
                            <div className="flex justify-between px-3">
                                <span className="ml-9 text-sm">Administration</span>
                                <span className="text-red-500 bg-red-200 font-bold px-1 rounded-2xl text-sm">+20 min</span>
                            </div>
                        </div>

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-[19%] p-2 rounded-lg bg-[#f7f0f0] gap-0 flex flex-col">
                            <div className="flex justify-between px-3 gap-2">
                            <div className="flex items-center justify-center gap-1">
                                    <img src={personM3} alt="person" className="h-8 w-8 rounded-full"/>
                                    <span className="font-bold">Nitin Shah</span>
                            </div>
                            <div className="flex justify-center items-center gap-1">
                                <img src={clockIcon} alt="Calendar" className="h-3 w-3"/>
                                <span>10:12 AM</span>
                            </div>
                            </div>
                            <div className="flex justify-between px-3">
                                <span className="ml-9 text-sm">Finance</span>
                                <span className="text-red-500 bg-red-200 font-bold px-1 rounded-2xl text-sm">+42 min</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* RECRUITMENT + TRAINING BOX */}
                <div className="w-full md:w-[33%] md:h-120">
                    <div className="flex flex-col">

                        {/* RECRUITMENT BOX */}
                        <div className="mt-0 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white p-2">
                            <div className=" w-full border border-gray-200 h-11 flex items-center rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] pl-3 px-3 justify-between border-l-orange-500 border-l-4">
                               <p className="text-sm font-bold">Recruitment Statistics</p>
                               <button className="border-gray-200 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)]  text-sm py-1 px-2 flex gap-1 items-center hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={calendar} alt="Home" className="h-4 w-4"/>
                                Weekly
                                </button>
                            </div>
                            <RecruitmentStatistics />
                        </div>

                        {/* TRAINING BOX */}
                        <div className="mt-6 h-32 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white p-2" style={{ backgroundImage: `url(${background})` }}>
                            <p className="font-bold text-black pl-4 pt-3 text-lg">Employees in Training</p>
                            <p className="font-bold text-white text-3xl pl-4">80</p>
                        </div>
                    </div>
                </div>

                {/* UPCOMING INTERVIEWS BOX */}
                <div className="bg-white w-full md:w-[33%] md:h-120 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg p-2">
                    <div className=" w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-11 flex items-center rounded-lg px-3 justify-between border-l-orange-500 border-l-4">
                        <p className="text-base font-bold">Upcoming Interview</p>
                        <button className="border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border rounded-lg  text-sm py-1 px-2 flex items-center gap-1 hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <img src={calendar} alt="Home" className="h-4 w-4"/>
                            Today
                        </button>
                    </div>

                    <div className="flex flex-col bg-white h-[80%] gap-2 mt-2">

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-[50%] p-2 rounded-lg flex flex-col">
                            <p className="ml-3 mt-3 font-bold text-lg md:text-xl">UI/UX Design Interview</p>
                            <span className="ml-3 text-[#a9a9a9] text-base md:text-lg">12:00 PM - 01:50 PM</span>
                            <div className="flex gap-3 md:gap-7 mt-6 md:mt-11 ml-3 flex-wrap">
                            <button className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-xl px-3 md:px-4 py-1 flex gap-2 hover:cursor-pointer hover:bg-orange-500 hover:text-white text-sm">
                                <img src={calendar3Icon} alt="calendar-3" className="h-4 w-4 mt-1"/>
                                Add to Calendar
                            </button>
                            <button className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg px-3 md:px-4 py-1 bg-[#f3f0f0] flex gap-2 hover:cursor-pointer hover:bg-white text-sm">
                                <img src={videoIcon} alt="join" className="h-4 w-4 mt-1"/>
                                Join Now
                            </button>
                            </div>
                        </div>

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-[50%] p-2 rounded-lg">
                            <p className="ml-3 mt-3 font-bold text-lg md:text-xl">Senior Developer React</p>
                            <span className="ml-3 text-[#a9a9a9] text-base md:text-lg">03:00 PM - 04:00 PM</span>
                            <div className="flex gap-3 md:gap-7 mt-6 md:mt-11 ml-3 flex-wrap">
                            <button className="border border-gray-200 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] px-3 md:px-4 py-1 flex gap-2 hover:cursor-pointer hover:bg-orange-500 hover:text-white text-sm">
                                <img src={calendar3Icon} alt="calendar-3" className="h-4 w-4 mt-1"/>
                                Add to Calendar
                            </button>
                            <button className="border border-gray-200 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] px-3 md:px-4 py-1 bg-[#f3f0f0] flex gap-2 hover:cursor-pointer hover:bg-white text-sm">
                                <img src={videoIcon} alt="join" className="h-4 w-4 mt-1"/>
                                Join Now
                            </button>
                            </div>
                        </div>
                    </div>
                    <button className=" mt-2.5 w-[33%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-xl bg-[#f3f0f0] hover:cursor-pointer text-sm">View All →</button>
                </div>
            </div>


            {/* Row 4: Benefits + Payroll + Top Employees + Pending Approvals */}
            <div className="flex flex-col md:flex-row md:h-120 mx-3 md:mx-10 mt-5 gap-5">

                <div className="w-full md:w-[60%]">
                    <div className="flex flex-row gap-5">

                        {/* BENEFITS BOX */}
                        <div className="h-30 bg-white w-[50%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg flex items-center justify-center">
                            <div className="md:w-[60%] w-[50%] flex flex-col">
                                <p className="pl-3 text-[#808080] md:text-sm text-xs w-full">Benefits Deductions</p>
                                <p className="text-xl md:text-3xl font-bold pl-3">$56K</p>
                                <p className="pl-3 pt-1 text-[#808080] md:text-sm text-xs">Insurance + 401(k)</p>
                            </div>
                            <div className="w-[40%]">
                                <img src={benifitDeductionGraph} alt="Home" className="h-20 w-30"/>
                            </div>
                        </div>

                        {/* PAYROLL BOX */}
                        <div className="h-30 bg-white w-[50%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg flex">
                            <div className="flex justify-center mt-3 px-3 flex-col w-[60%]">
                            <p className=" text-[#808080] md:text-sm text-xs">Total Payroll</p>
                            <p className="font-bold text-2xl md:text-3xl mt-1">$2.4M</p>
                            <div className="flex gap-1 text-sm">
                                <p className="text-[#008000]">+55%</p>
                                <p>Increased</p>
                            </div>
                            </div>
                            <div className="w-[40%] flex flex-col items-center justify-begin md:my-2 my-1 gap-3">
                                <button className=" border border-gray-200 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] md:my-1 md:mx-2 pr-1  flex items-center md:gap-1 hover:cursor-pointer hover:bg-[#f3f0f0] px-2 py-1 md:text-sm text-xs">
                                <img src={calendar} alt="Home" className="md:h-4 md:w-4 h-3 w-3"/>
                                <span>Monthly</span>
                                </button>
                            <img src={salaryIcon} alt="Home" className="md:h-12 md:w-15 h-8 w-10"/>
                            </div>
                        </div>
                    </div>

                    {/* TOP EMPLOYEES BOX */}
                    <div className="bg-white w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg p-2 mt-5">
                        <div className=" w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-11 flex items-center rounded-lg pl-3 px-3 justify-between border-l-orange-500 border-l-4">
                            <p className="font-bold">Top Employees</p>
                            <button className=" border border-gray-200 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-1 bg-[#f3f0f0] text-sm">1D   7D   1M   1Y</button>
                        </div>
                        <TopEmployeeGraph />
                    </div>
                </div>

                {/* PENDING APPROVALS BOX */}
                <div className="bg-white w-full md:w-[40%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg p-3">
                    <div className=" w-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-11 flex items-center rounded-lg pl-3 px-3 justify-between border-l-orange-500 border-l-4">
                        <p className="font-bold">Pending Approvals</p>
                        <button className=" border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg p-1 bg-[#f3f0f0] hover:cursor-pointer hover:bg-white text-sm">View All</button>
                    </div>
                    <div className="flex flex-col mt-4 justify-between items-left gap-2">

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] pt-2 rounded-xl pl-3 py-3">
                            <div className="flex">
                                <div className="w-[60%] flex flex-col">
                                    <div className="flex items-center justify-left gap-1">
                                    <img src={personM4} alt="person" className="h-8 w-8 rounded-full"/>
                                    <span className="font-bold">Sai Kishor</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[#808080] text-sm flex-wrap">
                                        <img src={clockIcon} alt="Calendar" className="h-3 w-3"/>
                                        <span>Jan 10 - Jan 16 |</span>
                                        <img src={calendar2Icon} alt="Calendar" className="h-3 w-3" />
                                        <span>4 days</span>
                                    </div>
                                    <p className="text-[#808080] text-sm">Reason: Family trip</p>
                                </div>
                                <div className="w-[40%] gap-2 flex items-center md:mt-2 mt-1 ml-2">
                                    <button className="text-white bg-orange-400 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-fit px-1 py-2 md:px-2 md:py-1 hover:cursor-pointer hover:bg-orange-500 text-xs md:text-sm">Approve</button>
                                    <button className="bg-white text-orange-400 border-orange-400 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-fit px-1 py-2 md:px-2 md:py-1 hover:cursor-pointer hover:bg-orange-400 hover:text-white text-xs md:text-sm">Decline</button>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] pt-2 rounded-xl pl-3 py-3">
                            <div className="flex">
                                <div className="w-[60%] flex flex-col">
                                    <div className="flex items-center justify-left gap-1">
                                    <img src={personM5} alt="person" className="h-8 w-8 rounded-full"/>
                                    <span className="font-bold">Daniel Martinez</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[#808080] text-sm flex-wrap">
                                        <img src={clockIcon} alt="Calendar" className="h-3 w-3"/>
                                        <span>Jan 3 - Jan 9 |</span>
                                        <img src={calendar2Icon} alt="Calendar" className="h-3 w-3" />
                                        <span>5 days</span>
                                    </div>
                                    <p className="text-[#808080] text-sm">Reason: Medical appointment</p>
                                </div>
                                <div className="w-[40%] gap-2 flex items-center md:mt-2 mt-1 ml-2">
                                    <button className="text-white bg-orange-400 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-fit px-1 py-2 md:px-2 md:py-1 hover:cursor-pointer hover:bg-orange-500 text-xs md:text-sm">Approve</button>
                                    <button className="bg-white text-orange-400 border-orange-400 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-fit px-1 py-2 md:px-2 md:py-1 hover:cursor-pointer hover:bg-orange-400 hover:text-white text-xs md:text-sm">Decline</button>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] pt-2 rounded-xl pl-3 py-3">
                            <div className="flex">
                                <div className="w-[60%] flex flex-col">
                                    <div className="flex items-center justify-left gap-1">
                                    <img src={personM6} alt="person" className="h-8 w-8 rounded-full"/>
                                    <span className="font-bold">Michael Brown</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[#808080] text-sm flex-wrap">
                                        <img src={clockIcon} alt="Calendar" className="h-3 w-3"/>
                                        <span>Jan 17 - Jan 23 |</span>
                                        <img src={calendar2Icon} alt="Calendar" className="h-3 w-3" />
                                        <span>3 days</span>
                                    </div>
                                    <p className="text-[#808080] text-sm">Reason: Personal work</p>
                                </div>
                                <div className="w-[40%] gap-2 flex items-center md:mt-2 mt-1 ml-2">
                                    <button className="text-white bg-orange-400 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-fit px-1 py-2 md:px-2 md:py-1 hover:cursor-pointer hover:bg-orange-500 text-xs md:text-sm">Approve</button>
                                    <button className="bg-white text-orange-400 border-orange-400 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] h-fit px-1 py-2 md:px-2 md:py-1 hover:cursor-pointer hover:bg-orange-400 hover:text-white text-xs md:text-sm">Decline</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] mt-5 justify-between p-2 w-full text-sm">
                <p>Copyright-2026 ©KK.</p>
                <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
            </div>

        </div>
        </div>
    )
}

export default Dashboard;