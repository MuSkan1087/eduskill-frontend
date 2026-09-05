# 🚀 EntreSkill Hub

### Learn • Build • Grow

A full-stack learning platform that helps students discover courses, enroll in courses, and manage their learning journey.

EntreSkill Hub provides authentication, role-based access, course management, course enrollment, learning progress tracking, and user profile functionality through a modern React + Node.js + MongoDB architecture.

---

## 🌐 Live Demo

### Frontend

https://eduskill-frontend.vercel.app

### Backend API

https://eduskill-backend.onrender.com

### GitHub Repositories

**Frontend:**  
https://github.com/MuSkan1087/eduskill-frontend

**Backend:**  
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
- Secure password hashing

### 📚 Course Management

- View all available courses
- Search courses
- View course details
- Add new courses
- Edit existing courses
- Delete courses
- Course image support
- Course category
- Course duration
- Course level
- Course price

### 🎓 Student Features

- Enroll in courses
- View enrolled courses
- My Courses section
- Learning progress tracking
- Course completion status
- User profile
- Responsive learning interface

### 👨‍💼 Admin Features

- Add new courses
- Edit courses
- Delete courses
- Manage course information
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
- React Icons
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
                    │    User / Admin      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   Vite + Tailwind    │
                    └──────────┬───────────┘
                               │
                               │ Axios / REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │      Backend API      │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │    MongoDB Atlas     │
                    │      Database        │
                    └──────────────────────┘
```

---

## 🔐 Authentication Flow

```text
User
  │
  ▼
Register / Login
  │
  ▼
Express API
  │
  ▼
User Authentication
  │
  ▼
JWT Token Generated
  │
  ▼
Token Stored in Local Storage
  │
  ▼
Axios Request Interceptor
  │
  ▼
Protected API Requests
  │
  ▼
Authorized Backend Routes
```

Passwords are securely hashed using `bcryptjs`.

JWT tokens are used to authenticate protected API requests.

---

## 👥 User Roles

EntreSkill Hub supports role-based access control.

| Role | Access |
|------|--------|
| Student | Browse, enroll and track courses |
| Admin | Add, edit and delete courses |
| Mentor | Supported user role |

---

## 📊 Learning Progress

Students can track their learning progress for enrolled courses.

The platform supports:

- Course progress percentage
- 25% progress
- 50% progress
- 75% progress
- 100% course completion
- Continue Learning status
- Course Completed status
- Overall learning progress

---

## 📡 API Endpoints

### 🔐 User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get user profile |
| GET | `/api/users/mycourses` | Get enrolled courses |
| GET | `/api/users/progress` | Get learning progress |
| PUT | `/api/users/progress/:courseId` | Update course progress |

---

### 📚 Course APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/:id` | Get course details |
| POST | `/api/courses` | Add a course |
| PUT | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |
| POST | `/api/courses/:id/enroll` | Enroll in a course |

---

## 📂 Project Structure

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
```

### Backend

```text
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
└── .env.example
```

> `.env` is intentionally not included in the repository for security reasons.

---

## ⚙️ Installation & Setup

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/MuSkan1087/eduskill-frontend.git
```

```bash
cd eduskill-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

### 2. Clone the Backend Repository

Open another terminal:

```bash
git clone https://github.com/MuSkan1087/eduskill-backend.git
```

```bash
cd eduskill-backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend project.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Environment Variable Description

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used for JWT authentication |
| `PORT` | Backend server port |

> Never commit the `.env` file to GitHub.

---

## 🌍 Frontend API Configuration

The frontend communicates with the deployed backend through Axios.

```text
Frontend
   │
   ▼
Axios
   │
   ▼
REST API
   │
   ▼
Render Backend
   │
   ▼
MongoDB Atlas
```

The API service also automatically attaches the JWT token to protected requests.

---

## 🔒 Security

The application implements:

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Role-Based Authorization
- Environment Variables
- CORS Configuration
- Bearer Token Authentication
- Secure API Requests

Sensitive credentials such as MongoDB connection strings and JWT secrets are stored in environment variables and are not committed to GitHub.

---

## 📱 Responsive Design

EntreSkill Hub is designed to provide a responsive experience across different screen sizes.

Supported layouts include:

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

The navigation automatically changes to a mobile-friendly hamburger menu on smaller screens.

---

## 🧪 Testing

The application has been tested for:

- User Registration
- User Login
- Logout
- JWT Authentication
- Protected Routes
- Student Access
- Admin Access
- Course Listing
- Course Search
- Course Details
- Course Enrollment
- My Courses
- Learning Progress
- Course Completion
- Profile
- Add Course
- Edit Course
- Delete Course
- Mobile Responsive Layout
- Production Deployment

---

## 🚀 Deployment

### Frontend

The React frontend is deployed using Vercel.

```text
React + Vite
      ↓
GitHub
      ↓
Vercel
      ↓
Live Frontend
```

### Backend

The Node.js + Express backend is deployed using Render.

```text
Node.js + Express
       ↓
GitHub
       ↓
Render
       ↓
Live REST API
```

### Database

MongoDB Atlas is used as the cloud database.

```text
Express Backend
      ↓
Mongoose
      ↓
MongoDB Atlas
```

---

## 🎯 Future Improvements

Planned improvements include:

- Course Lessons
- Video Learning
- Certificates
- Quiz System
- Course Reviews & Ratings
- Mentor Dashboard
- Notifications
- Payment Integration
- Advanced Progress Tracking
- Admin Dashboard
- Forgot Password
- Email Verification

---

## 💡 Project Objective

The main objective of EntreSkill Hub is to provide a simple and user-friendly learning platform where students can discover useful courses, develop technical skills, enroll in learning programs, and track their learning progress.

The project demonstrates practical implementation of frontend development, backend development, REST APIs, database integration, authentication, authorization, responsive UI, and cloud deployment.

---

## 👩‍💻 Author

### Muskan Pathak

MCA Student | Frontend Developer | Full Stack Developer

---

## ⭐ Acknowledgement

This project was developed as a full-stack web development project to demonstrate practical implementation of:

- Frontend Development
- Backend Development
- REST APIs
- Database Integration
- JWT Authentication
- Role-Based Authorization
- Course Management
- Learning Progress Tracking
- Responsive UI
- Cloud Deployment

---

⭐ If you find this project useful, consider giving it a star!