import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";

// CEO-г /admin руу шилжүүлэх компонент
function RedirectHandler() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Хэрэглэгч нэвтэрсэн бөгөөд роль нь 'ceo' бол /admin руу шилжих
    if (user && user.role === "ceo" && location.pathname === "/") {
      navigate("/admin");
    }
  }, [user, location.pathname, navigate]);

  return null; // UI рендерлэхгүй
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <RedirectHandler />
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
