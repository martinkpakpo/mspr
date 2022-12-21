import express from 'express';

import { getUserByEmail,getUserById,getUsers,getCreateUser,ConnectUser,DisConnectUser, checkUser } from '../services/security/user.js';


const router = express.Router();

router.get('/get-user-email/:query', getUserByEmail);
router.get('/get-user-id/:id', getUserById);
router.get('/get-users', getUsers);
router.post('/post-user', getCreateUser);
router.get('/connect-user-email/:email/:code', ConnectUser);
router.get('/disconnect-user', DisConnectUser);
router.get('/check-user', checkUser);
export default router;