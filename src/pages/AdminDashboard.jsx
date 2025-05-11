import { useState, useEffect } from "react";
import { employees as initialEmployees } from "../data/employees";

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    age: "",
    gender: "эрэгтэй",
    kids: 0,
    isSingleParent: false,
    medicalConditions: "",
    languages: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    avgAge: 0,
    withKids: 0,
    withMedical: 0,
    languages: {},
  });

  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) {
      setEmployees(JSON.parse(saved));
    } else {
      setEmployees(initialEmployees);
    }
  }, []);

  useEffect(() => {
    const total = employees.length;
    const male = employees.filter((emp) => emp.gender === "эрэгтэй").length;
    const female = employees.filter((emp) => emp.gender === "эмэгтэй").length;
    const ages = employees.map((emp) => emp.age);
    const avgAge = ages.length
      ? Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length)
      : 0;
    const withKids = employees.filter((emp) => emp.kids > 0).length;
    const withMedical = employees.filter(
      (emp) => emp.medicalConditions.length > 0
    ).length;

    const languageCounter = {};
    employees.forEach((emp) => {
      emp.languages.forEach((lang) => {
        languageCounter[lang] = (languageCounter[lang] || 0) + 1;
      });
    });

    setStats({
      total,
      male,
      female,
      avgAge,
      withKids,
      withMedical,
      languages: languageCounter,
    });
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddEmployee = () => {
    const formatted = {
      ...newEmployee,
      id: employees.length + 1,
      age: parseInt(newEmployee.age),
      kids: parseInt(newEmployee.kids),
      medicalConditions: newEmployee.medicalConditions
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e),
      languages: newEmployee.languages
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e),
    };
    setEmployees([...employees, formatted]);
    setNewEmployee({
      name: "",
      age: "",
      gender: "эрэгтэй",
      kids: 0,
      isSingleParent: false,
      medicalConditions: "",
      languages: "",
    });
    setIsFormVisible(false);
  };

  const handleRemoveEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-10">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-6 px-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Админ хяналтын самбар</h1>
        <p className="opacity-80">Ажилтнуудын мэдээллийг удирдах</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="text-gray-500">Нийт ажилтан</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="text-gray-500">Дундаж нас</div>
          <div className="text-2xl font-bold">{stats.avgAge}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="text-gray-500">Эрэгтэй/Эмэгтэй</div>
          <div className="text-2xl font-bold">
            {stats.male}/{stats.female}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="text-gray-500">Хүүхэдтэй</div>
          <div className="text-2xl font-bold">{stats.withKids}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Ажилтан хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Ажилтан нэмэх
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Шинэ ажилтан бүртгэх
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ажилтны нэр
              </label>
              <input
                name="name"
                placeholder="Нэр"
                value={newEmployee.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Нас
              </label>
              <input
                name="age"
                type="number"
                placeholder="Нас"
                value={newEmployee.age}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Хүйс
              </label>
              <select
                name="gender"
                value={newEmployee.gender}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="эрэгтэй">Эрэгтэй</option>
                <option value="эмэгтэй">Эмэгтэй</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Хүүхдийн тоо
              </label>
              <input
                name="kids"
                type="number"
                placeholder="Хүүхдийн тоо"
                value={newEmployee.kids}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center h-full pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isSingleParent"
                  checked={newEmployee.isSingleParent}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span>Өрх толгойлсон</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Эрүүл мэндийн нөхцөл (таслалаар)
              </label>
              <input
                name="medicalConditions"
                placeholder="Жишээ: даралт, сахар, харшил"
                value={newEmployee.medicalConditions}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Хэлний мэдлэг (таслалаар)
              </label>
              <input
                name="languages"
                placeholder="Жишээ: монгол, англи, хятад"
                value={newEmployee.languages}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddEmployee}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Нэмэх
            </button>
            <button
              onClick={() => setIsFormVisible(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Цуцлах
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        Ажилтнуудын жагсаалт{" "}
        {filteredEmployees.length > 0 && `(${filteredEmployees.length})`}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {emp.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-lg">{emp.name}</h3>
                      <div className="text-gray-600 text-sm">
                        {emp.age} нас | {emp.gender}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveEmployee(emp.id)}
                    className="text-gray-400 hover:text-red-500"
                    title="Устгах"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-sm">
                  <div>
                    <div className="text-gray-500">Хүүхэд</div>
                    <div>{emp.kids}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Өрх толгойлсон</div>
                    <div>{emp.isSingleParent ? "Тийм" : "Үгүй"}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-500">Эрүүл мэнд</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {emp.medicalConditions.length > 0 ? (
                        emp.medicalConditions.map((condition, idx) => (
                          <span
                            key={idx}
                            className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full"
                          >
                            {condition}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-500">Хэлний мэдлэг</div>
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
