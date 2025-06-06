import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMentor from './components/AddMentor';
import MentorList from './components/MentorList';

function App() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mentors');
        setMentors(response.data);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to fetch mentors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const handleMentorAdded = (newMentor) => {
    setMentors((prev) => [...prev, newMentor]);
  };

  const handleMentorDeleted = (deletedId) => {
    setMentors((prev) => prev.filter((m) => m._id !== deletedId));
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>KodMentor Platform</h1>
      <AddMentor onMentorAdded={handleMentorAdded} />
      <MentorList mentors={mentors} onMentorDeleted={handleMentorDeleted} />
    </div>
  );
}

export default App;
