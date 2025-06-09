const express = require('express');
const router = express.Router();

const {
  getMentors,
  createMentor,
  deleteMentor,
  updateMentor,
  getMentorById,
} = require('../controllers/mentorController');

const { mentorRules, validateMentor } = require('../middleware/mentorValidator');

router.get(
  '/',
  '/:id',
  getMentors,
  getMentorById
);

router.post(
  '/',
  mentorRules,
  validateMentor,
  createMentor
);

router.delete('/:id', deleteMentor);

router.put(
  '/:id',
  mentorRules,
  validateMentor,
  updateMentor
);

module.exports = router;
