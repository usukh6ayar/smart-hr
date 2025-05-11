import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setUser(null);
  };

  const isDisabled = (targetRole) => {
    return user?.role !== targetRole ? "pointer-events-none opacity-50" : "";
  };

  const isActive = (path) => (location.pathname === path ? "bg-blue-700" : "");

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xl font-bold">Smart HR</span>
            </Link>
            {user && (
              <div className="hidden md:flex ml-10 space-x-4">
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive(
                    "/admin"
                  )} ${isDisabled("admin")}`}
                >
                  Админ
                </Link>
                <Link
                  to="/manager"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive(
                    "/manager"
                  )} ${isDisabled("manager")}`}
                >
                  Төслийн удирдагч
                </Link>
                <Link
                  to="/employee"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive(
                    "/employee"
                  )} ${isDisabled("employee")}`}
                >
                  Ажилтан
                </Link>
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                <button className="p-1 rounded-full text-white hover:bg-blue-700">
                  <span className="sr-only">Мэдэгдэл</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                    />
                  </svg>
                </button>

                <div className="flex items-center space-x-2 bg-blue-700 px-3 py-1 rounded-full">
                  <div className="h-8 w-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm">
                    {user.name} ({user.role})
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
                >
                  Гарах
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && user && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Админ
            </Link>
          )}
          {user.role === "manager" && (
            <Link
              to="/manager"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Төслийн удирдагч
            </Link>
          )}
          {user.role === "employee" && (
            <Link
              to="/employee"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ажилтан
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
          >
            Гарах
          </button>
        </div>
      )}
    </nav>
  );
}
