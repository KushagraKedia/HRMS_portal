import Sidebar from "../components/sidebar"
import fullScreen from "./assets_t/fullscreen.png"
import gridApplication from "./assets_t/grid-2x2-check.png"
import messageIcon from "./assets_t/message.png"
import mailIcon from "./assets_t/mail.png"
import bellIcon from "./assets_t/bell.png"
import personIcon from "./assets_t/person-f-1.webp"
import homeIcon from "./assets_t/home.png"
import exportIcon from "./assets_t/export.png"
import arrowIcon from "./assets_t/downArrow.png"
import plusIcon from "./assets_t/circle-plus.png"
import upArrowIcon from "./assets_t/upArrow.png"
import person9 from "./assets_t/person9.webp"
import person10 from "./assets_t/person10.webp"
import person7 from "./assets_t/person-m-5.webp"
import person8 from "./assets_t/person-m-6.webp"
import calendarIcon from "./assets_t/calendar.png"
import messageGray from "./assets_t/message_gray.png"
import replyIcon from "./assets_t/reply.png"
import downloadIcon from "./assets_t/download.png"
import comment from "./assets_t/comment.png"
import replyIcon_1 from "./assets_t/reply_1.png"
import person11 from "./assets_t/person-f-1.webp"
import person12 from "./assets_t/person-m-4.webp"

function Ticket_details(){
    const text ="  > Employee > Tickets";
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
                    <div className="flex h-270 w-full my-8 gap-5">
                        <div className="w-[75%] h-full bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
                            <div className="px-3 flex flex-col">
                                <div className="flex pt-4 pb-4 border-b border-gray-200 items-center">
                                    <div className="w-[50%] text-lg font-semibold text-blue-500"> IT Support</div>
                                    <div className="w-[50%] flex gap-8 justify-end items-center">
                                        <div className="px-2.5 py-0.5 text-white bg-red-500 rounded-md text-sm font-semibold h-fit">High</div>
                                        <select className="px-3 py-2 border-gray-300 border rounded-md hover:cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
                                            <option>Mark as Private</option>
                                            <option>Mark as Public</option>
                                        </select>
                                    </div>
                                </div>
                                    <div>
                                        <div className="flex border-b border-gray-200 pb-3">
                                        <div className="pt-5 pb-3 flex flex-col jutify-center w-[70%] ">
                                            <div className="mx-3 px-2 py-0.5 bg-blue-500 text-white rounded-3xl w-fit text-xs"> Tic - 001 </div>
                                            <div className="flex gap-6 items-center px-3 py-1">
                                                <span className="font-bold text-md">Payment Issue</span>
                                                <span className="px-3 py-0.5 rounded-md border-green-500 text-green-500 border text-xs">On Hold</span>
                                            </div>
                                            <div className="flex items-center px-3 gap-1">
                                                <img src={person8} alt="person" className="h-5 w-5 rounded-full" />
                                                <span className="text-gray-600 pl-2">Assigned to</span>
                                                <span>John Henry</span>
                                                <img src={calendarIcon} alt="icon" className="w-3 h-3"/>
                                                <span className="text-gray-600">Updated 15 hours ago</span>
                                                <img src={messageGray} alt="icon" className="w-4 h-4 ml-2"/>
                                                <span className="ml-1 text-gray-600">8 Comments</span>
                                           </div>
                                        </div>
                                        <div className="px-3 py-2 rounded-md hover:cursor-pointer hover:bg-orange-600 bg-orange-500 text-white h-fit font-semibold flex items-center gap-1.5 mt-11 ml-25">
                                            <img src={replyIcon} alt="reply" className="w-4 h-4" />
                                            Post a Reply
                                        </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="mx-3 flex justify-center my-3 text-gray-600">For the past week, my laptop has been experiencing intermittent freezing issues. The freezes occur randomly, approximately 3-4 times a day, and last about 30-60 seconds each time. During these freezes, the cursor becomes unresponsive, and I am unable to click on anything or use keyboard shortcuts. The issue usually resolves itself, but it significantly disrupts my work.</div>
                            <div className="mr-3 ml-8 flex justify-center my-4 text-gray-600">I first noticed the problem on June 1, 2026, while using Google Meet for a video conference. Since then, the issue has occurred during various tasks, including browsing with Chrome, using Microsoft Office applications, and even when the laptop is idle.</div>
                            <div className="mr-3 ml-8 flex justify-center my-4 text-gray-600 pb-4">Error messages: No specific error messages have appeared, but the Task Manager (when accessible) shows a spike in CPU usage to 100% during these freezes.</div>
                            <div className="border-t border-t-gray-300 flex items-center pt-4">
                                <img src={person7} alt="person" className="w-9 h-9 rounded-full mx-3" />
                                <div className="flex flex-col gap-0">
                                    <div className="text-lg font-semibold">James Hendriques</div>
                                    <div className="flex gap-1 text-gray-500 text-sm items-center">
                                        <img src={calendarIcon} alt="icon" className="w-3 h-3"/>
                                        Updated 5 hours ago
                                    </div>
                                </div>
                            </div>
                            <div className="mx-3 mt-3 text-gray-600">This issue disrupts meetings, delays task completion, and affects my overall productivity.</div>
                            <div className=" flex items-center mx-3 mt-4 bg-[#f3f0f0] w-fit px-1 py-1 rounded-md gap-1">
                                <div className="text-xs text-gray-600">Screenshot.png</div>
                                <img src={downloadIcon} alt="icon" className="h-3 w-3" />
                            </div>
                            <div className="flex items-center gap-2 mt-3 mx-3 mb-5">
                                <img src={replyIcon_1} alt="reply" className="w-4 h-4 " />
                                <div className="text-orange-500">Reply</div>
                                <img src={comment} alt="reply" className="w-3 h-3" />
                                <div>1 Comments </div>
                            </div>
                            <div className="border-t border-t-gray-300 flex items-center pt-4">
                                <img src={person11} alt="person" className="w-9 h-9 rounded-full mx-3" />
                                <div className="flex flex-col gap-0">
                                    <div className="text-lg font-semibold">Marilyn Siegle</div>
                                    <div className="flex gap-1 text-gray-500 text-sm items-center">
                                        <img src={calendarIcon} alt="icon" className="w-3 h-3"/>
                                        Updated 6 hours ago
                                    </div>
                                </div>
                            </div>
                            <div className="mx-3 mt-3 text-gray-600">Check the System and Application logs in the Event Viewer for warnings or errors that coincide with the times the freezes occur.</div>
                            <div className="flex gap-2"><div className=" flex items-center mx-3 mt-4 bg-[#f3f0f0] w-fit px-1 py-1 rounded-md gap-1">
                                <div className="text-xs text-gray-600">Screenshot.png</div>
                                <img src={downloadIcon} alt="icon" className="h-3 w-3" />
                            </div><div className=" flex items-center mx-3 mt-4 bg-[#f3f0f0] w-fit px-1 py-1 rounded-md gap-1">
                                <div className="text-xs text-gray-600">Screenshot.png</div>
                                <img src={downloadIcon} alt="icon" className="h-3 w-3" />
                            </div><div className=" flex items-center mx-3 mt-4 bg-[#f3f0f0] w-fit px-1 py-1 rounded-md gap-1">
                                <div className="text-xs text-gray-600">Screenshot.png</div>
                                <img src={downloadIcon} alt="icon" className="h-3 w-3" />
                            </div><div className=" flex items-center mx-3 mt-4 bg-[#f3f0f0] w-fit px-1 py-1 rounded-md gap-1">
                                <div className="text-xs text-gray-600">Screenshot.png</div>
                                <img src={downloadIcon} alt="icon" className="h-3 w-3" />
                            </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 mx-3 mb-5">
                                <img src={replyIcon_1} alt="reply" className="w-4 h-4 " />
                                <div className="text-orange-500">Reply</div>
                                <img src={comment} alt="reply" className="w-3 h-3" />
                                <div>1 Comments </div>
                            </div>
                            <div className="border-t border-t-gray-300 flex items-center pt-4">
                                <img src={person12} alt="person" className="w-9 h-9 rounded-full mx-3" />
                                <div className="flex flex-col gap-0">
                                    <div className="text-lg font-semibold">Marilyn Siegle</div>
                                    <div className="flex gap-1 text-gray-500 text-sm items-center">
                                        <img src={calendarIcon} alt="icon" className="w-3 h-3"/>
                                        Updated 8 hours ago
                                    </div>
                                </div>
                            </div>
                            <div className="mx-3 mt-3 text-gray-600">Check for any pending updates and installing them to see if it resolves the issue.</div>
                            <div className="flex items-center gap-2 mt-3 mx-3 mb-5">
                                <img src={replyIcon_1} alt="reply" className="w-4 h-4 " />
                                <div className="text-orange-500">Reply</div>
                                <img src={comment} alt="reply" className="w-3 h-3" />
                                <div>1 Comments </div>
                            </div>
                        </div>
                        <div className="w-[25%] h-[67%] bg-white rounded-lg py-2 mx-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] gap-3">
                            <div className="mt-2 text-xl font-semibold pb-4 border-b border-b-gray-300  px-4">Ticket Categories</div>
                            <div className="px-4 mt-2 font-semibold">Change Priority</div>
                            <select className="mx-4 my-3 px-3 py-2 border border-gray-300  rounded-lg w-[90%]">
                                <option className="hover:bg-orange-500 hover:text-white">High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                            <div className="px-4 mt-2 font-semibold">Assign To</div>
                            <select className="mx-4 my-3 px-3 py-2 border border-gray-300  rounded-lg w-[90%]">
                                <option className="">Edgar Hansel</option>
                                <option>Juan Hermann</option>
                            </select>
                            <div className="px-4 mt-2 font-semibold">Ticket Status</div>
                            <select className="mx-4 mt-3 px-3 py-2 border border-gray-300  rounded-lg w-[90%] border-b mb-7">
                                <option>Open</option>
                                <option>On Hold</option>
                                <option>Reopened</option>
                            </select>
                            <div className="flex px-4 py-3 border-b border-b-gray-300 border-t border-t-gray-300 items-center gap-1">
                                <img src={person10} alt="person" className="w-9 h-9 rounded-full" />
                                <div className="flex flex-col">
                                    <div className="text-md text-gray-500">User</div>
                                    <div className="text-lg">Anthony Lewis</div>
                                </div>
                            </div>
                            <div className="flex px-4 py-3 border-b border-b-gray-300 items-center gap-1">
                                <img src={person9} alt="person" className="w-9 h-9 rounded-full" />
                                <div className="flex flex-col">
                                    <div className="text-md text-gray-500">Support Agent</div>
                                    <div className="text-lg">Edgar Hansel</div>
                                </div>
                            </div>
                            <div className="flex flex-col px-4 py-3 border-b border-b-gray-300">
                                <div className="text-md text-gray-500">Category</div>
                                <div className="text-lg">Repair & Service</div>
                            </div>
                            <div className="flex flex-col px-4 py-3 border-b border-b-gray-300">
                                <div className="text-md text-gray-500">Email</div>
                                <div className="text-lg">Hellana@example.com</div>
                            </div>
                            <div className="flex flex-col px-4 py-3">
                                <div className="text-md text-gray-500">Last Updated / Closed On</div>
                                <div className="text-lg">8th June 2026</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12 mt-0 justify-between p-2 w-full">
                    <p>Copyright-2026 ©KK.</p>
                    <p>Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
        </div>
    )
}

export default Ticket_details;