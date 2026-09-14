import { Routes, Route } from "react-router-dom";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";
import ManageUsers from "./pages/ManageUsers";

import ProtectedRoute from "./components/ProtectedRoute";
import PaymentPage from "./pages/PaymentPage";
import LearningModules from "./pages/LearningModules";
import PracticeQuestions from "./pages/PracticeQuestions";
import ModuleDetails from "./pages/ModuleDetails";
import LessonPage from "./pages/LessonPage";
import CertificatePage from "./pages/CertificatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-course"
        element={
          <ProtectedRoute adminOnly={true}>
            <AddCourse />
          </ProtectedRoute>
        }

      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-course/:id"
        element={
          <ProtectedRoute adminOnly={true}>
            <EditCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mycourses"
        element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-users"
        element={
          <ProtectedRoute adminOnly={true}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning/:courseId"
        element={
          <ProtectedRoute>
            <LearningModules />
          </ProtectedRoute>
        }
      />
      <Route
        path="/practice/:courseId"
        element={
          <ProtectedRoute>
            <PracticeQuestions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning/:courseId/module/:moduleId"
        element={
          <ProtectedRoute>
            <ModuleDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning/:courseId/module/:moduleId/lesson/:lessonId"
        element={
          <ProtectedRoute>
            <LessonPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/certificate/:courseId"
        element={
          <ProtectedRoute>
            <CertificatePage />
          </ProtectedRoute>
        }
      />
    </Routes>




  );
}

export default App;