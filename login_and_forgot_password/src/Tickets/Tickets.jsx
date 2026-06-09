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
import dotIcon from "./assets_t/dot.png"
import calendarIcon from "./assets_t/calendar.png"
import person7 from "./assets_t/person-m-5.webp"
import person8 from "./assets_t/person-m-6.webp"
import person9 from "./assets_t/person9.webp"
import person10 from "./assets_t/person10.webp"
import messageGray from "./assets_t/message_gray.png"
import loading from "./assets_t/loader.png"
import newTicket from "./assets_t/new_ticket.png"
import openTicket from "./assets_t/open_ticket.png"
import solvedTicket from "./assets_t/solved_ticket.png"
import pendingTicket from "./assets_t/pending_ticket.png"

function Tickets(){
    const text ="  > Employee > Tickets";

    const bars = [
  { height: 65, value: 12 },
  { height: 40, value: 8 },
  { height: 50, value: 10 },
  { height: 25, value: 4 },
  { height: 32, value: 6 },
  { height: 50, value: 10 },
];
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
                        <div className="text-3xl font-semibold">Tickets</div>
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
                <div className="flex w-full gap-4 my-8  h-45">
                    <div className="w-[25%] h-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white flex">
                        <div className="w-[50%] h-full flex flex-col ml-3 mt-3">
                            <div className="h-15 w-15 rounded-full border-orange-300 border-dashed border-2 mx-3 mt-4">
                                <img src={newTicket} alt="ticket" className="w-14 h-14 rounded-full" />
                            </div>
                            <div className="mx-3 mt-5 text-gray-500 text-lg">New Tickets</div>
                            <div className="font-bold text-2xl mx-4">120</div>
                        </div>
                        <div>
                            <div className="flex items-end gap-2.5 h-24 mr-3 mt-15">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="relative group flex justify-center"
        >
          <div
            className="
              absolute
              -top-10
              hidden
              group-hover:block
              bg-black
              text-white
              text-xs
              px-2
              py-1
              rounded
              whitespace-nowrap
              z-10
            "
          >
            Messages: {bar.value}
          </div>

          {/* Bar */}
          <div
            className="
              w-3
              border-2
              border-orange-500
              bg-orange-200
              rounded-sm
              transition-all
              duration-200
              group-hover:scale-105
            "
            style={{ height: `${bar.height}px` }}
          />
        </div>
      ))}
    </div>
                        </div>
                    </div>
                    <div className="w-[25%] h-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white flex">
                        <div className="w-[50%] h-full flex flex-col ml-3 mt-3">
                            <div className="h-15 w-15 rounded-full border-purple-300 border-dashed border-2 mx-3 mt-4">
                                <img src={openTicket} alt="ticket" className="w-14 h-14 rounded-full" />
                            </div>
                            <div className="mx-3 mt-5 text-gray-500 text-lg">Open Tickets</div>
                            <div className="font-bold text-2xl mx-4">60</div>
                        </div>
                        <div>
                            <div className="flex items-end gap-2.5 h-24 mr-3 mt-15">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="relative group flex justify-center"
        >
          <div
            className="
              absolute
              -top-10
              hidden
              group-hover:block
              bg-black
              text-white
              text-xs
              px-2
              py-1
              rounded
              whitespace-nowrap
              z-10
            "
          >
            Messages: {bar.value}
          </div>

          {/* Bar */}
          <div
            className="
              w-3
              border-2
              border-purple-500
              bg-purple-200
              rounded-sm
              transition-all
              duration-200
              group-hover:scale-105
            "
            style={{ height: `${bar.height}px` }}
          />
        </div>
      ))}
    </div>
                        </div>
                    </div>
                    <div className="w-[25%] h-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white flex">
                        <div className="w-[50%] h-full flex flex-col ml-3 mt-3">
                            <div className="h-15 w-15 rounded-full border-red-300 border-dashed border-2 mx-3 mt-4">
                                <img src={solvedTicket} alt="ticket" className="w-14 h-14 rounded-full" />
                            </div>
                            <div className="mx-3 mt-5 text-gray-500 text-lg">Solved Tickets</div>
                            <div className="font-bold text-2xl mx-4">50</div>
                        </div>
                        <div>
                            <div className="flex items-end gap-2.5 h-24 mr-3 mt-15">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="relative group flex justify-center"
        >
          <div
            className="
              absolute
              -top-10
              hidden
              group-hover:block
              bg-black
              text-white
              text-xs
              px-2
              py-1
              rounded
              whitespace-nowrap
              z-10
            "
          >
            Messages: {bar.value}
          </div>

          {/* Bar */}
          <div
            className="
              w-3
              border-2
              border-red-500
              bg-red-200
              rounded-sm
              transition-all
              duration-200
              group-hover:scale-105
            "
            style={{ height: `${bar.height}px` }}
          />
        </div>
      ))}
    </div>
                        </div>
                    </div>
                    <div className="w-[25%] h-full border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white flex">
                        <div className="w-[50%] h-full flex flex-col ml-3 mt-3">
                            <div className="h-15 w-15 rounded-full border-blue-300 border-dashed border-2 mx-3 mt-4">
                                <img src={pendingTicket} alt="ticket" className="w-14 h-14 rounded-full" />
                            </div>
                            <div className="ml-3 mt-5 text-gray-500 text-lg">Pending Tickets</div>
                            <div className="font-bold text-2xl mx-4">10</div>
                        </div>
                        <div>
                            <div className="flex items-end gap-2.5 h-24 mr-3 mt-15">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="relative group flex justify-center"
        >
          <div
            className="
              absolute
              -top-10
              hidden
              group-hover:block
              bg-black
              text-white
              text-xs
              px-2
              py-1
              rounded
              whitespace-nowrap
              z-10
            "
          >
            Messages: {bar.value}
          </div>

          {/* Bar */}
          <div
            className="
              w-3
              border-2
              border-blue-500
              bg-blue-200
              rounded-sm
              transition-all
              duration-200
              group-hover:scale-105
            "
            style={{ height: `${bar.height}px` }}
          />
        </div>
      ))}
    </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-25 items-center border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 bg-white rounded-lg p-3">
                    <div className="w-[40%] font-semibold text-2xl">Ticket List</div>
                    <div className="w-[60%] flex items-center justify-end gap-3">
                        <button className="border-gray-200 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] py-2 px-3 flex items-center gap-1 hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <span>Priority</span>
                            <img src={arrowIcon} alt="arrow" className="h-4 w-4"/>
                        </button>
                        <button className="border-gray-200 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] py-2 px-3 flex items-center gap-1 hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <span>Select Status</span>
                            <img src={arrowIcon} alt="arrow" className="h-4 w-4"/>
                        </button>
                        <button className="border-gray-200 border rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.12)] py-2 px-3 flex items-center gap-1 hover:cursor-pointer hover:bg-[#f3f0f0]">
                            <span>Sort By: Last 7 Days</span>
                            <img src={arrowIcon} alt="arrow" className="h-4 w-4"/>
                        </button>
                    </div>
                </div>
                <div className="flex w-full h-220 gap-4 my-8">
                    <div className="w-[75%] flex flex-col gap-4">
                        <div className="w-full h-[25%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white">
                            <div className="h-[23%] w-full flex justify-between px-4 mt-3 items-center border-b-gray-300 border-b pb-5 pt-3">
                                <span className="text-blue-600 font-semibold text-lg mx-3">IT Support</span>
                                <span className="px-3 bg-red-500 text-white rounded-lg text-sm font-semibold py-1 flex items-center">
                                    {/* <img src={dotIcon} alt="icon" className="h-3 w-3" /> */}
                                    High
                                </span>
                            </div>
                            <div className="h-[77%] pt-5 pb-3 mx-4 flex flex-col jutify-center">
                                <div className="mx-3 px-2 py-0.5 bg-blue-500 text-white rounded-3xl w-fit text-xs"> Tic - 001 </div>
                                <div className="flex gap-6 items-center px-3 py-2">
                                    <span className="font-bold text-xl">Laptop Issue</span>
                                    <span className="px-3 py-0.5 rounded-md border-pink-500 text-pink-500 border text-xs">Open</span>
                                </div>
                                <div className="flex items-center px-3 py-2 gap-1">
                                    <img src={person7} alt="person" className="h-5 w-5 rounded-full" />
                                    <span className="text-gray-600 pl-2">Assigned to</span>
                                    <span>Edgar Hansel</span>
                                    <img src={calendarIcon} alt="icon" className="w-3 h-3"/>
                                    <span className="text-gray-600">Updated 10 hours ago</span>
                                    <img src={messageGray} alt="icon" className="w-4 h-4 ml-2"/>
                                    <span className="ml-1 text-gray-600">9 Comments</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[25%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white">
                            <div className="h-[23%] w-full flex justify-between px-4 mt-3 items-center border-b-gray-300 border-b pb-5 pt-3">
                                <span className="text-blue-600 font-semibold text-lg mx-3">IT Support</span>
                                <span className="px-3 bg-green-500 text-white rounded-lg text-sm font-semibold py-1 flex items-center">
                                    {/* <img src={dotIcon} alt="icon" className="h-3 w-3" /> */}
                                    Low
                                </span>
                            </div>
                            <div className="h-[77%] pt-5 pb-3 mx-4 flex flex-col jutify-center">
                                <div className="mx-3 px-2 py-0.5 bg-blue-500 text-white rounded-3xl w-fit text-xs"> Tic - 002 </div>
                                <div className="flex gap-6 items-center px-3 py-2">
                                    <span className="font-bold text-xl">Payment Issue</span>
                                    <span className="px-3 py-0.5 rounded-md border-green-500 text-green-500 border text-xs">On Hold</span>
                                </div>
                                <div className="flex items-center px-3 py-2 gap-1">
                                    <img src={person8} alt="person" className="h-5 w-5 rounded-full" />
                                    <span className="text-gray-600 pl-2">Assigned to</span>
                                    <span>John Henry</span>
                                    <img src={calendarIcon} alt="icon" className="w-3 h-3"/>
                                    <span className="text-gray-600">Updated 15 hours ago</span>
                                    <img src={messageGray} alt="icon" className="w-4 h-4 ml-2"/>
                                    <span className="ml-1 text-gray-600">8 Comments</span>
                                </div>
                               </div>    
                        </div>
                        <div className="w-full h-[25%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white">
                            <div className="h-[23%] w-full flex justify-between px-4 mt-3 items-center border-b-gray-300 border-b pb-5 pt-3">
                                <span className="text-blue-600 font-semibold text-lg mx-3">IT Support</span>
                                <span className="px-3 bg-yellow-300 text-white rounded-lg text-sm font-semibold py-1 flex items-center">
                                    {/* <img src={dotIcon} alt="icon" className="h-3 w-3" /> */}
                                    Medium
                                </span>
                            </div>
                            <div className="h-[77%] pt-5 pb-3 mx-4 flex flex-col jutify-center">
                                <div className="mx-3 px-2 py-0.5 bg-blue-500 text-white rounded-3xl w-fit text-xs"> Tic - 003 </div>
                                <div className="flex gap-6 items-center px-3 py-2">
                                    <span className="font-bold text-xl">Bug Report</span>
                                    <span className="px-3 py-0.5 rounded-md border-purple-500 text-purple-500 border text-xs">On Hold</span>
                                </div>
                                <div className="flex items-center px-3 py-2 gap-1">
                                    <img src={person9} alt="person" className="h-5 w-5 rounded-full" />
                                    <span className="text-gray-600 pl-2">Assigned to</span>
                                    <span>Juan Hermann</span>
                                    <img src={calendarIcon} alt="icon" className="w-3 h-3"/>
                                    <span className="text-gray-600">Updated 20 hours ago</span>
                                    <img src={messageGray} alt="icon" className="w-4 h-4 ml-2"/>
                                    <span className="ml-1 text-gray-600">13 Comments</span>
                                </div>
                               </div>
                        </div>
                        <div className="w-full h-[25%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white">
                            <div className="h-[23%] w-full flex justify-between px-4 mt-3 items-center border-b-gray-300 border-b pb-5 pt-3">
                                <span className="text-blue-600 font-semibold text-lg mx-3">IT Support</span>
                                <span className="px-3 bg-green-500 text-white rounded-lg text-sm font-semibold py-1 flex items-center">
                                    {/* <img src={dotIcon} alt="icon" className="h-3 w-3" /> */}
                                    Low
                                </span>
                            </div>
                            <div className="h-[77%] pt-5 pb-3 mx-4 flex flex-col jutify-center">
                                <div className="mx-3 px-2 py-0.5 bg-blue-500 text-white rounded-3xl w-fit text-xs"> Tic - 004 </div>
                                <div className="flex gap-6 items-center px-3 py-2">
                                    <span className="font-bold text-xl">Access Denied</span>
                                    <span className="px-3 py-0.5 rounded-md border-pink-500 text-pink-500 border text-xs">Open</span>
                                </div>
                                <div className="flex items-center px-3 py-2 gap-1">
                                    <img src={person10} alt="person" className="h-5 w-5 rounded-full" />
                                    <span className="text-gray-600 pl-2">Assigned to</span>
                                    <span>Jessie Otero</span>
                                    <img src={calendarIcon} alt="icon" className="w-3 h-3"/>
                                    <span className="text-gray-600">Updated 23 hours ago</span>
                                    <img src={messageGray} alt="icon" className="w-4 h-4 ml-2"/>
                                    <span className="ml-1 text-gray-600">11 Comments</span>
                                </div>
                               </div>
                        </div>
                    </div>
                    <div className="w-[25%] flex flex-col gap-4">
                        <div className="w-full h-[42%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg  bg-white flex flex-col">
                            <div className="mt-4 text-xl font-semibold pb-4 border-b border-b-gray-300  px-4">Ticket Categories</div>
                            <div className="h-[17%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <span>Internet Issue</span>
                                <button className="bg-black text-white rounded-full w-5 text-sm">0</button>
                            </div>
                            <div className="h-[17%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <span>Computer</span>
                                <button className="bg-black text-white rounded-full w-5 text-sm">1</button>
                            </div>
                            <div className="h-[17%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <span>Redistribute</span>
                                <button className="bg-black text-white rounded-full w-5 text-sm">0</button>
                            </div>
                            <div className="h-[17%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <span>Payment</span>
                                <button className="bg-black text-white rounded-full w-5 text-sm">2</button>
                            </div>
                            <div className="h-[17%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <span>Complaint</span>
                                <button className="bg-black text-white rounded-full w-5 text-sm">1</button>
                            </div>
                        </div>
                        <div className="w-full h-[33%] border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] rounded-lg bg-white flex flex-col">
                            <div className="mt-4 text-xl font-semibold pb-4 border-b border-b-gray-300  px-4">Support Agents</div>
                            <div className="h-[21%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <div className="flex items-center">
                                    <img src={person7} alt="person" className="h-5 w-5 rounded-full mr-3" />
                                    <span>Edgar Hansel</span>
                                </div>
                                <button className="bg-black text-white rounded-full w-5 text-sm">0</button>
                            </div>
                            <div className="h-[21%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <div className="flex items-center">
                                    <img src={person8} alt="person" className="h-5 w-5 rounded-full mr-3" />
                                    <span>John Henry</span>
                                </div>
                                <button className="bg-black text-white rounded-full w-5 text-sm">1</button>
                            </div>
                            <div className="h-[21%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <div className="flex items-center">
                                    <img src={person9} alt="person" className="h-5 w-5 rounded-full mr-3" />
                                    <span>Juan Hermann</span>
                                </div>
                                <button className="bg-black text-white rounded-full w-5 text-sm">0</button>
                            </div>
                            <div className="h-[21%] border-b border-b-gray-300 px-4 flex justify-between items-center text-md">
                                <div className="flex items-center">
                                    <img src={person10} alt="person" className="h-5 w-5 rounded-full mr-3" />
                                    <span>Jessie Otero</span>
                                </div>
                                <button className="bg-black text-white rounded-full w-5 text-sm">2</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="px-4 py-2 text-white rounded-lg mb-4 text-lg bg-orange-500 ml-[35%] hover:cursor-pointer hover:bg-orange-600 flex gap-2 items-center">
                    <img src={loading} alt="load" className="h-5 w-5" />
                    Load More
                </button>
                </div>
                <div className="flex bg-white h-10 border-t border-t-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12 mt-0 justify-between p-2 w-full">
                    <p>Copyright-2026 ©KK.</p>
                    <p>Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
        </div>
    )
}

export default Tickets;