import { useState, useEffect } from 'react';
import { getAllDonors, scheduleDonation } from '../services/api';
import '../styles/ScheduleDonation.css';

function ScheduleDonation() {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingDonors, setLoadingDonors] = useState(false);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoadingDonors(true);
    try {
      const res = await getAllDonors();
      setDonors(res.data);
    } catch (error) {
      console.error('Failed to load donors:', error);
    }
    setLoadingDonors(false);
  };

  const handleSchedule = async () => {
    if (!selectedDonor || !scheduledDate) {
      setMessage('✗ Please select donor and date');
      return;
    }
    setLoading(true);
    try {
      const res = await scheduleDonation(selectedDonor, { scheduledDate });
      setMessage(`✓ Donation scheduled for ${new Date(scheduledDate).toLocaleDateString()}`);
      setSelectedDonor('');
      setScheduledDate('');
    } catch (error) {
      setMessage(`✗ ${error.response?.data?.error || 'Scheduling failed'}`);
    }
    setLoading(false);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-card">
        <h2>Schedule Donation</h2>
        
        <div className="form-group">
          <label>Select Donor:</label>
          <select
            value={selectedDonor}
            onChange={(e) => setSelectedDonor(e.target.value)}
            disabled={loadingDonors}
          >
            <option value="">Choose a donor...</option>
            {donors.map((donor) => (
              <option key={donor._id} value={donor._id}>
                {donor.name} ({donor.bloodGroup})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Donation Date:</label>
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </div>

        <button onClick={handleSchedule} disabled={loading || !selectedDonor || !scheduledDate}>
          {loading ? 'Scheduling...' : 'Schedule Donation'}
        </button>

        {message && (
          <p className={message.includes('✓') ? 'success' : 'error'}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ScheduleDonation;