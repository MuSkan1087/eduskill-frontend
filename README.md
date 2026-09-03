# 🚀 EntreSkill Hub

EntreSkill Hub is a full-stack learning platform designed to help students
learn new skills, explore courses, enroll in courses, and track their learning
journey.

The project is built using the MERN-style full-stack architecture with
React.js, Node.js, Express.js, and MongoDB.

---

## 🌐 Live Project

**Frontend:**  
https://eduskill-frontend.vercel.app

**Backend:**  
https://eduskill-backend.onrender.com

**GitHub Frontend:**  
https://github.com/MuSkan1087/eduskill-frontend

**GitHub Backend:**  
https://github.com/MuSkan1087/eduskill-backend

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout functionality
- Role-based access

### 📚 Course Management

- View all courses
- Search courses
- View course details
- Add new courses
- Edit courses
- Delete courses
- Course image support

### 🎓 Student Features

- Enroll in courses
- View enrolled courses
- My Courses section
- Learning progress display
- User profile

### 👨‍💼 Admin Features

- Add courses
- Edit courses
- Delete courses
- Role-based course management

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Tools & Deployment

- Git
- GitHub
- Vercel
- Render
- MongoDB Atlas
- VS Code

---

## 🏗️ Project Structure

### Frontend

```text
frontend-react/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── CourseCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatsCard.jsx
│   │
│   ├── pages/
│   │   ├── AddCourse.jsx
│   │   ├── Admin.jsx
│   │   ├── CourseDetails.jsx
│   │   ├── Courses.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditCourse.jsx
│   │   ├── Login.jsx
│   │   ├── MyCourses.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md


backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── courseController.js
│   └── userController.js
│
├── middleware/
│   └── protect.js
│
├── models/
│   ├── Course.js
│   └── User.js
│
├── routes/
│   ├── courseRoutes.js
│   └── userRoutes.js
│
├── server.js
├── package.json
└── .env
