import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AddMentor from '../components/AddMentor';
import MentorList from '../components/MentorList';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { LoadingContext } from '../contexts/LoadingContext';

const Home = () => {
  const [mentors, setMentors] = useState([]);;
  const { loading, setLoading } = useContext(LoadingContext);

  const fetchMentors = React.useCallback((page = 1, searchTerm = '') => {
    setLoading(true);
    axios.get('http://localhost:5000/mentors', {
      params: { page, limit: 10, search: searchTerm }
    })
    .then(res => {
      setMentors(res.data);
    })
    .catch(() => toast.error('Failed to fetch mentors'))
    .finally(() => setLoading(false));
  }, [setLoading]);

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const handleMentorAdded = (newMentor) => {
    setMentors(prev => [...prev, newMentor]);
    toast.success('Mentor added successfully');
  };

  const handleMentorDeleted = (deletedId) => {
    setMentors(prev => prev.filter(m => m._id !== deletedId));
    toast.info('Mentor deleted');
  };

  if (loading) return <Spinner />;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>KodMentor Platform</h1>
      <AddMentor onMentorAdded={handleMentorAdded} setLoading={setLoading} />
      <MentorList mentors={mentors} onMentorDeleted={handleMentorDeleted} setLoading={setLoading} />
    </div>
  );
};

export default Home;
