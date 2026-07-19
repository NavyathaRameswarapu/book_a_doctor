import Layout from "../components/Layout";
import "../styles/profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">
            👤
          </div>

          <h2>{user?.name || "Guest User"}</h2>
          <p>{user?.email || "No Email"}</p>

          <div className="profile-info">
            <div><strong>Phone:</strong> {user?.phone || "Not Available"}</div>
            <div><strong>Role:</strong> User</div>
            <div><strong>Status:</strong> Active</div>
          </div>

          <button
            className="logout-profile"
            onClick={()=>{
              localStorage.clear();
              window.location.href="/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
