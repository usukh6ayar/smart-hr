import { useState } from "react";

export default function ProjectForm({ onCreate, onCancel }) {
  const [title, setTitle] = useState("");
  const [criteria, setCriteria] = useState({
    avoidSingleParent: false,
    avoidManyKids: 0,
    avoidMedical: [],
    requiredLanguages: [],
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Төслийн нэрийг оруулна уу.");
      return;
    }
    setError("");
    const newProject = {
      id: Date.now(),
      title,
      criteria,
    };
    onCreate(newProject);
    setTitle("");
    setCriteria({
      avoidSingleParent: false,
      avoidManyKids: 0,
      avoidMedical: [],
      requiredLanguages: [],
    });
  };

  return (
    <div className="relative max-w-full mx-auto bg-white shadow-lg p-8 rounded-xl mb-8 border border-gray-200">
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
        aria-label="Хаах"
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Шинэ төсөл үүсгэх
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Төслийн нэр"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 p-3 rounded w-full transition"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={criteria.avoidSingleParent}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  avoidSingleParent: e.target.checked,
                }))
              }
              className="accent-teal-600"
            />
            <span>Өрх толгойлсон ажилтныг зайлсхийх</span>
          </label>
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Хүүхдийн дээд хязгаар
            </label>
            <input
              type="number"
              min={0}
              value={criteria.avoidManyKids}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  avoidManyKids: parseInt(e.target.value) || 0,
                }))
              }
              className="border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 p-2 rounded w-full transition"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-700 mb-1 block">
              Зайлсхийх өвчнүүд{" "}
              <span className="text-gray-400">(таслалаар)</span>
            </label>
            <input
              type="text"
              value={criteria.avoidMedical.join(", ")}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  avoidMedical: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              className="border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 p-2 rounded w-full transition"
              placeholder="Жишээ: чихрийн шижин, даралт"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-700 mb-1 block">
              Шаардлагатай хэлнүүд{" "}
              <span className="text-gray-400">(таслалаар)</span>
            </label>
            <input
              type="text"
              value={criteria.requiredLanguages.join(", ")}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  requiredLanguages: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              className="border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 p-2 rounded w-full transition"
              placeholder="Жишээ: Англи, Орос"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 px-5 py-2 rounded hover:bg-gray-200 transition"
          >
            Буцах
          </button>
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition font-semibold shadow"
          >
            Төсөл үүсгэх
          </button>
        </div>
      </form>
    </div>
  );
}
