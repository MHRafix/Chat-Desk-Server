import express from 'express';
import {
	allChat,
	createChat,
} from '../../controllers/chat/single_chat/singleChat';
import { isAuthentic } from '../../middleware/authentication';

const router = express.Router();

// single chat routes
router.route('/create_chat/:uid').post(isAuthentic, createChat);
router.route('/fetch_chat/:uid').get(isAuthentic, allChat);

export default router;
