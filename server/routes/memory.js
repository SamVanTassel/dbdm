import express from 'express';
const router = express.Router();
import { loadPattern, savePattern, deletePatternIfEmpty, generateRandomWord } from '../controllers/pattern.js';

// ON GET REQUEST, LOAD PATTERN
router.get('/:bank/:slot', 
  loadPattern,
  (req, res) => res.json(res.locals)
);

// ON POST REQUEST, SAVE PATTERN
router.post('/:bank/:slot', 
  deletePatternIfEmpty,
  generateRandomWord,
  savePattern,
  (req, res) => res.json(res.locals)
);

export default router;