import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword      from "./Pages/ForgotPassword";
import Login               from "./Pages/Login";
import SignUp              from "./Pages/SignUp";
import Dashboard           from "./dashboard/dashboard";
import Ticket              from "./Tickets/Tickets";
import Ticket_details      from "./Tickets/tickets_details";
import EmployeeDashboard   from "./dashboard/employee_dashboard";
import Employee_Salary     from "./payroll/employee_salary";
import Payslip             from "./payroll/payslip";
import Payrollitems        from "./payroll/payroll_items";
import Leads               from "./CRM/Leads";
import Leads_details       from "./CRM/Leads_details";
import Accounts            from "./CRM/Accounts";
import Contacts            from "./CRM/Contacts";
import Opportunities       from "./CRM/Opportunities";
import LeadCapture         from "./CRM/LeadCapture";
import ManageStaff         from "./CRM/ManageStaff";
import EmailTemplates      from "./CRM/EmailTemplates";
import EmailTemplateEditor from "./CRM/EmailTemplateEditor";
import SuperAdminLogin     from "./Pages/SuperAdminLogin";
import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard";
import SubscriptionCards   from "./subscription/SubscriptionCards";
import MySubscription      from "./subscription/MySubscription";
import PlanGate            from "./components/PlanGate";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/"              element={<Login/>}/>
                <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
                <Route path="/SignUp"         element={<SignUp/>}/>
                <Route path="/lead-capture"  element={<LeadCapture/>}/>

                {/* SuperAdmin routes */}
                <Route path="/superadmin/login"      element={<SuperAdminLogin/>}/>
                <Route path="/superadmin/dashboard"  element={<SuperAdminDashboard/>}/>

                {/* Subscription — always accessible */}
                <Route path="/company/subscription"     element={<SubscriptionCards/>}/>
                <Route path="/company/my-subscription"  element={<MySubscription/>}/>

                {/* Dashboard — always accessible after login */}
                <Route path="/Dashboard/HR_Dashboard"      element={<Dashboard/>}/>
                <Route path="/Dashboard/employee_dashboard" element={<EmployeeDashboard/>}/>

                {/* Tickets — requires Starter+ */}
                <Route path="/Tickets/tickets"         element={<PlanGate feature="tickets"><Ticket/></PlanGate>}/>
                <Route path="/Tickets/tickets_details" element={<PlanGate feature="tickets"><Ticket_details/></PlanGate>}/>

                {/* Payroll — requires Starter+ */}
                <Route path="/Payroll/Employee_Salary" element={<PlanGate feature="payroll"><Employee_Salary/></PlanGate>}/>
                <Route path="/Payroll/Payslip"         element={<PlanGate feature="payroll"><Payslip/></PlanGate>}/>
                <Route path="/Payroll/Payroll_items"   element={<PlanGate feature="payroll"><Payrollitems/></PlanGate>}/>

                {/* Leads — requires Starter+ */}
                <Route path="/CRM/Leads"         element={<PlanGate feature="leads"><Leads/></PlanGate>}/>
                <Route path="/CRM/Leads_details" element={<PlanGate feature="leads"><Leads_details/></PlanGate>}/>

                {/* Accounts — requires Professional+ */}
                <Route path="/CRM/Accounts"      element={<PlanGate feature="accounts"><Accounts/></PlanGate>}/>

                {/* Contacts — requires Professional+ */}
                <Route path="/CRM/Contacts"      element={<PlanGate feature="contacts"><Contacts/></PlanGate>}/>

                {/* Opportunities — requires Professional+ */}
                <Route path="/CRM/Opportunities" element={<PlanGate feature="opportunities"><Opportunities/></PlanGate>}/>

                {/* Email Templates — requires Professional+ */}
                <Route path="/CRM/EmailTemplates"        element={<PlanGate feature="emailTemplates"><EmailTemplates/></PlanGate>}/>
                <Route path="/CRM/EmailTemplates/Editor" element={<PlanGate feature="emailTemplates"><EmailTemplateEditor/></PlanGate>}/>

                {/* Manage Staff — requires Starter+ */}
                <Route path="/Admin/ManageStaff" element={<PlanGate feature="manageStaff"><ManageStaff/></PlanGate>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
