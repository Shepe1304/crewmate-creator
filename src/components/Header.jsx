import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <Link to="/">Crewmates</Link>
        </h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Crewmate</Link></li>
            <li><Link to="/gallery">Crewmate Gallery</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;