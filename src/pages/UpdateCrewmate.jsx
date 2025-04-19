import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./UpdateCrewmate.css";

function UpdateCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState({
    category: "",
    role: "",
    specialty: "",
    color: "#4f46e5",
    power: "medium",
    personality: "",
  });

  const categoryOptions = ["Space Crew", "Pirate Crew"];

  const categoryAttributeOptions = {
    "Space Crew": {
      role: [
        "Captain",
        "Engineer",
        "Medic",
        "Navigator",
        "Security",
        "Science Officer",
      ],
      specialty: [
        "Combat",
        "Technology",
        "Medicine",
        "Leadership",
        "Strategy",
        "Stealth",
      ],
      power: ["low", "medium", "high"],
      personality: [
        "Brave",
        "Cautious",
        "Curious",
        "Friendly",
        "Loyal",
        "Resourceful",
      ],
    },
    "Pirate Crew": {
      role: [
        "Captain",
        "First Mate",
        "Quartermaster",
        "Boatswain",
        "Gunner",
        "Navigator",
      ],
      specialty: [
        "Swordfighting",
        "Sailing",
        "Negotiation",
        "Plundering",
        "Navigation",
        "Intimidation",
      ],
      power: ["low", "medium", "high"],
      personality: [
        "Bold",
        "Greedy",
        "Cunning",
        "Ruthless",
        "Superstitious",
        "Charismatic",
      ],
    },
  };

  const getAttributeOptions = (attributeName) => {
    if (!attributes.category) {
      return attributeOptions[attributeName] || [];
    }

    return (
      categoryAttributeOptions[attributes.category][attributeName] ||
      attributeOptions[attributeName] ||
      []
    );
  };

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const attributeOptions = {
    role: [
      "Captain",
      "Engineer",
      "Medic",
      "Navigator",
      "Security",
      "Science Officer",
    ],
    specialty: [
      "Combat",
      "Technology",
      "Medicine",
      "Leadership",
      "Strategy",
      "Stealth",
    ],
    power: ["low", "medium", "high"],
    personality: [
      "Brave",
      "Cautious",
      "Curious",
      "Friendly",
      "Loyal",
      "Resourceful",
    ],
  };

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data, error } = await supabase
          .from("crewmates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setName(data.name);
          setAttributes(data.attributes);
        }
      } catch (error) {
        console.error("Error fetching crewmate:", error.message);
        setError("Failed to load crewmate. The crewmate may not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [id]);

  const handleAttributeChange = (attribute, value) => {
    setAttributes({ ...attributes, [attribute]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!name.trim()) {
      setError("Please provide a name for your crewmate");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("crewmates")
        .update({
          name,
          attributes,
        })
        .eq("id", id);

      if (error) throw error;

      navigate(`/crewmate/${id}`);
    } catch (error) {
      console.error("Error updating crewmate:", error.message);
      setError("Failed to update crewmate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this crewmate? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsSubmitting(true);

      const { error } = await supabase.from("crewmates").delete().eq("id", id);

      if (error) throw error;

      navigate("/gallery");
    } catch (error) {
      console.error("Error deleting crewmate:", error.message);
      setError("Failed to delete crewmate. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="update-crewmate">
        <div className="loading">Loading crewmate data...</div>
      </div>
    );
  }

  if (error && !name) {
    return (
      <div className="update-crewmate">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate("/gallery")} className="back-button">
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="update-crewmate">
      <h1>Update Crewmate</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Crewmate Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter crewmate name"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="attribute-options">
            {categoryOptions.map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.category === option ? "selected" : ""
                }`}
                onClick={() => {
                  setAttributes({
                    ...attributes,
                    category: option,
                    role: "",
                    specialty: "",
                    power: "medium",
                    personality: "",
                  });
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="form-group">
          <label>Role</label>
          <div className="attribute-options">
            {attributeOptions.role.map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.role === option ? "selected" : ""
                }`}
                onClick={() => handleAttributeChange("role", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div> */}

        <div className="form-group">
          <label>Role</label>
          <div className="attribute-options">
            {getAttributeOptions("role").map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.role === option ? "selected" : ""
                }`}
                onClick={() => handleAttributeChange("role", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="form-group">
          <label>Specialty</label>
          <div className="attribute-options">
            {attributeOptions.specialty.map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.specialty === option ? "selected" : ""
                }`}
                onClick={() => handleAttributeChange("specialty", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div> */}

        <div className="form-group">
          <label>Specialty</label>
          <div className="attribute-options">
            {getAttributeOptions("specialty").map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.specialty === option ? "selected" : ""
                }`}
                onClick={() => handleAttributeChange("specialty", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <div className="color-picker">
            <input
              type="color"
              id="color"
              value={attributes.color}
              onChange={(e) => handleAttributeChange("color", e.target.value)}
            />
            <span className="color-value">{attributes.color}</span>
          </div>
        </div>

        {/* <div className="form-group">
          <label>Power Level</label>
          <div className="attribute-options">
            {attributeOptions.power.map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.power === option ? "selected" : ""
                }`}
                onClick={() => handleAttributeChange("power", option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            ))}
          </div>
        </div> */}

        <div className="form-group">
          <label>Power Level</label>
          <div className="attribute-options">
            {getAttributeOptions("power").map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.power === option ? "selected" : ""
                }`}
                onClick={() => handleAttributeChange("power", option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="form-group">
          <label>Personality</label>
          <div className="attribute-options">
            {attributeOptions.personality.map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.personality === option ? "selected" : ""
                }`}
                onClick={() => handleAttributeChange("personality", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div> */}

        <div className="form-group">
          <label>Personality</label>
          <div className="attribute-options">
            {getAttributeOptions("personality").map((option) => (
              <div
                key={option}
                className={`attribute-option ${
                  attributes.personality === option ? "selected" : ""
                }`}
                onClick={() => handleAttributeChange("personality", option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="crewmate-preview">
          <h3>Crewmate Preview</h3>
          <div className="preview-card">
            <div
              className="preview-avatar"
              style={{ backgroundColor: attributes.color }}
            >
              <span>{name ? name.charAt(0) : "?"}</span>
            </div>
            <div className="preview-info">
              <h4>{name || "Unnamed Crewmate"}</h4>
              <div className="preview-attributes">
                {Object.entries(attributes).map(([key, value]) =>
                  value && key !== "color" ? (
                    <span key={key} className="attribute-tag">
                      {key}: {value}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="update-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Crewmate"}
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            Delete Crewmate
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/crewmate/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCrewmate;
