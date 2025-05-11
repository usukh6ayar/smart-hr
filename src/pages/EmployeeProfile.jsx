import { useState, useEffect } from "react";

export default function EmployeeProfile({ employeeId }) {
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    gender: "эрэгтэй",
    kids: 0,
    isSingleParent: false,
    medicalConditions: "",
    languages: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const currentEmployee = employees.find((emp) => emp.id === employeeId);
    if (currentEmployee) {
      setEmployee({
        ...currentEmployee,
        medicalConditions: currentEmployee.medicalConditions.join(", "),
        languages: currentEmployee.languages.join(", "),
      });
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    const updatedEmployee = {
      ...employee,
      age: parseInt(employee.age),
      kids: parseInt(employee.kids),
      medicalConditions: employee.medicalConditions
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e),
      languages: employee.languages
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e),
    };

    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const updatedEmployees = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, ...updatedEmployee } : emp
    );
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    setIsEditing(false);
  };

  const badgeList = (items, color) =>
    items.length ? (
      <div className="flex flex-wrap gap-1 mt-1">
        {items.map((item, idx) => (
          <span
            key={idx}
            className={`text-xs px-2 py-0.5 rounded-full ${color}`}
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      <span className="text-gray-400">-</span>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Миний профайл</h1>
      <div className="bg-white shadow p-6 rounded">
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Нэр
              </label>
              <input
                name="name"
                value={employee.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Нас
              </label>
              <input
                name="age"
                type="number"
                value={employee.age}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Хүйс
              </label>
              <select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
                className="border p-2 rounded w-full"
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
                value={employee.kids}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isSingleParent"
                checked={employee.isSingleParent}
                onChange={handleChange}
              />
              <span>Өрх толгойлсон</span>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Эрүүл мэнд (таслалаар)
              </label>
              <input
                name="medicalConditions"
                value={employee.medicalConditions}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Хэл (таслалаар)
              </label>
              <input
                name="languages"
                value={employee.languages}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="col-span-2 flex space-x-3 mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Хадгалах
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Цуцлах
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="text-gray-500 text-sm">Нэр</div>
              <div className="text-lg font-medium">{employee.name || "-"}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 text-sm">Нас</div>
                <div>{employee.age || "-"}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Хүйс</div>
                <div>{employee.gender}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Хүүхэд</div>
                <div>{employee.kids}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Өрх толгойлсон</div>
                <div>{employee.isSingleParent ? "Тийм" : "Үгүй"}</div>
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Эрүүл мэнд</div>
              {badgeList(
                employee.medicalConditions
                  ? employee.medicalConditions
                      .split(",")
                      .map((c) => c.trim())
                      .filter(Boolean)
                  : [],
                "bg-red-100 text-red-800"
              )}
            </div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Хэл</div>
              {badgeList(
                employee.languages
                  ? employee.languages
                      .split(",")
                      .map((l) => l.trim())
                      .filter(Boolean)
                  : [],
                "bg-blue-100 text-blue-800"
              )}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Засах
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
