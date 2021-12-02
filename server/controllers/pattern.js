import Pattern from '../models/pattern.js';


const savePattern = (req, res, next) => {
    console.log('CONTROLLER CONTROLLER')
    res.send('NOT IMPLEMENTED: Save pattern POST')
  };

const loadPattern = (req, res) => {
    res.send('NOT IMPLEMENTED: Load pattern GET')
  }

export { savePattern, loadPattern }