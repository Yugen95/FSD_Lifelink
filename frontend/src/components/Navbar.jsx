import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-life">LIFE</span>
          <span className="logo-link">LINK</span>
        </Link>

        <ul className="nav-menu">
          <li className={`nav-item ${isActive('/')}`}>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className={`nav-item ${isActive('/register-donor')}`}>
            <Link to="/register-donor" className="nav-link">Register</Link>
          </li>
          <li className={`nav-item ${isActive('/check-eligibility')}`}>
            <Link to="/check-eligibility" className="nav-link">Eligibility</Link>
          </li>
          <li className={`nav-item ${isActive('/schedule-donation')}`}>
            <Link to="/schedule-donation" className="nav-link">Schedule</Link>
          </li>
          <li className={`nav-item ${isActive('/emergency-request')}`}>
            <Link to="/emergency-request" className="nav-link">Emergency</Link>
          </li>
          <li className={`nav-item ${isActive('/inventory')}`}>
            <Link to="/inventory" className="nav-link">Inventory</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;