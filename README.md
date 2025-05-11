# 📘 Smart HR — Vite + React + Tailwind Project

## 🔰 Төслийн зорилго

Smart HR бол байгууллагын хүний нөөцийн ажилтнуудад зориулсан вэб платформ бөгөөд ажилтнуудын мэдээлэл дээр үндэслэн төслийн шаардлагад нийцэх ажилтнуудыг сонгох, шалгуур тавих боломжийг олгоно. Энэхүү хувилбар нь зөвхөн frontend бөгөөд backend ашиглахгүй, mock data ашиглан UI хөгжүүлэлт хийгдсэн.

---

## ⚙️ Ашигласан технологиуд

| Технологи                   | Тайлбар                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| [Vite](https://vitejs.dev/) | React төслийг хурдан, хөнгөн байдлаар эхлүүлэх билдер             |
| React JS                    | Component-based UI хөгжүүлэлт                                     |
| Tailwind CSS                | Utility-first CSS framework — хурдан, responsive UI хийхэд хялбар |
| React Router DOM            | Олон хуудаст навигаци хийхэд хэрэглэнэ                            |
| LocalStorage                | Backend байхгүй тул хэрэглэгчийн мэдээллийг локалд хадгалах       |

---

## 📂 Төслийн фолдер бүтэц

```bash
src/
├── components/         # UI component-ууд (Navbar, Card г.м.)
├── data/               # mock data (employees.js, projects.js)
├── pages/              # Хуудас бүрийн component-ууд (Admin, Manager, Employee)
├── App.jsx             # App entry
├── main.jsx            # Root render
├── index.css           # Tailwind style entry
```

---

## 👥 Оролцогчид ба эрхүүд

| Role                | Эрх                                                 |
| ------------------- | --------------------------------------------------- |
| 👑 Админ            | Ажилтан нэмэх, засах, устгах, жагсаалт харах        |
| 📋 Төслийн удирдагч | Төсөл үүсгэх, шалгуур тавих, ажилтныг оноогоор шүүх |
| 👤 Ажилтан          | Өөрийн мэдээллийг харах, засварлах                  |

---

## 💡 Гол боломжууд

- 📌 **Admin Dashboard** — ажилтан бүртгэх, жагсаалт харах, localStorage-д хадгалах
- 📌 **Manager Dashboard** — шалгуур (хэл, эрүүл мэнд, хүүхэд, өрх толгойлсон) тавьж онооны системээр ажилтан шүүх
- 📌 **Employee Profile** — өөрийн мэдээлэл харах/засах (mock)
- 📌 **Responsive** дизайн (Tailwind ашиглан)
- 📌 **Route** бүхий олон дэлгэц хооронд шилжих боломж

---

## 🚀 Суурилуулалт ба ажиллуулах

```bash
# 1. Төслийг үүсгэх
npm create vite@latest smart-hr --template react
cd smart-hr

# 2. Tailwind суулгах
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Tailwind тохируулах
# tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

# 4. index.css-г дараах байдлаар тохируулах
@tailwind base;
@tailwind components;
@tailwind utilities;

# 5. Хэрэглээний багцууд суулгах
npm install react-router-dom

# 6. Сервер асаах
npm run dev
```

---

## 📦 Mock Data жишээ (`src/data/employees.js`)

```js
export const employees = [
  {
    id: 1,
    name: "Батжав Ганчимэг",
    age: 32,
    gender: "эмэгтэй",
    kids: 3,
    isSingleParent: true,
    medicalConditions: ["даралт", "сахар"],
    languages: ["монгол", "англи"],
  },
  {
    id: 2,
    name: "Дорж Ганболд",
    age: 28,
    gender: "эрэгтэй",
    kids: 0,
    isSingleParent: false,
    medicalConditions: [],
    languages: ["монгол", "хятад"],
  },
];
```

---

## 🔮 Ирээдүйд хөгжүүлэх боломжууд

- Firebase зэрэг backend нэмэх
- Ажилтны шалгаруулалтыг AI/ML ашиглан оновчтой болгох
- PDF экспорт, Excel upload
- Login system (mock эсвэл Firebase)

---

## 🧑‍💻 Зохиогч

- Хэрэглэгчийн тусгай зориулалттай HR системийн React вэб төслийн үндэс, олон UI боломжийг тайлбарласан AI туслах
