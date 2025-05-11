import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-700" : "";
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xl font-bold">Smart HR</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "/"
                  )} hover:bg-blue-700`}
                >
                  Админ
                </Link>
                <Link
                  to="/manager"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "/manager"
                  )} hover:bg-blue-700`}
                >
                  Төслийн удирдагч
                </Link>
                <Link
                  to="/employee"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                    "/employee"
                  )} hover:bg-blue-700`}
                >
                  Ажилтан
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-white hover:bg-blue-700 focus:outline-none">
                <span className="sr-only">Мэдэгдлүүд</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs bg-blue-700 rounded-full flex items-center text-sm focus:outline-none">
                    <span className="sr-only">Хэрэглэгчийн цэс</span>
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="font-medium">А</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <span className="sr-only">Цэс нээх</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/"
            )} hover:bg-blue-700`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Админ
          </Link>
          <Link
            to="/manager"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/manager"
            )} hover:bg-blue-700`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Төслийн удирдагч
          </Link>
          <Link
            to="/employee"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/employee"
            )} hover:bg-blue-700`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ажилтан
          </Link>
        </div>
      </div>
    </nav>
  );
}
