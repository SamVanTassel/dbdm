import Pattern from '../models/pattern.js';
import wordList from '../static/words.js';

const savePattern = (req, res, next) => {
  /*
  UPDATE PATTERN LOGIC:
  1) If sent pattern is same as pattern found at slot, don't update
  2) If sent pattern is ALL FALSE, update pattern and remove name (or delete record)
  3) If sent pattern is different than pattern found at slot, update pattern and name

  misbehaving filter: { slot: req.params.slot, pattern: { $ne : req.body.pattern } }
*/
  const filter = { slot: req.params.slot }// \
  const update = { pattern: req.body.pattern, name: wordList[Math.random() * 998] }

  Pattern.findOneAndUpdate(filter, update, { new: true, upsert: true})
    .then(saved => {
      console.log(saved);
      console.log('entered: ' + req.body.pattern);
      console.log('stored: ' + saved.pattern);
      res.send(saved);
    })
    .catch(err => console.log(err));
  };

const loadPattern = (req, res) => {
  const loadSlot = {slot: req.params.slot} 
  Pattern.findOne(loadSlot)
    .then(found => {
      console.log(found);
      res.json({ 
        pattern: found ? found.pattern : new String('.').repeat(16),
        name: found ? found.name : 'xxxx',
      })
    })
    .catch(err => console.log(err));
};

export { savePattern, loadPattern }