import express from 'express';
import { allUsers } from '../../controllers/authentication/allUsers';
import {
	userSignin,
	userSignUp,
} from '../../controllers/authentication/userAuth';

const router = express.Router();

// all authentication router here
router.route('/all_users').get(allUsers);
router.route('/signup').post(userSignUp);
router.post('/signin', userSignin);

export default router;
