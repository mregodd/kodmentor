import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { mentorSchema } from '../validation/mentorSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { LoadingContext } from '../contexts/LoadingContext';

const EditMentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(mentorSchema),
    defaultValues: { name: '', expertise: '', linkedin: '', skills: [] }
  });

  const [skillsList, setSkillsList] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/mentors/${id}`)
      .then(res => {
        const data = res.data;
        reset(data);
        const existing = Array.isArray(data.skills) ? data.skills : [];
        setSkillsList(existing);
        setValue('skills', existing);
      })
      .catch(() => {
        setError('api', { type: 'manual', message: 'Failed to load mentor.' });
        toast.error('Failed to load mentor!');
      })
      .finally(() => setLoading(false));
  }, [id, reset, setError, setValue, setLoading]);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skillsList.includes(s)) {
      const next = [...skillsList, s];
      setSkillsList(next);
      setValue('skills', next);
    }
    setSkillInput('');
  };

  const removeSkill = idx => {
    const next = skillsList.filter((_, i) => i !== idx);
    setSkillsList(next);
    setValue('skills', next);
  };

  const onSubmit = async data => {
    setLoading(true);
    try {
      const payload = { ...data, skills: skillsList };
      await axios.put(`http://localhost:5000/mentors/${id}`, payload);
      toast.success('Updated');
      navigate('/');
    } catch {
      toast.error('Mentor failed to update!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

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

      <div className="form-field">
        <label>Skills:</label>
        <div className="skills-input">
          {skillsList.map((s, i) => (
            <span key={i} className="skill-tag">
              {s} <button type="button" onClick={() => removeSkill(i)}>×</button>
            </span>
          ))}
          <input
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' ? (e.preventDefault(), addSkill()) : null}
            placeholder="Type a skill and press Enter"
          />
        </div>
        {errors.skills && <p>{errors.skills.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="button button-primary">
        {isSubmitting ? 'Updating…' : 'Update Mentor'}
      </button>
      <button type="button" onClick={() => navigate('/')} disabled={isSubmitting} className="button button-secondary">
        Cancel
      </button>
    </form>
  );
};

export default EditMentor;