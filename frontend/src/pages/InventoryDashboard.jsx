import { useState, useEffect } from 'react';
import { getAvailableUnits } from '../services/api';
import '../styles/InventoryDashboard.css';

function InventoryDashboard() {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = {};
      for (const group of bloodGroups) {
        const res = await getAvailableUnits(group);
        data[group] = res.data.length;
      }
      setInventory(data);
    } catch (err) {
      setError('Failed to load inventory. Please try again.');
      console.error('Failed to load inventory:', err);
    }
    setLoading(false);
  };

  const totalUnits = Object.values(inventory).reduce((a, b) => a + b, 0);

  if (loading) {
    return (
      <div className="inventory-container">
        <div className="loading">
          <p>Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Blood Inventory Dashboard</h1>
        <button onClick={fetchInventory} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchInventory}>Retry</button>
        </div>
      )}

      {!error && (
        <>
          <div className="inventory-summary">
            <p>Total Units Available: <strong>{totalUnits}</strong></p>
          </div>

          <div className="inventory-grid">
            {bloodGroups.map((group) => (
              <div key={group} className="inventory-card">
                <h3>{group}</h3>
                <p className="count">{inventory[group] || 0}</p>
                <p className="label">Units Available</p>
                <div className={`status ${(inventory[group] || 0) > 0 ? 'available' : 'low'}`}>
                  {(inventory[group] || 0) > 0 ? '✓ In Stock' : '⚠ Out of Stock'}
                </div>
              </div>
            ))}
          </div>

          <div className="inventory-footer">
            <p>Last updated: {new Date().toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default InventoryDashboard;