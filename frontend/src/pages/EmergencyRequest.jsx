import { useState } from 'react';
import { createEmergencyRequest } from '../services/api';
import '../styles/EmergencyRequest.css';

function EmergencyRequest() {
  const [formData, setFormData] = useState({
    hospitalName: '',
    bloodGroup: '',
    quantity: 1,
    urgency: 'high',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [allocatedUnit, setAllocatedUnit] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Hospital name is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMessage('');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const res = await createEmergencyRequest(formData);
      setMessage(`✓ Request fulfilled! Unit allocated instantly.`);
      setAllocatedUnit(res.data.allocatedUnit);
      setFormData({ hospitalName: '', bloodGroup: '', quantity: 1, urgency: 'high' });
      setErrors({});
    } catch (error) {
      setMessage(`✗ ${error.response?.data?.error || 'Request failed. Please try again.'}`);
      setAllocatedUnit(null);
    }
    setLoading(false);
  };

  return (
    <div className="emergency-container">
      <div className="emergency-card">
        <h2>🚨 Emergency Blood Request</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="hospitalName"
              placeholder="Hospital Name"
              value={formData.hospitalName}
              onChange={handleChange}
              className={errors.hospitalName ? 'error' : ''}
            />
            {errors.hospitalName && <span className="error-text">{errors.hospitalName}</span>}
          </div>
          
          <div className="form-field">
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className={errors.bloodGroup ? 'error' : ''}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && <span className="error-text">{errors.bloodGroup}</span>}
          </div>

          <div className="form-field">
            <input
              type="number"
              name="quantity"
              placeholder="Units Needed"
              min="1"
              max="10"
              value={formData.quantity}
              onChange={handleChange}
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>

          <div className="form-field">
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Request Blood Now'}
          </button>
        </form>

        {message && (
          <p className={message.includes('✓') ? 'success' : 'error'}>
            {message}
          </p>
        )}

        {allocatedUnit && (
          <div className="allocated-unit">
            <h4>✓ Unit Allocated</h4>
            <div className="unit-details">
              <p><strong>Unit ID:</strong> {allocatedUnit.unitId}</p>
              <p><strong>Blood Group:</strong> {allocatedUnit.bloodGroup}</p>
              <p><strong>Collection Date:</strong> {new Date(allocatedUnit.collectionDate).toLocaleDateString()}</p>
              <p><strong>Expiry Date:</strong> {new Date(allocatedUnit.expiryDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span className="status-badge">Ready for Delivery</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmergencyRequest;