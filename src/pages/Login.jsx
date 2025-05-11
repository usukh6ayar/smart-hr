import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) {
      setError("Нэрээ оруулна уу.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = { name, role };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate(`/${role}`);
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-50 overflow-hidden px-4">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-300 rounded-full filter blur-2xl opacity-20 animate-ping"></div>
      </div>

      <div className="relative z-10 bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Smart HR Нэвтрэх
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        {/* НЭР */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Нэр
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM3 17a7 7 0 0114 0H3z" />
              </svg>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Таны нэр"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ROLE */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Эрх
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 01-8 0M12 14v7m-4-3h8"
                />
              </svg>
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Админ</option>
              <option value="manager">Удирдагч</option>
              <option value="employee">Ажилтан</option>
              <option value="ceo">Захирал</option>
            </select>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded font-semibold text-white shadow-lg transition-all ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
        </button>
      </div>
    </div>
  );
}
