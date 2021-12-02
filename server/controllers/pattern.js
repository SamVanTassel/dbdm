import Pattern from '../models/pattern.js';


const savePattern = (req, res, next) => {
    Pattern.findOneAndUpdate({slot: req.params.slot}, {pattern: req.body.pattern}, 
      { new: true, upsert: true})
      .then(saved => {
        res.sendStatus(200)
      })
      .catch(err => console.log(err));
  };

const loadPattern = (req, res) => {
  Pattern.findOne({ slot: req.params.slot })
    .then(foundPattern => {
      res.json({ 
        pattern: foundPattern ? foundPattern.pattern : new Array(16).fill(false)
      })
    })
    .catch(err => console.log(err));
};

export { savePattern, loadPattern }