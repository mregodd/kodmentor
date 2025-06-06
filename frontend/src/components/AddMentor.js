import React, { useState } from 'react';
import axios from 'axios';

const AddMentor = ({ onMentorAdded }) => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !expertise.trim()) {
      setError('Name and expertise are required.');
      return;
    }

    try {
      const payload = { name: name.trim(), expertise: expertise.trim(), linkedin: linkedin.trim() };
      const response = await axios.post('http://localhost:5000/mentors', payload);

      onMentorAdded(response.data);

      setName('');
      setExpertise('');
      setLinkedin('');
      setError(null);
    } catch (err) {
      console.error('Error adding mentor:', err);
      setError('Failed to add mentor. Try again.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
      <h2>Add New Mentor</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. John Doe"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Expertise:</label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="e.g. Backend Development"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>LinkedIn URL (optional):</label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/..."
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#2c3e50',
            color: '#fff',
            padding: '0.6rem 1.2rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Mentor
        </button>
      </form>
    </div>
  );
};

export default AddMentor;
