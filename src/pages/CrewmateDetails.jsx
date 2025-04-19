import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./CrewmateDetails.css";

function CrewmateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data, error } = await supabase
          .from("crewmates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setCrewmate(data);
      } catch (error) {
        console.error("Error fetching crewmate:", error.message);
        setError(
          "Failed to load crewmate details. The crewmate may not exist."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (loading) {
    return (
      <div className="crewmate-details">
        <div className="loading">Loading crewmate details...</div>
      </div>
    );
  }

  if (error || !crewmate) {
    return (
      <div className="crewmate-details">
        <div className="error-message">{error || "Crewmate not found"}</div>
        <Link to="/gallery" className="back-link">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const createdDate = new Date(crewmate.created_at).toLocaleDateString();
  const createdTime = new Date(crewmate.created_at).toLocaleTimeString();

  return (
    <div className="crewmate-details">
      <div className="details-header">
        <Link to="/gallery" className="back-link">
          ← Back to Gallery
        </Link>
        <h1>Crewmate Details</h1>
      </div>

      <div className="details-card">
        <div
          className="details-top"
          style={{ backgroundColor: crewmate.attributes.color }}
        >
          <div className="details-avatar">
            <span>{crewmate.name.charAt(0)}</span>
          </div>
        </div>

        <div className="details-content">
          <h2>{crewmate.name}</h2>

          <div className="details-section">
            <h3>Basic Information</h3>
            <div className="detail-item">
              <span className="detail-label">Role:</span>
              <span className="detail-value">
                {crewmate.attributes.role || "Not specified"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Specialty:</span>
              <span className="detail-value">
                {crewmate.attributes.specialty || "Not specified"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Power Level:</span>
              <span className="detail-value">
                {crewmate.attributes.power
                  ? crewmate.attributes.power.charAt(0).toUpperCase() +
                    crewmate.attributes.power.slice(1)
                  : "Not specified"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Personality:</span>
              <span className="detail-value">
                {crewmate.attributes.personality || "Not specified"}
              </span>
            </div>
          </div>

          <div className="details-section">
            <h3>Statistics</h3>
            <div className="detail-item">
              <span className="detail-label">Created on:</span>
              <span className="detail-value">
                {createdDate} at {createdTime}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">ID:</span>
              <span className="detail-value">{crewmate.id}</span>
            </div>
          </div>

          <div className="details-section">
            <h3>Compatibility</h3>
            <p className="compatibility-text">
              {crewmate.attributes.role === "Captain"
                ? "As a Captain, this crewmate is best paired with Engineers and Navigators."
                : crewmate.attributes.role === "Engineer"
                ? "Engineers work well with Science Officers for innovation and Captains for direction."
                : crewmate.attributes.role === "Medic"
                ? "Medics are essential support for Security personnel and work well with Science Officers."
                : crewmate.attributes.role === "Navigator"
                ? "Navigators pair well with Captains for strategic planning and Engineers for technical execution."
                : crewmate.attributes.role === "Security"
                ? "Security personnel work best with Medics for backup and Captains for direction."
                : crewmate.attributes.role === "Science Officer"
                ? "Science Officers collaborate effectively with Engineers and Medics for research and development."
                : "This crewmate can be paired with any other roles for balanced team composition."}
            </p>
          </div>
        </div>

        <div className="details-actions">
          <Link to={`/update/${crewmate.id}`} className="edit-button">
            Edit Crewmate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CrewmateDetails;
