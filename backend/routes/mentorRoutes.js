const express = require('express');
const router = express.Router();
const { getMentors, createMentor } = require('../controllers/mentorController');

router.get('/', getMentors);
router.post('/', createMentor);

module.exports = router;
