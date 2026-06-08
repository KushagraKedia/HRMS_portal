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
                    <div className="flex h-220 w-full my-8 gap-5">
                        <div className="w-[75%] h-full bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)]"></div>
                        <div className="w-[25%] h-[75%] bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)]"></div>
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