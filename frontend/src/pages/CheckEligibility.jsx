import { useEffect, useState } from 'react';
import { getAllDonors, checkEligibility } from '../services/api';
import '../styles/CheckEligibility.css';

function CheckEligibility() {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDonors, setLoadingDonors] = useState(false);

  // Load all donors on mount
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

  const handleCheck = async () => {
    if (!selectedDonor) {
      setResult({ eligible: false, reason: 'Please select a donor' });
      return;
    }
    setLoading(true);
    try {
      const res = await checkEligibility(selectedDonor);
      setResult(res.data);
    } catch (error) {
      setResult({ eligible: false, reason: error.response?.data?.error || 'Error checking eligibility' });
    }
    setLoading(false);
  };

  return (
    <div className="eligibility-container">
      <div className="eligibility-card">
        <h2>Check Donor Eligibility</h2>
        
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

        <button onClick={handleCheck} disabled={loading || !selectedDonor}>
          {loading ? 'Checking...' : 'Check Eligibility'}
        </button>

        {result && (
          <div className={`result ${result.eligible ? 'eligible' : 'ineligible'}`}>
            <p className="status">
              {result.eligible ? '✓ Eligible' : '✗ Not Eligible'}
            </p>
            <p className="reason">{result.reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckEligibility;