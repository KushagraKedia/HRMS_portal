import {BrowserRouter,Routes,Route} from "react-router-dom";
import ForgotPassword from "./Pages/ForgotPassword";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./dashboard/dashboard"

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;