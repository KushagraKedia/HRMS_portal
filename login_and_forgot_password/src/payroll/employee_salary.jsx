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

function EmployeeSalary (){
    
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

    const text = " > Payroll > Employee Salary";
    return(
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="w-full bg-[#F8F9FA] text-black flex-1 h-screen overflow-y-auto">


                {/* HEADING-1 */}
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


                {/* HEADING-2*/}
                <div className="mx-8">
                    <div className="h-20 flex ">
                        <div className="w-[40%] pl-7 flex flex-col py-5 justify-between">
                            <div className="text-3xl font-semibold">Tickets Details</div>
                            <div className="flex items-center"><img src={homeIcon} alt="home" className="h-3 w-3"/><span className="pl-1.5">{text}</span></div>
                        </div>
                        <div className="w-[60%] flex items-center gap-4 justify-end">
                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={exportIcon} alt="export" className="h-4 w-4"/>
                                <span>Export</span>
                                <img src={arrowIcon} alt="arrow" className="h-4 w-4"/>                               
                            </button>
                            <button className="bg-orange-500 rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-600">
                                <img src={plusIcon} alt="export" className="h-4 w-4"/>
                                <span className="text-white font-semibold">Add Ticket</span>
                            </button>
                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-500">
                                <img src={upArrowIcon} alt="export" className="h-4 w-4 m-1"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className=" mt-5 w-[95%] mx-[2.5%]></div> */}
                <div className="border border-gray-200 rounded-lg mx-[2.5%] w-[95%] my-5">

                    <div className="px-3 py-4 border-b border-b-gray-200 flex gap-30">
                        <span className="text-lg font-semibold">Employee Salary List</span>
                        <span className="border border-gray-200 rounded-lg px-3 py-1 flex items-center gap-2">
                            <img src={calendar} alt="icon" className="w-4 h-4" />
                            06/08/2026 - 06/14/2026
                        </span>
                        <span className="border border-gray-200 rounded-lg px-3 py-1">Designation:<select>
                            <option>Finance</option>
                            <option>Developer</option>
                            <option>Executive</option>
                            <option>Manager</option>
                        </select></span>
                        <span className="border border-gray-200 rounded-lg px-3 py-1">Sort By:<select>
                            <option>Recently Added</option>
                            <option>Ascending</option>
                            <option>Descending</option>
                            <option>Last Month</option>
                            <option>Last 7 Day</option>
                        </select></span>
                    </div>

                    <div className="flex justify-between py-3 ">
                        <span className=" text-lg text-gray-400 mx-3">Rows Per Page <span>{rowsPerPage}</span> Entries</span>
                        <input type="search" placeholder="Search" className=" border border-gray-200 rounded-lg mx-3"/>
                    </div>
                {/* TABLE */}
                <table className="w-[100%] border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] border rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-sm font-semibold border-b-gray-200">
                            <th className="p-3 text-left flex justify-between">
                                Employee ID
                                <img src={sort} alt="sort" className="w-4 h-4" />
                            </th>
                            <th className="p-3 text-left ">
                                <sapn>Name</sapn>
                                {/* <img src={sort} alt="sort1" className="w-4 h-4" /> */}
                            </th>
                            <th className="p-3 text-left flex justify-between">Email<img src={sort} alt="sort1" className="w-4 h-4" /></th>
                            <th className="p-3 text-left ">Phone</th>
                            <th className="p-3 text-left flex justify-between">Designation <img src={sort} alt="sort1" className="w-4 h-4" /></th>
                            <th className="p-3 text-left">Joined Date</th>
                            <th className="p-3 text-left flex justify-between">Salary<img src={sort} alt="sort1" className="w-4 h-4" /></th>
                            <th className="p-3 text-left">Payslip</th>
                            <th className="p-3 text-left flex justify-between">Actions<img src={sort} alt="sort1" className="w-4 h-4" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.map((employee) => (
                            <tr key={employee.id} className="border-b hover:bg-gray-50">
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500">{employee.id}</td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 flex items-center gap-2">
                                    <div><img src={employee.avatar} alt="dp" className="w-8 h-8 rounded-full object-cover" /></div>
                                    <div>
                                        <div className="text-sm">{employee.name}</div>
                                        <div className="text-xs text-gray-500">{employee.designation}</div>
                                    </div>
                                </td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500">{employee.email}</td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500">{employee.phone}</td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200">{employee.designation}</td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500">{employee.joined}</td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500">{employee.salary}</td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200">
                                    <div className="px-2 rounded-lg w-fit py-1 bg-black text-sm text-white">Generate Slip</div>
                                </td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 flex gap-2 items-center">
                                    <img src={edit} alt="icon" className="w-4 h-4 hover:cursor-pointer" />
                                    <img src={deleteIcon} alt="icon" className="w-4 h-4 hover:cursor-pointer" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>

                {/* BOTTOM */}
                <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12 mt-0 justify-between p-2 w-full mt-5">
                    <p>Copyright-2026 ©KK.</p>
                    <p>Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
        </div>
    )
}

export default EmployeeSalary;