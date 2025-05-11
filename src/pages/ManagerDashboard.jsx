import { useState, useEffect } from "react";

export default function ManagerDashboard() {
  const [criteria, setCriteria] = useState({
    avoidSingleParent: true,
    avoidManyKids: 2,
    avoidMedical: ["даралт", "сахар"],
    requiredLanguages: ["хятад"],
  });

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(data);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleListChange = (name, value) => {
    setCriteria((prev) => ({
      ...prev,
      [name]: value.split(",").map((s) => s.trim()),
    }));
  };

  const scoreEmployee = (emp) => {
    let score = 100;
    if (criteria.avoidSingleParent && emp.isSingleParent) score -= 30;
    if (emp.kids >= criteria.avoidManyKids) score -= 20;
    emp.medicalConditions.forEach((cond) => {
      if (criteria.avoidMedical.includes(cond)) score -= 15;
    });
    const knowsLang = criteria.requiredLanguages.some((lang) =>
      emp.languages.includes(lang)
    );
    if (!knowsLang) score -= 25;
    return score;
  };

  const filteredEmployees = employees
    .map((emp) => ({
      ...emp,
      score: scoreEmployee(emp),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="pb-10">
      {" "}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-6 px-4 rounded-lg mb-6">
        {" "}
        <h1 className="text-2xl font-bold">Төслийн удирдагчийн самбар</h1>{" "}
        <p className="opacity-80">Шалгуур тавьж ажилтан оноогоор шүүх</p>{" "}
      </div>
      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Шалгуурууд</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="avoidSingleParent"
              checked={criteria.avoidSingleParent}
              onChange={handleChange}
            />
            <span>Өрх толгойлсон ажилтныг сонгохгүй</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Хүүхдийн дээд хязгаар
            </label>
            <input
              type="number"
              name="avoidManyKids"
              value={criteria.avoidManyKids}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Зайлсхийх өвчнүүд (таслалаар)
            </label>
            <input
              type="text"
              value={criteria.avoidMedical.join(", ")}
              onChange={(e) => handleListChange("avoidMedical", e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Шаардлагатай хэлнүүд (таслалаар)
            </label>
            <input
              type="text"
              value={criteria.requiredLanguages.join(", ")}
              onChange={(e) =>
                handleListChange("requiredLanguages", e.target.value)
              }
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>
      <div className="relative flex-grow max-w-md mb-6">
        <input
          type="text"
          placeholder="Ажилтан хайх..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-4">
        Ажилтны жагсаалт{" "}
        {filteredEmployees.length > 0 && `(${filteredEmployees.length})`}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow border-l-4"
              style={{
                borderColor:
                  emp.score >= 80
                    ? "#22c55e"
                    : emp.score >= 50
                    ? "#facc15"
                    : "#ef4444",
              }}
            >
              <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 border-b">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                    {emp.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-lg">{emp.name}</h3>
                    <div className="text-gray-600 text-sm">
                      {emp.age} нас | {emp.gender} | Оноо: {emp.score}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-sm text-gray-700">
                <div className="mb-1">
                  <span className="text-gray-500">Хүүхэд:</span> {emp.kids}
                </div>
                <div className="mb-1">
                  <span className="text-gray-500">Өрх толгойлсон:</span>{" "}
                  {emp.isSingleParent ? "Тийм" : "Үгүй"}
                </div>
                <div className="mb-1">
                  <span className="text-gray-500">Эрүүл мэнд:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {emp.medicalConditions.length > 0 ? (
                      emp.medicalConditions.map((cond, idx) => (
                        <span
                          key={idx}
                          className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full"
                        >
                          {cond}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
                <div className="mb-1">
                  <span className="text-gray-500">Хэл:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {emp.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-8 text-center text-gray-500">
            Хайлтад тохирох ажилтан олдсонгүй.
          </div>
        )}
      </div>
    </div>
  );
}
