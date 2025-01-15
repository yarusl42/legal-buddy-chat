import express from 'express';
import { chatService } from '../services/chatService';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { userId, advisorId } = req.body;
    const result = await chatService.createChat(userId, advisorId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error creating chat' });
  }
});

router.post('/message', async (req, res) => {
  try {
    const { chatId, content, sender } = req.body;
    const message = await chatService.sendMessage(chatId, content, sender);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

router.post('/message/rate', async (req, res) => {
  try {
    const { messageId, rating } = req.body;
    const result = await chatService.updateMessageRating(messageId, rating);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error rating message' });
  }
});

router.post('/message/regenerate', async (req, res) => {
  try {
    const { messageId } = req.body;
    const result = await chatService.regenerateMessage(messageId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error regenerating message' });
  }
});

router.get('/load/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await chatService.loadChats(userId);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Error loading chats' });
  }
});

export default router;
