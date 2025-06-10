const express = require('express');
const router = express.Router();
const { createConversation, getConversation } = require('../controllers/conversationController');
const { getMessages } = require('../controllers/messageController');


router.post('/conversations', createConversation);

router.get('/conversations/:userId/:mentorId', getConversation);

router.get('/messages/:conversationId', getMessages);

module.exports = router;