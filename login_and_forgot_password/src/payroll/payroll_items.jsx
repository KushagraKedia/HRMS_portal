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
import edit  from "./assests_p/edit.png";
import deleteIcon from "./assests_p/delete.png"
import sort from "./assests_p/sort.png"

import { useState } from "react";

function Payroll_items(){

    const employees = [
        { id: "EMP-001", name: "Arrears of Salary" , Category: "Additional Remuneration", deafult: "$8"},
        { id: "EMP-002", name: "Leave Balance Amount", Category: "Monthly Remuneration", deafult: "$5"},
        { id: "EMP-003", name: "Gratuity", Category: "Monthly Remuneration" , deafult: "$20"}
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

    const text = " > Payroll > Payroll items";
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
                            <div className="text-3xl font-semibold">Payroll Items</div>
                            <div className="flex items-center"><img src={homeIcon} alt="home" className="h-3 w-3"/><span className="pl-1.5">{text}</span></div>
                        </div>
                        <div className="w-[60%] flex items-center gap-4 justify-end">
                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={exportIcon} alt="export" className="h-4 w-4"/>
                                <span>Export</span>
                                <img src={arrowIcon} alt="arrow" className="h-4 w-4"/>                               
                            </button>
                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-500">
                                <img src={upArrowIcon} alt="export" className="h-4 w-4 m-1"/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* HEADING-3 */}
                <div className="flex justify-between mx-8 p-3 my-5">
                    <div className="flex gap-5">
                        <button className="bg-[#1F252D] rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer ">
                            <span className="text-white font-semibold">Additions</span>
                        </button>
                        <button className="rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-[#f3f0f0] border border-gray-200">
                            <span className=" font-semibold">Overtime</span>
                        </button>
                        <button className="rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-[#f3f0f0] border border-gray-200">
                            <span className=" font-semibold">Deduction</span>
                        </button>
                    </div>
                    <div>
                        <button className="bg-orange-500 rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-600">
                            <img src={plusIcon} alt="export" className="h-4 w-4"/>
                            <span className="text-white font-semibold">Add Ticket</span>
                        </button>
                    </div>
                </div>

                {/* BODY */}
                <div className="border border-gray-200 rounded-lg mx-[2.5%] w-[95%] my-5 shadow-[0_1px_3px_rgba(0,0,0,0.12)]">

                    <div className="px-3 py-4 border-b border-b-gray-200 flex justify-between">
                        <span className="text-lg font-semibold">Additions List</span>
                        
                        <span className="border border-gray-200 rounded-lg px-3 py-1">Sort By :<select>
                            <option>Recently Added</option>
                            <option>Ascending</option>
                            <option>Descending</option>
                            <option>Last Month</option>
                            <option>Last 7 Day</option>
                        </select></span>
                    </div>    

                    <div className="flex justify-between py-3 ">
                        <span className=" mx-3">Rows Per Page <span>{rowsPerPage}</span> Entries</span>
                        <input type="search" placeholder="Search" className=" border border-gray-200 rounded-lg mx-3 px-3"/>
                    </div>

                {/* TABLE */}
                <table className="w-[100%] border-gray-200   border rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-sm font-semibold border-b-gray-200">
                            
                            <th className="p-3 text-left "><div className="flex justify-between">
                                <span>Name</span>
                                <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                            </div></th>
                            <th className="p-3 text-left "><div className="flex justify-between">
                                <span>Category</span>
                                <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                            </div></th>                            
                            <th className="p-3 text-left "><div className="flex justify-between">
                                <span>Default / Unit Amount</span>
                                <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                            </div></th>
                            <th className="p-3 text-left "><div className="flex justify-between">
                                <span>Actions</span>
                                <img src={sort} alt="sort1" className="w-4 h-4 hover:cursor-pointer" />
                            </div></th>                              
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.map((employee) => (
                            <tr key={employee.id} className="border-b hover:bg-gray-50">
                                {/* <td className="px-3 py-4 text-left border-b border-b-gray-200 font-semibold">{employee.name}</td> */}
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 font-semibold">{employee.name}</td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500">{employee.Category}</td>
                                <td className="px-3 py-4 text-left border-b border-b-gray-200 text-gray-500">{employee.deafult}</td>
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
                <div className="p-4 flex justify-between">
                    <span className="text-gray-500">Showing {firstRowIndex+1} - {lastRowIndex} of {employees.length} entries</span>
                    <div>
                        <button className="text-xl text-gray-500 hover:cursor-pointer mr-4" onClick={handlePrev} disabled={currentPage == 1}>←</button>
                        <span className="mr-4 bg-orange-400 rounded-full text-white px-2.5 py-1 h-fit w-fit">{currentPage}</span>
                        <button className="text-xl text-gray-500 hover:cursor-pointer" onClick={handleNext} disabled={currentPage== totalPages}>→</button>
                    </div>
                </div>                                                                           
                </div>
                

                
                <div className="fix bottom-0 w-full mt-11 bg-white h-10 border-t border-gray-200 flex justify-between items-center px-5">
                    <p>Copyright-2026 ©KK.</p>
                    <p>Designed & Developed By Kushagra Kedia</p>
                </div>
            
            </div>
            
        </div>      
    )
}
export default Payroll_items;