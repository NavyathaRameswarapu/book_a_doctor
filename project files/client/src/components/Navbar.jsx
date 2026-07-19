import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  // Check whether user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="logo" className="logo-img" />
          <span className="logo-text">BOOK A DOCTOR</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav ms-auto align-items-center">

            {/* BEFORE LOGIN */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="btn login-btn" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="btn register-btn ms-3" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* AFTER LOGIN */}
{user && (
  <li className="nav-item ms-auto">
    <button
      className="btn register-btn"
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }}
    >
      Logout
    </button>
  </li>
)}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;