import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorCard from "../components/DoctorCard";
import "../styles/dashboard.css";

function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= Doctors =================

  const getDoctors = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/doctor/all-doctors"
      );

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Appointments =================

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/appointment/user/${user._id}`
      );

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Notifications =================

  const getNotifications = () => {
    if (user && user.notification) {
      setNotifications(user.notification);
    }
  };

  useEffect(() => {
    if (user) {
      getDoctors();
      getAppointments();
      getNotifications();
    }
  }, []);

  return (
    <Layout>
      <div className="dashboard-page">

        <div className="dashboard-header">

          <h2>
            Welcome, {user?.name} 👋
          </h2>

          <p>
            Book appointments with experienced doctors.
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>{doctors.length}</h3>
            <span>Total Doctors</span>
          </div>

          <div className="stat-card">
            <h3>{appointments.length}</h3>
            <span>Appointments</span>
          </div>

          <div className="stat-card">
            <h3>{notifications.length}</h3>
            <span>Notifications</span>
          </div>

        </div>

        <h3 className="section-title">
          Available Doctors
        </h3>

        <div className="doctor-grid">

          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
            />
          ))}

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;