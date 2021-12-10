import express from 'express';
const router = express.Router();
import { loadPattern, deletePatternIfEmpty, saveNewPattern, updatePattern } from '../controllers/pattern.js';
import { generateRandomWord } from '../controllers/words.js'

// ON GET REQUEST, LOAD PATTERN
router.get('/:bank/:slot', 
  loadPattern,
  (req, res) => {
    res.json({
      name: res.locals.name,
      pattern: res.locals.pattern
    })
  }
);

// ON POST REQUEST, SAVE PATTERN
router.post('/:bank/:slot', 
  deletePatternIfEmpty,
  loadPattern,
  generateRandomWord,
  saveNewPattern,
  updatePattern,
  (req, res) => {
    res.json({
      name: res.locals.name,
      pattern: res.locals.pattern
    })
  }
);

export default router;