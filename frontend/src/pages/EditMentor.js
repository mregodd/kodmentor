// frontend/src/pages/EditMentor.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { mentorSchema } from '../validation/mentorSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';

const EditMentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(mentorSchema),
    defaultValues: { name: '', expertise: '', linkedin: '' }
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/mentors/${id}`)
      .then((res) => reset(res.data))
      .catch(() => setError('api', { type: 'manual', message: 'Failed to load mentor.' }));
  }, [id, reset, setError]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/mentors/${id}`, data);
      navigate('/');
    } catch {
      setError('api', { type: 'manual', message: 'Failed to update mentor.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h1>Edit Mentor</h1>
      {errors.api && <p style={{ color: '#e74c3c' }}>{errors.api.message}</p>}

      <div className="form-field">
        <label>Name:</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="form-field">
        <label>Expertise:</label>
        <input {...register('expertise')} />
        {errors.expertise && <p>{errors.expertise.message}</p>}
      </div>

      <div className="form-field">
        <label>LinkedIn URL:</label>
        <input {...register('linkedin')} />
        {errors.linkedin && <p>{errors.linkedin.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="button button-primary"
      >
        {isSubmitting ? 'Updating…' : 'Update Mentor'}
      </button>
      <button 
        type="button" 
        onClick={() => navigate('/')} 
        disabled={isSubmitting}
        className="button button-secondary"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditMentor;
