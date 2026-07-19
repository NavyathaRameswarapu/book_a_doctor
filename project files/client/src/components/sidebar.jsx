import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= USER MENU =================

  const userMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "🩺",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "📅",
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: "🔔",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  // ================= DOCTOR MENU =================

  const doctorMenu = [
    {
      name: "Dashboard",
      path: "/doctor",
      icon: "🏠",
    },
    {
      name: "Appointments",
      path: "/doctor",
      icon: "📅",
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: "🔔",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  // ================= ADMIN MENU =================

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "🏠",
    },
    {
      name: "Doctor Requests",
      path: "/admin",
      icon: "👨‍⚕️",
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: "🔔",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  let menu = userMenu;

  if (user?.isAdmin) {
    menu = adminMenu;
  } else if (user?.isDoctor) {
    menu = doctorMenu;
  }

  return (
    <div className="sidebar">

      <div className="sidebar-header">

        <h2>MENU</h2>

      </div>

      <div className="sidebar-links">

        {menu.map((item) => (

          <Link
            key={item.path + item.name}
            to={item.path}
            className={
              location.pathname === item.path
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <span>{item.icon}</span>

            {item.name}

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;