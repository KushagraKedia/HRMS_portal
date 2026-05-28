import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="signup-card">
        <h1>Company Onboarding</h1>

        <form>
          <input type="text" placeholder="Company Name" />

          <input type="email" placeholder="Company Email" />

          <input type="text" placeholder="Company Website" />

          <input type="text" placeholder="Company Address" />

          <input type="text" placeholder="GST Number" />

          <input type="text" placeholder="Contact Person Name" />

          <input type="tel" placeholder="Phone Number" />

          <select>
            <option>Select Company Size</option>
            <option>1-10 Employees</option>
            <option>11-50 Employees</option>
            <option>51-200 Employees</option>
            <option>200+ Employees</option>
          </select>

          <button type="submit">Create Company Account</button>
        </form>
      </div>
    </div>
  );
}

export default App;