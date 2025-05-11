// src/pages/ManagerDashboard.jsx
import { useState } from "react";
import { employees } from "../data/employees";

export default function ManagerDashboard() {
  const [criteria, setCriteria] = useState({
    avoidSingleParent: true,
    avoidManyKids: 2,
    avoidMedical: ["даралт", "сахар"],
    requiredLanguages: ["хятад"],
  });

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
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Төслийн удирдагчийн самбар</h1>

      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Шалгуурууд</h2>

        <label className="block mb-2">
          <input
            type="checkbox"
            name="avoidSingleParent"
            checked={criteria.avoidSingleParent}
            onChange={handleChange}
            className="mr-2"
          />
          Өрх толгойлсон ажилтныг сонгохгүй
        </label>

        <label className="block mb-2">
          Хүүхдийн дээд хязгаар:
          <input
            type="number"
            name="avoidManyKids"
            value={criteria.avoidManyKids}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-1"
          />
        </label>

        <label className="block mb-2">
          Зайлсхийх өвчнүүд (таслалаар):
          <input
            type="text"
            value={criteria.avoidMedical.join(", ")}
            onChange={(e) => handleListChange("avoidMedical", e.target.value)}
            className="border p-2 rounded w-full mt-1"
          />
        </label>

        <label className="block mb-2">
          Шаардлагатай хэлнүүд (таслалаар):
          <input
            type="text"
            value={criteria.requiredLanguages.join(", ")}
            onChange={(e) =>
              handleListChange("requiredLanguages", e.target.value)
            }
            className="border p-2 rounded w-full mt-1"
          />
        </label>
      </div>

      <h2 className="text-xl font-semibold mb-2">Нийцсэн ажилтнууд</h2>
      {filteredEmployees.map((emp) => (
        <div
          key={emp.id}
          className="bg-white p-4 rounded shadow mb-2 border-l-4"
          style={{
            borderColor:
              emp.score >= 80
                ? "#22c55e"
                : emp.score >= 50
                ? "#facc15"
                : "#ef4444",
          }}
        >
          <strong>
            {emp.name} — Оноо: {emp.score}
          </strong>
          <div>
            Нас: {emp.age} | Хүүхэд: {emp.kids} | Хэл:{" "}
            {emp.languages.join(", ")}
          </div>
          <div>
            Эрүүл мэнд: {emp.medicalConditions.join(", ")} | Өрх толгойлсон:{" "}
            {emp.isSingleParent ? "Тийм" : "Үгүй"}
          </div>
        </div>
      ))}
    </div>
  );
}
