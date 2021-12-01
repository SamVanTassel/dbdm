import express from 'express';
const router = express.Router();

router.get('/home', (req,res) => {
  res.send('dbdm home page');
});

export default router;