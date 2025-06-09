import axios from 'axios';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { mentorSchema } from '../validation/mentorSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingContext } from '../contexts/LoadingContext';

const AddMentor = ({ onMentorAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: yupResolver(mentorSchema),
    defaultValues: { name: '', expertise: '', linkedin: '', skills: [] }
  });

  const [skillsList, setSkillsList] = useState([]);
  const [skillInput, setSkillInput] = useState('');

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

  const { setLoading } = useContext(LoadingContext);

  const onSubmit = async (data) => {
  setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/mentors', data);
      onMentorAdded(res.data);
      reset();
      setSkillsList([]);
      setValue('skills', []);
    } catch {
      toast.error('Failed to add mentor');
    } finally {
      setLoading(false);
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

      <div className="form-field">
        <label>Skills:</label>
        <div className="skills-input">
          {skillsList.map((s,i) => (
            <span key={i} className="skill-tag">
              {s} <button type="button" onClick={()=>removeSkill(i)}>×</button>
            </span>
          ))}
          <input
            type="text"
            value={skillInput}
            onChange={e=>setSkillInput(e.target.value)}
            onKeyDown={e=> e.key==='Enter' ? (e.preventDefault(), addSkill()) : null }
          />
        </div>
        {errors.skills && <p>{errors.skills.message}</p>}
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
