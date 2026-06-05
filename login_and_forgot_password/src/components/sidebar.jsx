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
  UserX
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

import GIC from "../assets/GIC1.webp";

function Sidebar() {
  return (
    <aside className="w-72 h-screen overflow-y-auto bg-[#F8F9FA] border-r border-gray-200 px-4 py-4">

      <img src={GIC} alt="calendar" className="h-20 w-60" />
      {/* MAIN MENU */}
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 mt-8">
        Main Menu
      </h3>

      <div className="space-y-2">

        <div className="flex items-center justify-between bg-gray-200 rounded-lg px-3 py-3">
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

        <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <LayoutGrid size={18} className="text-slate-500" />
            <span>Applications</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-slate-500" />
            <span>Super Admin</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* LAYOUT */}
      <h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
        Layout
      </h3>

      <div className="space-y-2">

        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <PanelTop size={18} className="text-slate-500" />
          <span>Horizontal</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Triangle size={18} className="text-slate-500" />
          <span>Detached</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Monitor size={18} className="text-slate-500" />
          <span>Modern</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Columns2 size={18} className="text-slate-500" />
          <span>Two Column</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <MousePointer2 size={18} className="text-slate-500" />
          <span>Hovered</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <Package size={18} className="text-slate-500" />
          <span>Boxed</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
          <SquareMenu size={18} className="text-slate-500" />
          <span>Horizontal Single</span>
        </div>

      </div>
      {/* HRM */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  HRM
</h3>

<div className="space-y-2">

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Users size={18} className="text-slate-500" />
      <span>Employees</span>
    </div>
    <ChevronDown size={16} />
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Ticket size={18} className="text-slate-500" />
    <span>Tickets</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <CalendarDays size={18} className="text-slate-500" />
    <span>Holidays</span>
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <ClipboardCheck size={18} className="text-slate-500" />
      <span>Attendance</span>
    </div>
    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <GraduationCap size={18} className="text-slate-500" />
      <span>Performance</span>
    </div>
    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <PencilLine size={18} className="text-slate-500" />
      <span>Training</span>
    </div>
    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Hourglass size={18} className="text-slate-500" />
      <span>Probation Management</span>
    </div>

    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-md">
      New
    </span>
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <BellRing size={18} className="text-slate-500" />
      <span>Notice Period Tracker</span>
    </div>

    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-md">
      New
    </span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Megaphone size={18} className="text-slate-500" />
    <span>Promotion</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <LogOut size={18} className="text-slate-500" />
    <span>Resignation</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <UserX size={18} className="text-slate-500" />
    <span>Termination</span>
  </div>

</div>

{/* RECRUITMENT */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  Recruitment
</h3>

<div className="space-y-2">

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Briefcase size={18} className="text-slate-500" />
      <span>Jobs</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <UserRoundPlus size={18} className="text-slate-500" />
      <span>Candidates</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <UserPlus size={18} className="text-slate-500" />
    <span>Referrals</span>
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Users size={18} className="text-slate-500" />
      <span>Campus Hiring</span>
    </div>

    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-md">
      New
    </span>
  </div>

</div>

{/* FINANCE & ACCOUNTS */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  Finance & Accounts
</h3>

<div className="space-y-2">

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Landmark size={18} className="text-slate-500" />
      <span>Sales</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Receipt size={18} className="text-slate-500" />
      <span>Accounting</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Wallet size={18} className="text-slate-500" />
      <span>Payroll</span>
    </div>

    <ChevronDown size={16} />
  </div>

</div>

{/* ADMINISTRATION */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  Administration
</h3>

<div className="space-y-2">

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Boxes size={18} className="text-slate-500" />
    <span>Assets</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Headphones size={18} className="text-slate-500" />
    <span>Help & Supports</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <UserCog size={18} className="text-slate-500" />
    <span>User Management</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <FileBarChart size={18} className="text-slate-500" />
    <span>Reports</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Settings size={18} className="text-slate-500" />
    <span>Settings</span>
  </div>

</div>

{/* CONTENT */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  Content
</h3>

<div className="space-y-2">

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <FileText size={18} className="text-slate-500" />
      <span>Pages</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <BookOpen size={18} className="text-slate-500" />
      <span>Blogs</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <MapPin size={18} className="text-slate-500" />
    <span>Locations</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <MessageSquare size={18} className="text-slate-500" />
    <span>Testimonials</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <CircleHelp size={18} className="text-slate-500" />
    <span>FAQ'S</span>
  </div>

</div>

{/* PAGES */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  Pages
</h3>

<div className="space-y-2">

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <FileText size={18} className="text-slate-500" />
    <span>Starter</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <User size={18} className="text-slate-500" />
    <span>Profile</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Image size={18} className="text-slate-500" />
    <span>Gallery</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Search size={18} className="text-slate-500" />
    <span>Search Results</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Clock3 size={18} className="text-slate-500" />
    <span>Timeline</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Wallet size={18} className="text-slate-500" />
    <span>Pricing</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Construction size={18} className="text-slate-500" />
    <span>Coming Soon</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Construction size={18} className="text-slate-500" />
    <span>Under Maintenance</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Construction size={18} className="text-slate-500" />
    <span>Under Construction</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <KeyRound size={18} className="text-slate-500" />
    <span>API Keys</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Shield size={18} className="text-slate-500" />
    <span>Privacy Policy</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <FileWarning size={18} className="text-slate-500" />
    <span>Terms & Conditions</span>
  </div>

</div>
{/* AUTHENTICATION */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  Authentication
</h3>

<div className="space-y-2">

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <LogIn size={18} className="text-slate-500" />
    <span>Login</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <UserPlus2 size={18} className="text-slate-500" />
    <span>Register</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <TriangleAlert size={18} className="text-slate-500" />
    <span>Forgot Password</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <RotateCcw size={18} className="text-slate-500" />
    <span>Reset Password</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <MailCheck size={18} className="text-slate-500" />
    <span>Email Verification</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Shield size={18} className="text-slate-500" />
    <span>2 Step Verification</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <Lock size={18} className="text-slate-500" />
    <span>Lock Screen</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <FileWarning size={18} className="text-slate-500" />
    <span>404 Error</span>
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <FileWarning size={18} className="text-slate-500" />
    <span>500 Error</span>
  </div>

</div>
{/* UI INTERFACE */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  UI Interface
</h3>

<div className="space-y-2">

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Shapes size={18} className="text-slate-500" />
      <span>Base UI</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Shapes size={18} className="text-slate-500" />
      <span>Advanced UI</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <BarChart3 size={18} className="text-slate-500" />
      <span>Charts</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Shapes size={18} className="text-slate-500" />
      <span>Icons</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <FormInput size={18} className="text-slate-500" />
      <span>Forms</span>
    </div>

    <ChevronDown size={16} />
  </div>

  <div className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <Table size={18} className="text-slate-500" />
      <span>Tables</span>
    </div>

    <ChevronDown size={16} />
  </div>

</div>
{/* EXTRAS */}
<h3 className="text-xs font-bold text-gray-400 uppercase mt-10 mb-4">
  Extras
</h3>

<div className="space-y-2 mb-10">

  <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100">
    <BookOpen size={18} className="text-slate-500" />
    <span>Documentation</span>
  </div>

</div>
    </aside>
  );
}

export default Sidebar;