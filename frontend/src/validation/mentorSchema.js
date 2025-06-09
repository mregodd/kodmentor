import * as yup from 'yup';

export const mentorSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  expertise: yup
    .string()
    .required('Expertise is required')
    .min(3, 'Expertise must be at least 3 characters'),
  linkedin: yup
    .string()
    .url('Must be a valid URL')
    .optional()
    .nullable(),
  skills: yup
    .array()
    .of(yup.string().min(1, 'Skill cannot be empty'))
    .min(1, 'At least one skill is required')  
});
