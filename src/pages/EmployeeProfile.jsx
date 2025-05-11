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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!employee.name.trim()) newErrors.name = "Нэр оруулна уу";
    if (!employee.age || employee.age < 18)
      newErrors.age = "Нас 18-аас дээш байх ёстой";
    if (employee.kids < 0)
      newErrors.kids = "Хүүхдийн тоо 0-ээс бага байж болохгүй";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSave = () => {
    if (!validateForm()) return;

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
    setErrors({});
  };

  const badgeList = (items, color) =>
    items.length ? (
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className={`text-xs font-medium px-3 py-1 rounded-full ${color} transition-all hover:shadow-md`}
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      <span className="text-gray-400 italic">-</span>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <svg
          className="w-8 h-8 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Миний профайл
      </h1>
      <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300">
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Нэр
              </label>
              <input
                name="name"
                value={employee.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Таны нэр"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Нас
              </label>
              <input
                name="age"
                type="number"
                value={employee.age}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                  errors.age ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Таны нас"
                aria-invalid={errors.age ? "true" : "false"}
                aria-describedby={errors.age ? "age-error" : undefined}
              />
              {errors.age && (
                <p id="age-error" className="text-red-500 text-sm mt-1">
                  {errors.age}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Хүйс
              </label>
              <select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="эрэгтэй">Эрэгтэй</option>
                <option value="эмэгтэй">Эмэгтэй</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Хүүхдийн тоо
              </label>
              <input
                name="kids"
                type="number"
                value={employee.kids}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                  errors.kids ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Хүүхдийн тоо"
                aria-invalid={errors.kids ? "true" : "false"}
                aria-describedby={errors.kids ? "kids-error" : undefined}
              />
              {errors.kids && (
                <p id="kids-error" className="text-red-500 text-sm mt-1">
                  {errors.kids}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isSingleParent"
                checked={employee.isSingleParent}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                id="singleParent"
              />
              <label
                htmlFor="singleParent"
                className="text-sm font-medium text-gray-700"
              >
                Өрх толгойлсон
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Эрүүл мэндийн байдал (таслалаар тусгаарлана уу)
              </label>
              <input
                name="medicalConditions"
                value={employee.medicalConditions}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Жишээ: даралт, сахар"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Мэддэг хэл (таслалаар тусгаарлана уу)
              </label>
              <input
                name="languages"
                value={employee.languages}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Жишээ: монгол, англи"
              />
            </div>
            <div className="md:col-span-2 flex space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Хадгалах
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setErrors({});
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 active:scale-95 transition-all"
              >
                Цуцлах
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                {employee.name ? employee.name.charAt(0) : "?"}
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-800">
                  {employee.name || "Нэр оруулаагүй"}
                </div>
                <div className="text-sm text-gray-500">Ажилтны профайл</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-gray-500">Нас</div>
                <div className="text-lg text-gray-800">
                  {employee.age || "-"}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Хүйс</div>
                <div className="text-lg text-gray-800">{employee.gender}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Хүүхдийн тоо
                </div>
                <div className="text-lg text-gray-800">{employee.kids}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Өрх толгойлсон
                </div>
                <div className="text-lg text-gray-800">
                  {employee.isSingleParent ? "Тийм" : "Үгүй"}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-2">
                Эрүүл мэндийн байдал
              </div>
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
              <div className="text-sm font-medium text-gray-500 mb-2">
                Мэддэг хэл
              </div>
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
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828L14.586 4.586a2 2 0 012.828 0z"
                />
              </svg>
              Засах
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
