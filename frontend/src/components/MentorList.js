import { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingContext } from '../contexts/LoadingContext';

const MentorList = ({ mentors, onMentorDeleted }) => {
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  if (!mentors || mentors.length === 0) {
    return <p>No mentors found.</p>;
  }

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this mentor?')) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/mentors/${id}`);
      onMentorDeleted(id);
    } catch {
      toast.error('Could not delete mentor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Mentor List</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {mentors.map(m => (
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
              {m.skills && m.skills.length > 0 && (
                <div className="skills-list">
                  {m.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Link to={`/edit/${m._id}`}>
                <button className="button button-primary">Edit</button>
              </Link>
              <button onClick={() => handleDelete(m._id)} className="button button-secondary">
                Delete
              </button>
              <button
                className="button button-primary"
                onClick={() => {
                  const userId = localStorage.getItem('userId');
                  if (!userId) return navigate('/login');
                  navigate(`/chat/${m._id}`);
                }}
              >
                Chat
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;