import express from 'express';
const router = express.Router();
import { loadPattern, savePattern } from '../controllers/pattern.js';

// ON GET REQUEST, LOAD PATTERN
router.get('/:bank/:slot', loadPattern);

// ON POST REQUEST, SAVE PATTERN
router.post('/:bank/:slot', savePattern);

export default router;