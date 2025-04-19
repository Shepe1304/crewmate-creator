import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h1>Build Your Ultimate Crew</h1>
          <p>Create, customize, and manage your dream team of crewmates!</p>
          <div className="hero-buttons">
            <Link to="/create" className="cta-button">
              Create Crewmate
            </Link>
            <Link to="/gallery" className="secondary-button">
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">🚀</div>
          <h2>Create</h2>
          <p>Design unique crewmates with custom attributes</p>
        </div>

        <div className="feature">
          <div className="feature-icon">👥</div>
          <h2>Collect</h2>
          <p>Build your team with diverse skills and abilities</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🔄</div>
          <h2>Customize</h2>
          <p>Update and refine your crew as needed</p>
        </div>
      </section>

      <section className="get-started">
        <h2>Ready to start building your crew?</h2>
        <Link to="/create" className="cta-button">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default Home;
