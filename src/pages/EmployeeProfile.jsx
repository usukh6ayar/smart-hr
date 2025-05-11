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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Миний профайл</h1>
      <div className="bg-white shadow p-6 rounded">
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Нэр"
              value={employee.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="age"
              type="number"
              placeholder="Нас"
              value={employee.age}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="gender"
              value={employee.gender}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="эрэгтэй">Эрэгтэй</option>
              <option value="эмэгтэй">Эмэгтэй</option>
            </select>
            <input
              name="kids"
              type="number"
              placeholder="Хүүхдийн тоо"
              value={employee.kids}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isSingleParent"
                checked={employee.isSingleParent}
                onChange={handleChange}
              />
              <span>Өрх толгойлсон</span>
            </label>
            <input
              name="medicalConditions"
              placeholder="Эрүүл мэнд (таслалаар)"
              value={employee.medicalConditions}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
            />
            <input
              name="languages"
              placeholder="Хэлний мэдлэг (таслалаар)"
              value={employee.languages}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
            />
            <div className="col-span-2 flex space-x-4">
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
                Болих
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-bold text-lg">{employee.name}</div>
            <div>Нас: {employee.age}</div>
            <div>Хүйс: {employee.gender}</div>
            <div>Хүүхэд: {employee.kids}</div>
            <div>
              Өрх толгойлсон: {employee.isSingleParent ? "Тийм" : "Үгүй"}
            </div>
            <div>Эрүүл мэнд: {employee.medicalConditions}</div>
            <div>Хэл: {employee.languages}</div>
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
