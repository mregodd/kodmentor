const express = require('express');
const router = express.Router();
const {
  getMentors,
  createMentor,
  deleteMentor,
} = require('../controllers/mentorController');


router.get('/', getMentors);
router.post('/', createMentor);
router.delete('/:id', deleteMentor);

module.exports = router;
