import express from 'express';
import { allMessages, sendMessage } from '../../controllers/messaging/message';
import { isAuthentic } from '../../middleware/authentication';

const router = express.Router();

router.route('/:chat_id').get(isAuthentic, allMessages);
router.route('/send_message/:uid').post(isAuthentic, sendMessage);

export default router;
