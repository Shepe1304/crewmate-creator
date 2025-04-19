import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import CrewmateCard from "../components/CrewmateCard";
import "./CrewmateGallery.css";

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmates = async () => {
      try {
        const { data, error } = await supabase
          .from("crewmates")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCrewmates(data || []);
      } catch (error) {
        console.error("Error fetching crewmates:", error.message);
        setError("Failed to load crewmates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmates();
  }, []);

  const calculateStats = () => {
    if (crewmates.length === 0) return null;

    const stats = {
      categories: {},
      roles: {},
      specialties: {},
      powerLevels: {},
      personalities: {},
    };

    crewmates.forEach((crewmate) => {
      const category = crewmate.attributes.category || "Uncategorized";
      stats.categories[category] = (stats.categories[category] || 0) + 1;

      const role = crewmate.attributes.role || "None";
      stats.roles[role] = (stats.roles[role] || 0) + 1;

      const specialty = crewmate.attributes.specialty || "None";
      stats.specialties[specialty] = (stats.specialties[specialty] || 0) + 1;

      const power = crewmate.attributes.power || "None";
      stats.powerLevels[power] = (stats.powerLevels[power] || 0) + 1;

      const personality = crewmate.attributes.personality || "None";
      stats.personalities[personality] =
        (stats.personalities[personality] || 0) + 1;
    });

    return stats;
  };

  const calculateSuccessMetric = () => {
    if (crewmates.length === 0) return { score: 0, rating: "No crew" };

    let score = 0;
    let totalPossibleScore = crewmates.length * 5;

    crewmates.forEach((crewmate) => {
      score += 1;

      if (crewmate.attributes.role) score += 1;
      if (crewmate.attributes.specialty) score += 1;
      if (crewmate.attributes.power === "high") score += 2;
      else if (crewmate.attributes.power === "medium") score += 1;

      if (crewmate.attributes.category === "Pirate Crew") {
        if (crewmate.attributes.role === "Captain") score += 2;
        if (crewmate.attributes.specialty === "Plundering") score += 1;
      }

      if (crewmate.attributes.category === "Development Team") {
        if (crewmate.attributes.role === "Developer") score += 1;
        if (crewmate.attributes.role === "Product Owner") score += 1;
      }
    });

    const percentage = Math.round((score / totalPossibleScore) * 100);

    let rating;
    if (percentage >= 90) rating = "Legendary";
    else if (percentage >= 75) rating = "Exceptional";
    else if (percentage >= 60) rating = "Promising";
    else if (percentage >= 40) rating = "Average";
    else rating = "Struggling";

    return { score, percentage, rating };
  };

  if (loading) {
    return (
      <div className="crewmate-gallery">
        <h1>Crewmate Gallery</h1>
        <div className="loading">Loading crewmates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="crewmate-gallery">
        <h1>Crewmate Gallery</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="crewmate-gallery">
      <div className="gallery-header">
        <h1>Crewmate Gallery</h1>
        <Link to="/create" className="create-button">
          + Create New Crewmate
        </Link>
      </div>

      {crewmates.length > 0 && (
        <div className="crew-stats-container">
          <div className="crew-success-meter">
            <h3>Crew Success Rating</h3>
            {(() => {
              const { percentage, rating } = calculateSuccessMetric();
              return (
                <>
                  <div className="success-bar-container">
                    <div
                      className="success-bar"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor:
                          percentage >= 90
                            ? "#4CAF50"
                            : percentage >= 75
                            ? "#8BC34A"
                            : percentage >= 60
                            ? "#FFEB3B"
                            : percentage >= 40
                            ? "#FF9800"
                            : "#F44336",
                      }}
                    ></div>
                  </div>
                  <div className="success-rating">
                    {rating} ({percentage}%)
                  </div>
                  <p className="success-description">
                    {rating === "Legendary" &&
                      "Your crew is unstoppable! Ready for any challenge!"}
                    {rating === "Exceptional" &&
                      "Your crew works extremely well together."}
                    {rating === "Promising" &&
                      "Your crew has good potential but could use some improvement."}
                    {rating === "Average" &&
                      "Your crew meets basic requirements but needs strengthening."}
                    {rating === "Struggling" &&
                      "Your crew needs significant improvements to succeed."}
                  </p>
                </>
              );
            })()}
          </div>

          <div className="crew-statistics">
            <h3>Crew Statistics</h3>
            {(() => {
              const stats = calculateStats();
              if (!stats) return <p>No data available</p>;

              const getTopAttribute = (attributeType) => {
                const entries = Object.entries(stats[attributeType]);
                if (entries.length === 0) return "None";

                entries.sort((a, b) => b[1] - a[1]);
                const [name, count] = entries[0];
                const percentage = Math.round((count / crewmates.length) * 100);

                return `${name}: ${percentage}%`;
              };

              return (
                <div className="stat-grid">
                  <div className="stat-item">
                    <span className="stat-label">Most Common Role:</span>
                    <span className="stat-value">
                      {getTopAttribute("roles")}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Most Common Specialty:</span>
                    <span className="stat-value">
                      {getTopAttribute("specialties")}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Most Common Power:</span>
                    <span className="stat-value">
                      {getTopAttribute("powerLevels")}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total Crew Size:</span>
                    <span className="stat-value">{crewmates.length}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {crewmates.length === 0 ? (
        <div className="empty-gallery">
          <div className="empty-image">👥</div>
          <h2>No Crewmates Yet</h2>
          <p>Your crew is empty! Start by creating your first crewmate.</p>
          <Link to="/create" className="cta-button">
            Create Crewmate
          </Link>
        </div>
      ) : (
        <div className="crewmate-grid">
          {crewmates.map((crewmate) => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CrewmateGallery;
