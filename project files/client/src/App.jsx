import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

import ApplyDoctor from "./pages/ApplyDoctor";
import Appointments from "./pages/Appointments";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import "./styles/home.css";
import "./styles/navbar.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply-doctor" element={<ApplyDoctor />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Doctor Route */}
        <Route path="/doctor" element={<DoctorDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;