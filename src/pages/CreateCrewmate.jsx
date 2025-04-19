import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./CreateCrewmate.css";

function CreateCrewmate() {
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
      const { data, error } = await supabase
        .from("crewmates")
        .insert({
          name,
          attributes,
        })
        .select();

      if (error) throw error;

      navigate("/gallery");
    } catch (error) {
      console.error("Error creating crewmate:", error.message);
      setError("Failed to create crewmate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-crewmate">
      <h1>Create a New Crewmate</h1>

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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Crewmate"}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => navigate("/gallery")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCrewmate;
