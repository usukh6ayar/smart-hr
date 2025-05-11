import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route
              path="/employee"
              element={<EmployeeProfile employeeId={2} />}
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
