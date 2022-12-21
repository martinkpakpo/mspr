import express from 'express';

import { gettiers, gettier } from '../services/crm/tiers.js';


const router = express.Router();

router.get('/liste-tiers', gettiers);
router.get('/tiers/:id', gettier);
export default router;