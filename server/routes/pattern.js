import express from 'express';
const router = express.Router();
import { loadPattern, savePattern } from '../controllers/pattern.js';

router.get('/memory/:bank/:slot', loadPattern);
router.post('/memory/:bank/:slot', savePattern);

export default router;