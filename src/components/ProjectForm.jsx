import { useState } from "react";

export default function ProjectForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [criteria, setCriteria] = useState({
    avoidSingleParent: false,
    avoidManyKids: 0,
    avoidMedical: [],
    requiredLanguages: [],
  });

  const handleSubmit = () => {
    if (!title.trim()) return;
    const newProject = {
      id: Date.now(),
      title,
      criteria,
    };
    onCreate(newProject);
    setTitle("");
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg mb-6 border">
      <h2 className="text-xl font-semibold mb-4">Шинэ төсөл үүсгэх</h2>
      <input
        type="text"
        placeholder="Төслийн нэр"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={criteria.avoidSingleParent}
            onChange={(e) =>
              setCriteria((prev) => ({
                ...prev,
                avoidSingleParent: e.target.checked,
              }))
            }
          />
          <span>Өрх толгойлсон ажилтныг зайлсхийх</span>
        </label>
        <div>
          <label className="text-sm text-gray-700">Хүүхдийн дээд хязгаар</label>
          <input
            type="number"
            value={criteria.avoidManyKids}
            onChange={(e) =>
              setCriteria((prev) => ({
                ...prev,
                avoidManyKids: parseInt(e.target.value),
              }))
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-700">
            Зайлсхийх өвчнүүд (таслалаар)
          </label>
          <input
            type="text"
            value={criteria.avoidMedical.join(", ")}
            onChange={(e) =>
              setCriteria((prev) => ({
                ...prev,
                avoidMedical: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-700">
            Шаардлагатай хэлнүүд (таслалаар)
          </label>
          <input
            type="text"
            value={criteria.requiredLanguages.join(", ")}
            onChange={(e) =>
              setCriteria((prev) => ({
                ...prev,
                requiredLanguages: e.target.value
                  .split(",")
                  .map((s) => s.trim()),
              }))
            }
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        Төсөл үүсгэх
      </button>
    </div>
  );
}
