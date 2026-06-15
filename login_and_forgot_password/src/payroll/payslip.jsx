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
import gic from "./assests_p/GIC1.webp"
import downloadIcon from "./assests_p/download.png"

function Payslip(){
    const text = " > Payroll > Payslip";
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
                <div className="mx-2">
                    <div className="h-20 flex ">
                        <div className="w-[40%] pl-7 flex flex-col py-5 justify-between">
                            <div className="text-xl font-semibold">Payslip</div>
                            <div className="flex items-center"><img src={homeIcon} alt="home" className="h-3 w-3"/><span className="pl-1.5">{text}</span></div>
                        </div>
                        <div className="w-[60%] flex items-center gap-4 justify-end">
                            <button className="bg-black text-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-[#f3f0f0]">
                                <img src={downloadIcon} alt="export" className="h-4 w-4"/>
                                <span>Download</span>
                                
                            </button>

                            <button className="bg-white rounded-lg py-2 px-3 shadow-[0_1px_3px_rgba(0,0,0,0.12)] flex items-center gap-1.5 hover:cursor-pointer hover:bg-orange-500">
                                <img src={upArrowIcon} alt="export" className="h-4 w-4 m-1"/>
                            </button>
                        </div>
                    </div>
                </div> 

                {/* BODY   */}
                <div className="my-5 rounded-lg bg-white h-auto mx-4 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-3">

                    <div className="flex justify-between border-b border-b-gray-200 pb-3">
                        <div className="w-[50%] flex flex-col">
                            <img src={gic} alt="logo" className="h-10 w-29" />
                            <span className="text-xs mt-1 text-gray-500">3099 Kennedy Court Framingham, MA 01702</span>
                        </div>
                        <div className="w-[50%] flex flex-col text-right">
                            <span>
                                <span className="font-bold text-gray-500 text-sm">Payslip No </span>
                                <span className="text-orange-500 text-sm font-semibold">#PS4283</span>
                            </span>
                            <span>
                                <span className="text-xs text-gray-500">Salary Month : </span>
                                <span className="text-xs font-semibold">May 2026</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex border-b border-b-gray-200 pb-4">
                        <div className="w-[45%]  gap-0">
                            <div className="font-semibold mt-2 h-fit text-sm">From</div>
                            <div className="font-semibold mt-0 p-0 h-fit">Global InfoCloud</div>
                            <div className="text-xs text-gray-500 h-fit">2077 Chicago Avenue Orosi, CA 93647</div>
                            <div>
                                <span className="text-xs text-gray-500">Email : </span>
                                <span className="text-xs">globalinfocloud@gmail.com</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500">Phone : </span>
                                <span className="text-xs">+91 9876543210</span>
                            </div>
                        </div>

                        <div className="w-[40%] flex flex-col gap-0">
                            <div className="font-semibold mt-2 text-sm">To</div>
                            <div className="font-semibold mt-0 p-0 ">Kushagra Kedia</div>
                            <div className="text-xs text-gray-500">Web Designer</div>
                            <div>
                                <span className="text-xs text-gray-500">Email : </span>
                                <span className="text-xs">narendra@gmail.com</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500">Phone : </span>
                                <span className="text-xs">+91 9712045390</span>
                            </div>
                        </div>
                    </div>

                    <div className="font-semibold text-sm text-center my-3">Payslip for the moth of May 2026</div>
                    <div className="flex gap-10">
                        <div className="w-[50%] flex flex-col border border-gray-200 rounded-lg">
                            <div className="p-3 bg-gray-100 text-xs font-semibold">Earnings</div>
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">Basic Salary</span>
                                <span className="text-xs font-semibold">$3000</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">House Rent Allowance (H.R.A.)</span>
                                <span className="text-xs font-semibold">$1000</span>
                            </div>   
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">Conveyance</span>
                                <span className="text-xs font-semibold">$200</span>
                            </div> 
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">Other Allowance</span>
                                <span className="text-xs font-semibold">$100</span>
                            </div> 
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">Total Earnings</span>
                                <span className="text-xs font-semibold">$4300</span>
                            </div>                             

                        </div>
                        <div className="w-[50%] flex flex-col border border-gray-200 rounded-lg">
                            <div className="p-3 bg-gray-100 text-xs font-semibold">Deductions</div>
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">Tax Deducted at Source (T.D.S.)</span>
                                <span className="text-xs font-semibold">$200</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">Provident Fund</span>
                                <span className="text-xs font-semibold">$300</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">ESI</span>
                                <span className="text-xs font-semibold">$150</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">Loan</span>
                                <span className="text-xs font-semibold">$50</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-b border-b-gray-200">
                                <span className="text-xs text-gray-500">Total Earnings</span>
                                <span className="text-xs font-semibold">$700</span>
                            </div>                                                                                                                                            
                        </div>
                    </div>

                    <div className="flex mt-3 mb-2">
                        <span className="text-xs text-gray-500">Net Salary : </span>
                        <span className="text-xs font-bold ml-1">$3600(Three thousand six hundred only)</span>
                    </div>
                </div>
                <div className=" bottom-0 w-full bg-white h-10 border-t border-gray-200 flex justify-between items-center px-5">
                    <p>Copyright-2026 ©KK.</p>
                    <p>Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
        </div>
    )
}
export default Payslip;