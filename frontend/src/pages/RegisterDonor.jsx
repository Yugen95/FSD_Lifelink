import { useState } from 'react';
import { registerDonor } from '../services/api';
import '../styles/RegisterDonor.css';

function RegisterDonor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    dob: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerDonor(formData);
      setMessage(`✓ ${res.data.message}`);
      setFormData({ name: '', email: '', phone: '', bloodGroup: '', dob: '' });
    } catch (error) {
      setMessage(`✗ ${error.response?.data?.error || 'Registration failed'}`);
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register as Donor</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
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
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {message && <p className={message.includes('✓') ? 'success' : 'error'}>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterDonor;