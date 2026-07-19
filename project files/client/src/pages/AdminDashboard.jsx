import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/adminDashboard.css";

function AdminDashboard() {

  const [doctors, setDoctors] = useState([]);
const user = JSON.parse(localStorage.getItem("user"));
  const getDoctors = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:8000/api/admin/doctors"
      );

      if (data.success) {

        setDoctors(data.doctors);

      }

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    getDoctors();

  }, []);

  const approveDoctor = async (id) => {

    try {

      const { data } = await axios.put(
        `http://localhost:8000/api/admin/approve-doctor/${id}`
      );

      alert(data.message);

      getDoctors();

    } catch (err) {

      console.log(err);

    }

  };

  const rejectDoctor = async (id) => {

    try {

      const { data } = await axios.put(
        `http://localhost:8000/api/admin/reject-doctor/${id}`
      );

      alert(data.message);

      getDoctors();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <Layout>
<div className="admin-page">

  <div className="admin-profile">

    <div className="admin-avatar">
      👨‍💼
    </div>

    <div>

      <h2>
        Welcome, {user?.name}
      </h2>

      <p>
        {user?.email}
      </p>

      <span className="admin-role">
        Administrator
      </span>

    </div>

  </div>

  <h2 className="table-title">
    Doctor Applications
  </h2>

        <table>

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {doctors.map((doctor)=>(

              <tr key={doctor._id}>

                <td>{doctor.fullName}</td>

                <td>{doctor.email}</td>

                <td>{doctor.specialization}</td>

               <td>
  <span className={`status-${doctor.status}`}>
    {doctor.status}
  </span>
</td>
                <td>

                  {doctor.status==="pending" && (

                    <>

                      <button
                        className="approve-btn"
                        onClick={()=>approveDoctor(doctor._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={()=>rejectDoctor(doctor._id)}
                      >
                        Reject
                      </button>

                    </>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default AdminDashboard;