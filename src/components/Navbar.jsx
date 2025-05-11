// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Smart HR</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Админ
        </Link>
        <Link to="/manager" className="hover:underline">
          Удирдагч
        </Link>
        <Link to="/employee" className="hover:underline">
          Ажилтан
        </Link>
      </div>
    </nav>
  );
}
