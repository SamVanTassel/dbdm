import express from 'express';
const router = express.Router();
import * as pc from '../controllers/pattern.js';

router.get('/memor/:bank/:slot', pc.loadPattern);
router.post('/memory/:bank/:slot', pc.savePattern);

export default router;