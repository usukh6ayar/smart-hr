// src/pages/AdminDashboard.jsx
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

  // LocalStorage-оос мэдээлэл унших
  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) {
      setEmployees(JSON.parse(saved));
    } else {
      setEmployees(initialEmployees);
    }
  }, []);

  // LocalStorage-д хадгалах
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
        .map((e) => e.trim()),
      languages: newEmployee.languages.split(",").map((e) => e.trim()),
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
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Админ хяналтын самбар</h1>

      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Ажилтан нэмэх</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Нэр"
            value={newEmployee.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="age"
            type="number"
            placeholder="Нас"
            value={newEmployee.age}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="gender"
            value={newEmployee.gender}
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
            value={newEmployee.kids}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isSingleParent"
              checked={newEmployee.isSingleParent}
              onChange={handleChange}
            />
            <span>Өрх толгойлсон</span>
          </label>
          <input
            name="medicalConditions"
            placeholder="Эрүүл мэнд (таслалаар)"
            value={newEmployee.medicalConditions}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />
          <input
            name="languages"
            placeholder="Хэлний мэдлэг (таслалаар)"
            value={newEmployee.languages}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />
        </div>
        <button
          onClick={handleAddEmployee}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Нэмэх
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Ажилтнуудын жагсаалт</h2>
      <div className="grid gap-4">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white p-4 rounded shadow">
            <div className="font-bold">{emp.name}</div>
            <div>
              Нас: {emp.age} | Хүйс: {emp.gender}
            </div>
            <div>
              Хүүхэд: {emp.kids} | Өрх толгойлсон:{" "}
              {emp.isSingleParent ? "Тийм" : "Үгүй"}
            </div>
            <div>Эрүүл мэнд: {emp.medicalConditions.join(", ")}</div>
            <div>Хэл: {emp.languages.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
