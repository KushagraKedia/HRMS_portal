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

function Dashboard(){
    const text ="> Dashboard > HR Dashboard";
    return (
        <div className="min-h-screen w-full bg-[#f0efe7] text-black">
            <div className="h-10 w-full bg-white border-1 border-black">
                <input type="text" />
            </div>
            <div className="h-10 w-full bg-white border-1 border-black flex items-center justify-around">
                <Button>
                    <img src={dashboardIcon} alt="Home" className="h-4 w-4 mt-1"/>
                    Dashboard
                </Button>
                <Button>
                    <img src={userIcon} alt="Home" className="h-4 w-4 mt-1"/>
                    Super Admin
                </Button>
                <Button>
                    <img src={applicationIcon} alt="Home" className="h-4 w-4 mt-1"/>
                    Application
                </Button>
                <Button>
                    <img src={layoutIcon} alt="Home" className="h-4 w-4 mt-1"/>
                    Layouts
                </Button>
                <Button>
                    <img src={userIcon} alt="Home" className="h-4 w-4 mt-1"/>
                    Projects
                </Button>
                <Button>
                    <img src={userIcon} alt="Home" className="h-4 w-4 mt-1"/>
                    Administration
                </Button>
                <Button>
                    <img src={pageIcon} alt="Home" className="h-4 w-4 mt-1"/>
                    Pages
                </Button>
                <Button>
                    <img src={extraIcon} alt="Home" className="h-4 w-4 mt-1"/>
                    Extras
                </Button>
            </div>
            <div className="flex border-1 mt-6 justify-around items-center">
                <div>
                    <h1 className="font-bold text-black text-3xl">HR Dashboard</h1>
                    <h3 className="font-AbeeZee text-[#808080]">
                        <div className="flex w-60 flex-row">
                        <img src={homeIcon} alt="Home" className="h-4 w-4 mt-2"/>
                        <p className="m-1">{text}</p>
                        </div>
                    </h3>
                </div>

               <div className="bg-white flex flex-row justify-center items-center gap-2 rounded p-2">
                    <img src={calenderIcon} alt="calendar" className="h-4 w-4" />
                    <p>01/06/2026 - 30/06/2026</p>
                </div> 


                <button className="bg-white hover:cursor-pointer p-2 rounded flex justify-around items-center gap-2 hover:bg-[#D3D3D3]">
                    <img src={yearlyReport} alt="calendar" className="h-4 w-4 " />
                    Yearly Report
                </button> 


                <button className="text-white bg-orange-500 hover:cursor-pointer hover:bg-orange-700 p-2 rounded">
                    Add New
                </button>


            </div>
            <div className="flex justify-rows h-120">
                <div className="flex w-[55%] flex-col mt-8">
                    <div className="bg-white border-1 h-60 rounded p-2 ml-20">Employee Status & type</div>
                    <div className="bg-white border-1 rounded h-45 mt-7 p-2 ml-20">Leave Type Distribution</div>
                </div>


                <div className="border-1 bg-white border-grey ml-20 mt-8 w-full mr-20 rounded p-4">
                    <p className="font-bold w-full border-1 h-7 flex itmes-center rounded pl-2">Overview Statistics</p>
                <div className="flex mt-7">
                    <div className="border-grey border-1 w-[50%] mr-4 rounded h-40 p-2">Total Employess</div>
                    <div className="border-grey border-1 w-[50%] ml-4 rounded p-2">New Joinees</div>
                </div>  
                <div className="flex mt-7">
                    <div className="border-grey border-1 w-[50%] mr-4 rounded h-40 p-2">Late Arrivals Today</div>
                    <div className="border-grey border-1 w-[50%] ml-4 rounded p-2">Total Payroll Cost</div>
                </div>  
                </div>
            </div>


            <div className="flex mt-8 mx-20 h-140 flex-row">
                <div className="bg-white h-120 w-[65%] my-10 border-1 rounded mr-5 p-2">Attendence Trend</div>
                <div className="bg-white h-120 w-[35%] my-10 border-1 rounded ml-5 p-2">Top employee distribution</div>
            </div>


            <div className="flex h-140 mx-20 mt-8 ">
                <div className="bg-white h-120 w-[33%] my-10 border-1 rounded mr-5 p-2">
                    <p className="mx-4 my-4 border-1 rounded h-9">Late Arrival Today</p>
                        <div className="flex flex-col mx-4 mt-4 h-95 justify-evenly itmes-left gap-2">
                        <div className="border-1 h-[20%] p-2 rounded">Sai Kishor</div>
                        <div className="border-1 h-[20%] p-2 rounded">Shubman Gill</div>
                        <div className="border-1 h-[20%] p-2 rounded">Axar Patel</div>
                        <div className="border-1 h-[20%] p-2 rounded">Sharuk Khan</div>
                        <div className="border-1 h-[20%] p-2 rounded">Lional Messi</div>

                    </div>
                </div>


                <div className="h-120 w-[33%] my-10 mr-5 ">
                    <div className="flex flex-col">
                        <div className="mt-0 h-82 border-1 rounded bg-white p-2">
                            <p>Recruitment Statistics</p>
                        </div>
                        <div className="mt-6 h-32 border-1 rounded bg-white p-2">
                            <p>Employees in Training</p>
                        </div>
                    </div>
                </div>


                <div className="bg-white h-120 w-[33%] my-10 border-1 rounded mr-5 p-2">
                    <p className="mx-4 my-4 border-1 rounded h-9 gap-2">Upcoming Interviews</p>
                    <div className="flex flex-col bg-white h-85 mx-4">
                        <div className="border-1 h-[50%] p-2 rounded">
                            <p>UI/UX Design Interview</p>
                        </div>
                        <div className="border-1 h-[50%] p-2 rounded">
                            <p>Senior Developer React</p>
                        </div>
                    </div>
                    <button className="mx-4 mt-2.5 w-[33%] border-1 rounded bg-[#D3D3D3] hover:cursor-pointer">View All →</button>
                </div>
            </div>


            <div className="flex h-120 mx-20 mt-8 ">


                <div className="h-100 w-[60%] my-10 mr-5">
                    <div className="flex flex-row gap-5">
                        <div className="h-30 bg-white w-[50%] border-1 rounded p-2">
                            <p>Benefits Deductions</p>
                        </div>
                        <div className="h-30 bg-white w-[50%] border-1 rounded p-2">
                            <p>Total Payroll</p>
                        </div>
                    </div>
                    <div className="h-65 bg-white w-[100%] border-1 rounded p-2 mt-5">
                        <p>Top Employees</p>
                    </div>
                </div>


                <div className="bg-white h-100 w-[40%] my-10 border-1 rounded mr-5 p-2">
                    <p className="mx-4 my-4 border-1 rounded">Pending Approvals</p>
                    <div className="flex flex-col mx-4 mt-4 h-75 justify-around itmes-left">
                        <div className="border-1 h-[33%] p-2 rounded">Sai Kishor</div>
                        <div className="border-1 h-[33%] p-2 rounded">Shubman Gill</div>
                        <div className="border-1 h-[33%] p-2 rounded">Axar Patel</div>
                    </div>
                </div>
            </div>


            <bottom className="flex bg-white h-10 border-1 mx-20 mt-8 gap-220 p-2">
                <p>Copyright-2026 ©KK.</p>
                <p>Designed & Developed By Kushagra Kedia</p>
            </bottom>


        </div>
    )
}

export default Dashboard;