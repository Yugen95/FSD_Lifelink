import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterDonor from './pages/RegisterDonor';
import CheckEligibility from './pages/CheckEligibility';
import ScheduleDonation from './pages/ScheduleDonation';
import EmergencyRequest from './pages/EmergencyRequest';
import InventoryDashboard from './pages/InventoryDashboard';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-donor" element={<RegisterDonor />} />
        <Route path="/check-eligibility" element={<CheckEligibility />} />
        <Route path="/schedule-donation" element={<ScheduleDonation />} />
        <Route path="/emergency-request" element={<EmergencyRequest />} />
        <Route path="/inventory" element={<InventoryDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;