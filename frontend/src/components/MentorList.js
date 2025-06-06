// frontend/src/components/MentorList.js
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // ← Link’i ekleyin

const MentorList = ({ mentors, onMentorDeleted }) => {
  if (!mentors || mentors.length === 0) {
    return <p>No mentors found.</p>;
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this mentor?')) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/mentors/${id}`);
      onMentorDeleted(id);
    } catch (err) {
      console.error('Error deleting mentor:', err);
      alert('Could not delete mentor. Please try again.');
    }
  };

  return (
    <div>
      <h2>Mentor List</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {mentors.map((m) => (
          <li
            key={m._id}
            style={{
              backgroundColor: '#f7f7f7',
              marginBottom: '0.5rem',
              padding: '0.8rem',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <strong>{m.name}</strong> – {m.expertise}
              {m.linkedin && (
                <span>
                  {' '}| <a href={m.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </span>
              )}
            </div>
            <div>
              {/* Edit butonu: /edit/:id rotasına link veriyoruz */}
              <Link to={`/edit/${m._id}`} style={{ marginRight: '0.5rem', textDecoration: 'none' }}>
                <button
                  style={{
                    backgroundColor: '#2980b9',
                    color: '#fff',
                    border: 'none',
                    padding: '0.3rem 0.6rem',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(m._id)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
