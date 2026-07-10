import {BrowserRouter,Routes,Route} from "react-router-dom";
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./dashboard/dashboard"
import Ticket from "./Tickets/Tickets"
import Ticket_details from "./Tickets/tickets_details"
import EmployeeDashboard from "./dashboard/employee_dashboard"
import Employee_Salary from "./payroll/employee_salary"
import Payslip from "./payroll/payslip"
import Payrollitems from "./payroll/payroll_items"
import Leads from "./CRM/Leads"
import Leads_details from "./CRM/Leads_details"
import Accounts      from "./CRM/Accounts"
import Contacts      from "./CRM/Contacts"
import Opportunities from "./CRM/Opportunities"
import LeadCapture   from "./CRM/LeadCapture"
import ManageStaff from "./CRM/ManageStaff"
import EmailTemplates      from "./CRM/EmailTemplates"
import EmailTemplateEditor from "./CRM/EmailTemplateEditor"


function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Dashboard/HR_Dashboard" element={<Dashboard />} />
      <Route path="/Tickets/tickets" element={<Ticket />} />
      <Route path="/Tickets/tickets_details" element={<Ticket_details />} />
      <Route path="/Dashboard/employee_dashboard" element={<EmployeeDashboard />} />
      <Route path="/Payroll/Employee_Salary" element={<Employee_Salary />} />
      <Route path="/Payroll/Payslip" element={<Payslip />} />
      <Route path="/Payroll/Payroll_items" element={<Payrollitems />} />
      <Route path="/CRM/Leads" element={<Leads />} />
      <Route path="/CRM/Leads_details" element={<Leads_details />} />
      <Route path="/CRM/Accounts"      element={<Accounts/>}/>
      <Route path="/CRM/Contacts"      element={<Contacts/>}/>
      <Route path="/CRM/Opportunities" element={<Opportunities/>}/>
      <Route path="/lead-capture"      element={<LeadCapture/>}/>
      <Route path="/Admin/ManageStaff" element={<ManageStaff/>}/>
      <Route path="/CRM/EmailTemplates"        element={<EmailTemplates/>}/>
      <Route path="/CRM/EmailTemplates/Editor" element={<EmailTemplateEditor/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;