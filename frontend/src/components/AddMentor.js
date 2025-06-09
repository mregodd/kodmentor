// frontend/src/components/AddMentor.js
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { mentorSchema } from '../validation/mentorSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const AddMentor = ({ onMentorAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(mentorSchema),
    defaultValues: { name: '', expertise: '', linkedin: '' }
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/mentors', data);
      onMentorAdded(res.data);
      reset();
    } catch {
      alert('Failed to add mentor.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Add New Mentor</h2>

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
        <label>LinkedIn URL (optional):</label>
        <input {...register('linkedin')} />
        {errors.linkedin && <p>{errors.linkedin.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="button button-primary"
      >
        {isSubmitting ? 'Adding…' : 'Add Mentor'}
      </button>
    </form>
  );
};

export default AddMentor;
