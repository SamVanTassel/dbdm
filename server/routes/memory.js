import express from 'express';
const router = express.Router();
import { loadPattern, deletePatternIfEmpty, generateRandomWord, saveNewPattern, updatePattern } from '../controllers/pattern.js';

// ON GET REQUEST, LOAD PATTERN
router.get('/:bank/:slot', 
  loadPattern,
  (req, res) => {
    console.log(res.locals)
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
    console.log(res.locals)
  res.json({
    name: res.locals.name,
    pattern: res.locals.pattern
  })
}
);

export default router;