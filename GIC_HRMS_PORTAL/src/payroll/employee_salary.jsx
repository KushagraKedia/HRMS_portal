import Sidebar from "../components/sidebar";
import fullScreen from "./assests_p/fullscreen.png"
import gridApplication from "./assests_p/grid-2x2-check.png"
import messageIcon from "./assests_p/message.png"
import mailIcon from "./assests_p/mail.png"
import bellIcon from "./assests_p/bell.png"
import personIcon from "./assests_p/person-m-4.webp"
import homeIcon from "./assests_p/home.png"
import exportIcon from "./assests_p/export.png"
import arrowIcon from "./assests_p/downArrow.png"
import plusIcon from "./assests_p/circle-plus.png"
import upArrowIcon from "./assests_p/upArrow.png"
import person1 from "./assests_p/person-f-1.webp"
import person2 from "./assests_p/person-f-2.webp"
import person3 from "./assests_p/person-f-3.webp"
import person4 from "./assests_p/person-m-1.webp"
import person5 from "./assests_p/person-m-2.webp"
import person6 from "./assests_p/person-m-3.webp"
import person7 from "./assests_p/person-m-4.webp"
import person8 from "./assests_p/person-m-5.webp"
import person9 from "./assests_p/person-m-6.webp"
import person10 from "./assests_p/person9.webp"
import person11 from "./assests_p/person10.webp"
import edit  from "./assests_p/edit.png";
import deleteIcon from "./assests_p/delete.png"
import sort from "./assests_p/sort.png"
import calendar from "./assests_p/calendar-1.png"

import {useState} from "react";
import { Menu, X } from "lucide-react";

function EmployeeSalary (){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const employees = [
        { id: "EMP-001", name: "Andrea Wells",   avatar: person1 , designation: "Web Designer",         type: "Full Time", email: "andrea@example.com",   joined: "Jan 01, 2023", salary: "$4,500", phone:  "9876543210"},
        { id: "EMP-002", name: "Clare Bold",     avatar: person2, designation: "Web Developer",        type: "Part Time", email: "clare@example.com",    joined: "Feb 15, 2023", salary: "$3,200", phone:  "9988776655"},
        { id: "EMP-003", name: "Dean Thomas",    avatar: person3, designation: "React Developer",      type: "Full Time", email: "dean@example.com",     joined: "Mar 10, 2023", salary: "$5,800", phone:  "9871234567"},
        { id: "EMP-004", name: "Erwin Peters",   avatar: person4, designation: "HR Manager",           type: "Full Time", email: "erwin@example.com",    joined: "Apr 05, 2023", salary: "$6,000", phone:  "9012345678"},
        { id: "EMP-005", name: "Frances Boone",  avatar: person5, designation: "iOS Developer",        type: "Contract",  email: "frances@example.com",  joined: "May 20, 2023", salary: "$5,200", phone:  "9765432109"},
        { id: "EMP-006", name: "Gabe Palmer",    avatar: person6, designation: "UI/UX Designer",       type: "Full Time", email: "gabe@example.com",     joined: "Jun 08, 2023", salary: "$4,200", phone:  "9345678901"},
        { id: "EMP-007", name: "Helena Lynch",   avatar: person7, designation: "Project Manager",      type: "Full Time", email: "helena@example.com",   joined: "Jul 15, 2023", salary: "$7,000", phone:  "9898989898"},
        { id: "EMP-008", name: "Ivan Lewis",     avatar: person8, designation: "QA Engineer",          type: "Part Time", email: "ivan@example.com",     joined: "Aug 01, 2023", salary: "$3,500", phone:  "9556677889"},
        { id: "EMP-009", name: "Janice Voit",    avatar: person9, designation: "DevOps Engineer",      type: "Full Time", email: "janice@example.com",   joined: "Sep 12, 2023", salary: "$6,800", phone:  "9812345670"},
        { id: "EMP-010", name: "Kevin Durean",   avatar: person10, designation: "Backend Developer",    type: "Contract",  email: "kevin@example.com",    joined: "Oct 25, 2023", salary: "$5,500", phone:  "9874563210"},
        { id: "EMP-011", name: "Lina Norris",    avatar: person11, designation: "Marketing Manager",    type: "Full Time", email: "lina@example.com",     joined: "Nov 03, 2023", salary: "$5,100", phone:  "9321456780"},
        { id: "EMP-012", name: "Monroe Foster",  avatar: person7, designation: "Data Analyst",         type: "Full Time", email: "monroe@example.com",   joined: "Dec 18, 2023", salary: "$4,800", phone:  "9789012345"},
    ];

    const [showModel,setShowModel] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(employees.length / rowsPerPage);
    const lastRowIndex = currentPage*rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const currentEmployees = employees.slice(firstRowIndex,lastRowIndex);

    const handleNext = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const text = " > Payroll > Employee Salary";
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

                {/* HEADING-1 */}
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

                {/* HEADING-2 */}
                <div className="mx-3 md:mx-8">
                    <div className="flex flex-col md:flex-row md:h-20 py-3 md:py-0">
                        <div className="md:w-[40%] pl-2 md:pl-7 flex flex-col py-2 md:py-5 justify-between">
                            <div className="text-2xl md:text-3xl font-semibold">Tickets Details</div>
                            <div className="flex items-center text-sm"><img src={homeIcon} alt="home" className="h-3 w-3"/><span className="pl-1.5">{text}</span></div>
                        </div>
                        <div className="md:w-[60%] flex items-center gap-3 md:gap-4 justify-start md:justify-end mt-3 md:mt-0 flex-wrap">
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
                </div>

                {/* BODY */}
                <div className="border border-gray-200 rounded-lg mx-[2.5%] w-[95%] my-5 shadow-[0_1px_3px_rgba(0,0,0,0.12)]">

                    {/* Filters row — wraps on mobile */}
                    <div className="px-3 py-4 border-b border-b-gray-200 flex flex-wrap gap-3 items-center">
                        <span className="text-lg font-semibold w-full md:w-auto">Employee Salary List</span>
                        <span className="border border-gray-200 rounded-lg px-3 py-1 flex items-center gap-2 text-sm">
                            <img src={calendar} alt="icon" className="w-4 h-4" />
                            06/08/2026 - 06/14/2026
                        </span>
                        <span className="border border-gray-200 rounded-lg px-3 py-1 text-sm">Designation:
                            <select>
                                <option>Finance</option>
                                <option>Developer</option>
                                <option>Executive</option>
                                <option>Manager</option>
                            </select>
                        </span>
                        <span className="border border-gray-200 rounded-lg px-3 py-1 text-sm">Sort By:
                            <select>
                                <option>Recently Added</option>
                                <option>Ascending</option>
                                <option>Descending</option>
                                <option>Last Month</option>
                                <option>Last 7 Day</option>
                            </select>
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between py-3 gap-3 md:gap-0">
                        <span className="text-sm text-gray-500 mx-3">Rows Per Page <span>{rowsPerPage}</span> Entries</span>
                        <input type="search" placeholder="Search" className="border border-gray-200 rounded-lg mx-3 px-3 py-1 text-sm"/>
                    </div>

                    {/* TABLE — horizontally scrollable on mobile */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-gray-200 border rounded-lg min-w-[900px]">
                            <thead>
                                <tr className="bg-gray-200 text-sm font-semibold border-b-gray-200">
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            Employee ID
                                            <img src={sort} alt="sort" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            <span>Name</span>
                                            <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            Email
                                            <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            Phone
                                            <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            Designation
                                            <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            Joined Date
                                            <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            Salary
                                            <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            Payslip
                                            <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                    <th className="p-3 text-left">
                                        <div className="flex justify-between">
                                            Actions
                                            <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.map((employee) => (
                                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500 text-sm">{employee.id}</td>
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200 ">
                                            <div className="flex items-center gap-2">
                                            <img src={employee.avatar} alt="dp" className="w-8 h-8 rounded-full object-cover" />
                                            <div>
                                                <div className="text-sm">{employee.name}</div>
                                                <div className="text-xs text-gray-500">{employee.designation}</div>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500 text-sm">{employee.email}</td>
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500 text-sm">{employee.phone}</td>
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200 text-sm">{employee.designation}</td>
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500 text-sm">{employee.joined}</td>
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500 text-sm">{employee.salary}</td>
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200">
                                            <div className="px-2 rounded-lg w-fit py-1 bg-black text-sm text-white whitespace-nowrap">Generate Slip</div>
                                        </td>
                                        <td className="px-3 py-4 text-left border-b border-b-gray-200 ">
                                            <div className="flex gap-3.5 items-center">
                                            <img src={edit} alt="icon" className="w-4 h-4 hover:cursor-pointer" onClick={() => setShowModel(true)}/>
                                            <img src={deleteIcon} alt="icon" className="w-4 h-4 hover:cursor-pointer" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Showing {firstRowIndex+1} - {lastRowIndex} of {employees.length} entries</span>
                        <div>
                            <button className="text-xl text-gray-500 hover:cursor-pointer mr-4" onClick={handlePrev} disabled={currentPage == 1}>←</button>
                            <span className="mr-4 bg-orange-400 rounded-full text-white px-2.5 py-1 h-fit w-fit">{currentPage}</span>
                            <button className="text-xl text-gray-500 hover:cursor-pointer" onClick={handleNext} disabled={currentPage== totalPages}>→</button>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] mt-0 justify-between p-2 w-full mt-5 text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
            {/* {
            showModel && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white w-[800px] rounded-lg shadow-lg">
                        <div className="p-">
                            
                            <div className="flex justify-between border-b-gray-400 border-b p-3">
                                <span className="text-xl font-semibold">Edit Employee Salary</span>
                                <button onClick={()=>setShowModel(false)} className="hover:cursor-pointer">✖</button>
                            </div>
                            
                            <div className="flex justify-between border-b-gray-400 border-b p-3">
                                <div className="w-[50%] test-left flex flex-col">
                                    <span className="text-gray-600 font-bold text-sm">Employee Name</span>
                                    <select className="mt-2 p-1 border border-gray-400 rounded-lg text-sm">
                                        <option>Select</option><option>Anthony Lewis</option><option>Brian</option><option>Sam Will Tarly</option>
                                    </select>
                                    <span className="text-gray-600 font-bold mt-2">Earnings</span>
                                    <div className="flex gap-[50%]">
                                        <span className="text-gray-600 font-bold text-sm mt-2">Basic</span>
                                        <span className="text-gray-600 font-bold text-sm mt-2">DA(40%)</span>
                                    </div>
                                    <div className="flex gap-10">
                                        <input type="text" className="rounded border border-gray-300" />
                                        <input type="text" className="rounded border border-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            } */}
        </div>
    )
}

export default EmployeeSalary;