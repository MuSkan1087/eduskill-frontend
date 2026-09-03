# 🚀 EntreSkill Hub

A full-stack learning platform that helps students discover courses, enroll
in courses, and manage their learning journey.

EntreSkill Hub provides authentication, role-based access, course management,
course enrollment, and user profile functionality through a modern
React + Node.js + MongoDB architecture.

---

## 🌐 Live Demo

### Frontend
https://eduskill-frontend.vercel.app

### Backend API
https://eduskill-backend.onrender.com

### GitHub Repositories

- Frontend:
  https://github.com/MuSkan1087/eduskill-frontend

- Backend:
  https://github.com/MuSkan1087/eduskill-backend

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout functionality
- Role-based access control

### 📚 Course Management

- View all available courses
- Search courses
- View course details
- Add new courses
- Edit existing courses
- Delete courses
- Course image support

### 🎓 Student Features

- Enroll in courses
- View enrolled courses
- My Courses section
- Learning progress display
- User profile
- Protected student routes

### 👨‍💼 Admin Features

- Add courses
- Edit courses
- Delete courses
- Manage courses using role-based authorization

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
- VS Code
- MongoDB Atlas
- Render
- Vercel

---

## 🏗️ System Architecture

```text
┌──────────────────────┐
│   React Frontend     │
│   Vite + Tailwind    │
└──────────┬───────────┘
           │
           │ Axios / REST API
           ▼
┌──────────────────────┐
│   Node.js + Express  │
│      Backend API     │
└──────────┬───────────┘
           │
           │ Mongoose
           ▼
┌──────────────────────┐
│    MongoDB Atlas     │
│       Database       │
└──────────────────────┘

🔐 Authentication Flow

User
  │
  ▼
Register / Login
  │
  ▼
Express API
  │
  ▼
MongoDB
  │
  ▼
JWT Token
  │
  ▼
Local Storage
  │
  ▼
Protected API Requests

📂 Project Structure
Frontend

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

Backend

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

📡 API Endpoints

User APIs

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/api/users/register`  | Register a new user  |
| POST   | `/api/users/login`     | Login user           |
| GET    | `/api/users/profile`   | Get user profile     |
| GET    | `/api/users/mycourses` | Get enrolled courses |
| GET    | `/api/users`           | Get all users        |

Course APIs

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/api/courses`            | Get all courses    |
| GET    | `/api/courses/:id`        | Get course details |
| POST   | `/api/courses`            | Add a course       |
| PUT    | `/api/courses/:id`        | Update a course    |
| DELETE | `/api/courses/:id`        | Delete a course    |
| POST   | `/api/courses/:id/enroll` | Enroll in a course |
