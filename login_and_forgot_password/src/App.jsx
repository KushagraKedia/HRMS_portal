import {BrowserRouter,Routes,Route} from "react-router-dom";
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./dashboard/dashboard"
import Ticket from "./Tickets/Tickets"
import Ticket_details from "./Tickets/tickets_details"

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Tickets/tickets" element={<Ticket />} />
      <Route path="/Tickets/tickets_details" element={<Ticket_details />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;