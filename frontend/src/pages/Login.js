import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/login', { name, email });
      localStorage.setItem('userId', res.data._id);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Enter your name & email</h2>
      <div className="form-field">
        <label>Name:</label>
        <input value={name} onChange={e=>setName(e.target.value)} required/>
      </div>
      <div className="form-field">
        <label>Email:</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      </div>
      <button type="submit" className="button button-primary">Login</button>
      <div style={{ marginTop: '1rem' }}>
        <Link to="/register" className="button button-secondary">Register</Link>
        <Link to="/" className="button button-secondary" style={{ marginLeft: '0.5rem' }}>Home</Link>
      </div>    </form>
  );
};

export default Login;
