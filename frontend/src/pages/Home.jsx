import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1><span className="life">LIFE</span><span className="link">LINK</span></h1>
        <p>Real-Time Blood Bank Management Platform</p>
      </div>

      <div className="menu-grid">
        <Link to="/register-donor" className="menu-card">
          <h3>Register as Donor</h3>
          <p>Sign up and become a blood donor</p>
        </Link>

        <Link to="/check-eligibility" className="menu-card">
            <h3>Check Eligibility</h3>
            <p>Verify if you can donate</p>
        </Link>

        <Link to="/schedule-donation" className="menu-card">
            <h3>Schedule Donation</h3>
            <p>Book a donation appointment</p>
        </Link>

        <Link to="/emergency-request" className="menu-card">
            <h3>Emergency Request</h3>
            <p>Request blood for hospital</p>
        </Link>

        <Link to="/inventory" className="menu-card">
            <h3>View Inventory</h3>
            <p>Check available blood units</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;