// ManagerDashboard.jsx
import { useState, useEffect } from "react";
import ProjectForm from "../components/ProjectForm";

export default function ManagerDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [tempSelectedEmployees, setTempSelectedEmployees] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(data);

    const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(savedProjects);
  }, []);

  const handleCreateProject = (project) => {
    // Шинэ төслийн шалгуур авах
    const criteria = project.criteria;
    // Ажилтнуудыг оноогоор шүүх функц
    const scoreEmployee = (emp) => {
      if (!criteria) return 0;
      let score = 100;
      if (criteria.avoidSingleParent && emp.isSingleParent) score -= 30;
      if (emp.kids >= criteria.avoidManyKids) score -= 20;
      if (criteria.avoidMedical.length > 0) {
        emp.medicalConditions.forEach((cond) => {
          if (criteria.avoidMedical.includes(cond)) score -= 15;
        });
      }
      if (criteria.requiredLanguages.length > 0) {
        const knowsLang = criteria.requiredLanguages.some((lang) =>
          emp.languages.includes(lang)
        );
        if (!knowsLang) score -= 25;
      }
      return score;
    };
    // Автоматаар сонгох (оноо 70-аас дээш)
    const autoSelected = employees
      .map((emp) => ({ ...emp, score: scoreEmployee(emp) }))
      .filter((emp) => emp.score >= 70)
      .map((emp) => emp.id);

    const updated = [
      ...projects,
      { ...project, selectedEmployees: autoSelected },
    ];
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    setSelectedProjectId(project.id);
    setShowForm(false);
  };

  const toggleProject = (projId) => {
    setSelectedProjectId((prevId) => (prevId === projId ? null : projId));
  };

  const handleDeleteProject = (id) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    localStorage.setItem("projects", JSON.stringify(filtered));
    if (selectedProjectId === id) setSelectedProjectId(null);
  };

  const handleToggleTempEmployee = (empId) => {
    setTempSelectedEmployees((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId]
    );
  };

  const handleSaveSelectedEmployees = () => {
    const updatedProjects = projects.map((proj) => {
      if (proj.id === selectedProjectId) {
        return { ...proj, selectedEmployees: tempSelectedEmployees };
      }
      return proj;
    });
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    console.log("Сонгогдсон ажилтнууд:", tempSelectedEmployees);
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const criteria = selectedProject?.criteria;

  useEffect(() => {
    if (selectedProject) {
      setTempSelectedEmployees(selectedProject.selectedEmployees || []);
    }
  }, [selectedProject]);

  const scoreEmployee = (emp) => {
    if (!criteria) return 0;
    let score = 100;
    if (criteria.avoidSingleParent && emp.isSingleParent) score -= 30;
    if (emp.kids >= criteria.avoidManyKids) score -= 20;
    if (criteria.avoidMedical.length > 0) {
      emp.medicalConditions.forEach((cond) => {
        if (criteria.avoidMedical.includes(cond)) score -= 15;
      });
    }
    if (criteria.requiredLanguages.length > 0) {
      const knowsLang = criteria.requiredLanguages.some((lang) =>
        emp.languages.includes(lang)
      );
      if (!knowsLang) score -= 25;
    }
    return score;
  };

  const filteredEmployees = employees
    .map((emp) => ({ ...emp, score: scoreEmployee(emp) }))
    .sort((a, b) => b.score - a.score)
    .filter((emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const selectedEmployeesList = employees.filter((e) =>
    tempSelectedEmployees.includes(e.id)
  );

  return (
    <div className="pb-10">
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-6 px-4 rounded-lg mb-6 shadow">
        <h1 className="text-2xl font-bold">Төслийн удирдагчийн самбар</h1>
        <p className="opacity-80">Төсөл үүсгэж ажилтан оноогоор шүүх</p>
      </div>

      {!showForm && (
        <>
          <div className="mb-6 bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Бүх төслүүд</h2>
            {projects.length === 0 ? (
              <p className="text-gray-500">Одоогоор бүртгэгдсэн төсөл алга.</p>
            ) : (
              <ul className="space-y-2">
                {projects.map((proj) => (
                  <li
                    key={proj.id}
                    className={`cursor-pointer px-4 py-3 rounded border hover:bg-gray-50 transition ${
                      selectedProjectId === proj.id
                        ? "bg-gray-100 border-blue-400"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div
                        onClick={() => toggleProject(proj.id)}
                        className="font-semibold flex-1"
                      >
                        {proj.title}
                        <span className="ml-2 text-xs text-gray-500">
                          ({proj.selectedEmployees?.length || 0} ажилтан)
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100 hover:text-red-700 transition font-semibold shadow-sm"
                      >
                        Устгах
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition font-semibold active:scale-95"
          >
            + Шинэ төсөл үүсгэх
          </button>
        </>
      )}

      {showForm && (
        <ProjectForm
          onCreate={handleCreateProject}
          onCancel={() => setShowForm(false)}
        />
      )}

      {selectedProject && (
        <>
          <div className="bg-white rounded shadow p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {selectedProject.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Түр сонгогдсон ажилтан: {tempSelectedEmployees.length}
            </p>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleSaveSelectedEmployees}
                className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-300 transition font-semibold active:scale-95"
              >
                Хадгалах
              </button>
              <button
                onClick={() => setSelectedProjectId(null)}
                className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium shadow"
              >
                Буцах
              </button>
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

            {selectedEmployeesList.length > 0 && (
              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-6 rounded">
                <h3 className="font-semibold mb-2">Сонгогдсон ажилтнууд</h3>
                <ul className="list-disc list-inside text-sm text-teal-900">
                  {selectedEmployeesList.map((e) => (
                    <li
                      key={e.id}
                      className="flex items-center justify-between"
                    >
                      <span>{e.name}</span>
                      <button
                        onClick={() => handleToggleTempEmployee(e.id)}
                        className="ml-2 text-xs bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition font-semibold shadow-sm"
                      >
                        Хасах
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((emp) => {
              const isSelected = tempSelectedEmployees.includes(emp.id);
              return (
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
                    <div className="flex items-center justify-between">
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
                      <button
                        onClick={() => handleToggleTempEmployee(emp.id)}
                        className={`text-sm px-4 py-1 rounded-full font-semibold shadow-sm transition ${
                          isSelected
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-teal-600 text-white hover:bg-teal-700"
                        }`}
                      >
                        {isSelected ? "Хасах" : "Сонгох"}
                      </button>
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
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
