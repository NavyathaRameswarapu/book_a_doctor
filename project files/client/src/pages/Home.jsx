import Navbar from "../components/Navbar";
import "../styles/home.css";

import hero from "../assets/hero.png";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero-section">

        <div className="container">

          <div className="row align-items-center">

            {/* Left Image */}

            <div className="col-lg-6 text-center">

              <img
                src={hero}
                alt="Doctors"
                className="hero-image"
              />

            </div>

            {/* Right Content */}

            <div className="col-lg-6">

              <h1 className="hero-title">
                Effortlessly Schedule
                <br />
                Your Doctor
              </h1>

              <p className="hero-text">
                Appointments with just a few clicks,
                putting your health in your hands.
                Find experienced doctors and book
                appointments anytime, anywhere.
              </p>

              <button
                className="btn hero-btn"
                onClick={() => (window.location.href = "/login")}
              >
                Book your Doctor
              </button>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default Home;