const express = require('express');
const router = express.Router();
const {
  getMentors,
  createMentor,
  deleteMentor,
  updateMentor,
  getMentorById,
} = require('../controllers/mentorController');


router.get('/', getMentors);
router.get('/:id', getMentorById);
router.post('/', createMentor);
router.delete('/:id', deleteMentor);
router.put('/:id', updateMentor);

module.exports = router;
