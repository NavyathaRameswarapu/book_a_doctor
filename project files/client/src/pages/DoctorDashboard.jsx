import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/doctorDashboard.css";

function DoctorDashboard() {

  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadAppointments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/doctor/appointments/${user._id}`
      );

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const approveAppointment = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/doctor/approve/${id}`
      );

      alert(data.message);
      loadAppointments();

    } catch (err) {
      console.log(err);
    }
  };

  const rejectAppointment = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/doctor/reject/${id}`
      );

      alert(data.message);
      loadAppointments();

    } catch (err) {
      console.log(err);
    }
  };

  const pending = appointments.filter(a => a.status === "pending").length;
  const approved = appointments.filter(a => a.status === "approved").length;
  const rejected = appointments.filter(a => a.status === "rejected").length;

  return (
    <Layout>

      <div className="doctor-dashboard">

        <div className="doctor-header">

          <div>

            <h2>Welcome Dr. {user?.name} 👋</h2>

            <p>Manage your appointments efficiently.</p>

          </div>

        </div>

        <div className="doctor-cards">

          <div className="doctor-card-box">
            <h3>{pending}</h3>
            <span>Pending</span>
          </div>

          <div className="doctor-card-box">
            <h3>{approved}</h3>
            <span>Approved</span>
          </div>

          <div className="doctor-card-box">
            <h3>{rejected}</h3>
            <span>Rejected</span>
          </div>

          <div className="doctor-card-box">
            <h3>{appointments.length}</h3>
            <span>Total</span>
          </div>

        </div>

        <div className="table-card">

          <h3>Appointment Requests</h3>

          <table>

            <thead>

              <tr>
                <th>Patient</th>
                <th>Date & Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {appointments.map((item)=>(

                <tr key={item._id}>

                  <td>{item.patientName}</td>

                  <td>
                    {new Date(item.appointmentDate).toLocaleString()}
                  </td>

                  <td>{item.reason}</td>

                  <td>

                    <span className={`status-${item.status}`}>
                      {item.status}
                    </span>

                  </td>

                  <td>

                    {item.status==="pending" ? (

                      <>

                        <button
                          className="approve-btn"
                          onClick={()=>approveAppointment(item._id)}
                        >
                          Approve
                        </button>

                        <button
                          className="reject-btn"
                          onClick={()=>rejectAppointment(item._id)}
                        >
                          Reject
                        </button>

                      </>

                    ) : (

                      <span>Completed</span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
}

export default DoctorDashboard;