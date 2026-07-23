import {
  Home,
  LayoutGrid,
  ShieldCheck,
  ChevronDown,
  PanelTop,
  Triangle,
  Monitor,
  Columns2,
  MousePointer2,
  Package,
  SquareMenu,
} from "lucide-react";

import {
  Users,
  Ticket,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  PencilLine,
  Hourglass,
  BellRing,
  Megaphone,
  LogOut,
  UserX,
  Mail,
  CreditCard // Added for Subscriptions
} from "lucide-react";

import {
  Briefcase,
  UserRoundPlus,
  UserPlus,
  Landmark,
  Receipt,
  Wallet,
  Boxes,
  Headphones,
  UserCog,
  FileBarChart,
  Settings
} from "lucide-react";

import {
  FileText,
  BookOpen,
  MapPin,
  MessageSquare,
  CircleHelp,
  User,
  Image,
  Search,
  Clock3,
  Construction,
  KeyRound,
  Shield,
  FileWarning
} from "lucide-react";

import {
  LogIn,
  UserPlus2,
  TriangleAlert,
  RotateCcw,
  MailCheck,
  Lock,
  Shapes,
  BarChart3,
  FormInput,
  Table
} from "lucide-react";

import { Contact, Building2, Handshake, GitBranch, ListChecks, UserCog2 } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlan } from "../hooks/usePlan";

import GIC from "../assets/GIC1.webp";

function Sidebar() {
  const currentUser  = JSON.parse(localStorage.getItem("gic_user") || "{}");
  const isAdmin      = currentUser.role === "admin";
  const isSuperadmin = localStorage.getItem("userRole") === "superadmin";
  const { features } = usePlan();

  // Renders a locked sidebar item with lock icon — clicking goes to subscription page
  const LockedLink = ({ to, icon: Icon, label }) => (
    <Link to="/company/subscription"
      className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-orange-50 group">
      <div className="flex items-center gap-3 opacity-40">
        <Icon size={18} className="text-slate-500"/>
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <Lock size={12} className="text-orange-400"/>
        <span className="text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Upgrade</span>
      </div>
    </Link>
  );

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [superAdminOpen, setSuperAdminOpen] = useState(false);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [attendenceOpen, setAttendenceOpen] = useState(false);
  const [performanceOpen, setPerformanceOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [payrollOpen, setPayrollOpen] = useState(false);

  return (
    <aside className="w-72 lg:w-64 h-screen overflow-y-auto bg-[#F8F9FA] border-r border-gray-200 px-4 py-4">

      <img src={GIC} alt="calendar" className="h-20 w-full object-contain" />
      
      {/* SUPER ADMIN PORTAL PANEL — Only visible to Superadmin role */}
      {isSuperadmin && (
        <>
          <h3 className="text-xs font-bold text-red-500 uppercase mb-4 mt-8">
            Super Admin Panel
          </h3>
          <div className="space-y-2">
            <div 
              onClick={() => setSuperAdminOpen(!superAdminOpen)}
              className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-red-50 hover:cursor-pointer text-red-700"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-red-500" />
                <span className="font-semibold">Super Admin</span>
              </div>
              <ChevronDown size={16} />
            </div>

            {superAdminOpen && (
              <div className="ml-8 mt-2 space-y-2 flex flex-col">
                <Link to="/superadmin/dashboard" className="text-gray-500 hover:text-red-600 text-sm py-1 px-2 rounded-md hover:bg-red-50">
                  Control Dashboard
                </Link>
                {/* Future Super Admin Views can be added directly here */}
              </div>
            )}
          </div>
        </>
      )}

      {/* MAIN MENU */}
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 mt-8">
        Main Menu
      </h3>

      <div className="space-y-2">
        <div onClick={() => setDashboardOpen(!dashboardOpen)}
        className="flex items-center justify-between rounded-lg px-3 py-3 hover:cursor-pointer hover:bg-[#f3f0f0]">
          <div className="flex items-center gap-3">
            <Home size={18} className="text-slate-500" />
            <span className="font-medium">Dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-md">
              Hot
            </span>
            <ChevronDown size={16} />
          </div>
        </div>
        
        {dashboardOpen && (
          <div className="ml-8 mt-2 space-y-2 flex flex-col">
            <Link to="/Dashboard/employee_dashboard" className="text-gray-400 m-3 text-xs hover:bg-gray-400 hover:text-white hover:cursor-pointer px-3 rounded-lg py-1">Employee Dashboard</Link>
            <Link to="/Dashboard/HR_Dashboard" className="text-gray-400 m-3 text-sm hover:bg-gray-400 hover:text-white hover:cursor-pointer px-3 rounded-lg py-1 ">HR Dashboard</Link>
          </div>
        )}
      </div> 

      {/* HRM Section */}
      <h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
        HRM
      </h3>

      <div className="space-y-2">
        {isAdmin && (
          <Link to="/company/my-subscription" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
            <CreditCard size={18} className="text-slate-500" />
            <span>My Subscription</span>
          </Link>
        )}

        {features.tickets ? (
          <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100 hover:cursor-pointer" onClick={() => setTicketOpen(!ticketOpen)}>
            <div className="flex items-center gap-3">
              <Ticket size={18} className="text-slate-500" />
              <span>Tickets</span>
            </div>
            <ChevronDown size={16} />
          </div>
        ) : (
          <LockedLink to="/Tickets/tickets" icon={Ticket} label="Tickets"/>
        )}
        
        {ticketOpen && features.tickets && (
          <div className="ml-8 mt-2 space-y-2 flex flex-col">
            <Link to="/Tickets/tickets" className="text-gray-400 m-3 text-sm hover:bg-gray-400 hover:text-white hover:cursor-pointer px-3 rounded-lg py-1">Tickets</Link>
            <Link to="/Tickets/tickets_details" className="text-gray-400 m-3 text-sm hover:bg-gray-400 hover:text-white hover:cursor-pointer px-3 rounded-lg py-1">Tickets Detail</Link>
          </div>
        )}
      </div>

      {/* FINANCE & ACCOUNTS */}
      <h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
        Finance & Accounts
      </h3>

      <div className="space-y-2">
        {features.payroll ? (
          <div onClick={() => setPayrollOpen(!payrollOpen)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100 hover:cursor-pointer">
            <div className="flex items-center gap-3">
              <Wallet size={18} className="text-slate-500" />
              <span>Payroll</span>
            </div>
            <ChevronDown size={16} />
          </div>
        ) : (
          <LockedLink to="/Payroll/Employee_Salary" icon={Wallet} label="Payroll"/>
        )}
        
        {payrollOpen && features.payroll && (
          <div className="ml-8 mt-2 space-y-2 flex flex-col">
            <Link to="/Payroll/Employee_Salary" className="text-gray-400 m-3 text-sm hover:bg-gray-400 hover:text-white hover:cursor-pointer px-3 rounded-lg py-1">Employee Salary</Link>
            <Link to="/Payroll/Payslip" className="text-gray-400 m-3 text-sm hover:bg-gray-400 hover:text-white hover:cursor-pointer pl-3 rounded-lg py-1">Payslip</Link>
            <Link to="/Payroll/Payroll_items" className="text-gray-400 m-3 text-sm hover:bg-gray-400 hover:text-white hover:cursor-pointer pl-3 rounded-lg py-1">Payroll Items</Link> 
          </div>
        )}
      </div>

      {/* CRM */}
      <h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
        CRM
      </h3>

      <div className="space-y-2">
      {features.leads ? (
        <Link to="/CRM/Leads" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <UserPlus size={18} className="text-slate-500" />
          <span>Leads</span>
        </Link>
      ) : <LockedLink to="/CRM/Leads" icon={UserPlus} label="Leads"/>}

      {features.accounts ? (
        <Link to="/CRM/Accounts" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Building2 size={18} className="text-slate-500" />
          <span>Accounts</span>
        </Link>
      ) : <LockedLink to="/CRM/Accounts" icon={Building2} label="Accounts"/>}

      {features.contacts ? (
        <Link to="/CRM/Contacts" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Contact size={18} className="text-slate-500" />
          <span>Contacts</span>
        </Link>
      ) : <LockedLink to="/CRM/Contacts" icon={Contact} label="Contacts"/>}

      {features.opportunities ? (
        <Link to="/CRM/Opportunities" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Handshake size={18} className="text-slate-500" />
          <span>Opportunities</span>
        </Link>
      ) : <LockedLink to="/CRM/Opportunities" icon={Handshake} label="Opportunities"/>}

      {features.emailTemplates ? (
        <Link to="/CRM/EmailTemplates" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Mail size={18} className="text-slate-500"/>
          <span>Email Templates</span>
        </Link>
      ) : <LockedLink to="/CRM/EmailTemplates" icon={Mail} label="Email Templates"/>}        
      </div>

      {/* ADMIN SECTION — only visible to company admin */}
      {isAdmin && (
        <>
          <h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
            Admin
          </h3>
          <div className="space-y-2">
            {features.manageStaff ? (
              <Link to="/Admin/ManageStaff" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
                <Users size={18} className="text-slate-500" />
                <span>Manage Staff</span>
              </Link>
            ) : <LockedLink to="/Admin/ManageStaff" icon={Users} label="Manage Staff"/>}
          </div>
        </>
      )}

    </aside>
  );
}

export default Sidebar;