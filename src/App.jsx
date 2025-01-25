import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
// import Dashboard from "./Components/Dashboard";
import HomePage from "./Components/HomePage";
import Courses from "./Components/Courses";
import User from "./Components/User";
import Admin from "./Components/Admin";
import Navbar from "./Components/Navbar";
import AdminCourses from "./Components/AdminCourses";
import CreateCourse from "./Components/CreateCourse";
import Purchases from "./Components/Purchases";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/user-dashboard" element={<User />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route path="/admin-creations" element={<AdminCourses />} />
        <Route path="/Create-Course" element={<CreateCourse />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </Router>
  );
}

export default App;
