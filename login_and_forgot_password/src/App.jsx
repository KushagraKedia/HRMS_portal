import {BrowserRouter,Routes,Route} from "react-router-dom";
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./dashboard/dashboard"
import Ticket from "./Tickets/Tickets"
import Ticket_details from "./Tickets/tickets_details"
import EmployeeDashboard from "./dashboard/employee_dashboard"
import Employee_Salary from "./payroll/employee_salary"

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
    </Routes>
    </BrowserRouter>
  );
}

export default App;