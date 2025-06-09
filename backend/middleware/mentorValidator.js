const { body, validationResult } = require('express-validator');

const mentorRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters.'),
  body('expertise')
    .trim()
    .notEmpty().withMessage('Expertise is required.')
    .isLength({ min: 3 }).withMessage('Expertise must be at least 3 characters.'),
  body('linkedin')
    .optional({ checkFalsy: true })
    .isURL().withMessage('LinkedIn must be a valid URL.')
];

const validateMentor = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { mentorRules, validateMentor };
