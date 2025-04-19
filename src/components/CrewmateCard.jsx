import { Link } from 'react-router-dom';
import './CrewmateCard.css';

function CrewmateCard({ crewmate }) {
  const { id, name, attributes, created_at } = crewmate;
  
  const formattedDate = new Date(created_at).toLocaleDateString();
  
  return (
    <div className="crewmate-card">
      <div className="crewmate-avatar" style={{ backgroundColor: attributes.color || '#4f46e5' }}>
        <span>{name.charAt(0)}</span>
      </div>
      <div className="crewmate-info">
        <h3>{name}</h3>
        <div className="crewmate-attributes">
          {Object.entries(attributes).map(([key, value]) => (
            <span key={key} className="attribute-tag">
              {key}: {value}
            </span>
          ))}
        </div>
        <p className="crewmate-date">Created: {formattedDate}</p>
      </div>
      <div className="crewmate-actions">
        <Link to={`/crewmate/${id}`} className="button view-button">View</Link>
        <Link to={`/update/${id}`} className="button edit-button">Edit</Link>
      </div>
    </div>
  );
}

export default CrewmateCard;