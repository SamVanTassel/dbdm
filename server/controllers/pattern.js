import Pattern from '../models/pattern.js';
import wordList from '../static/words.js';

const usedWords = [];

const savePattern = (req, res, next) => {
  /*
    UPDATE PATTERN LOGIC:
    0) [X] If there are no documents with the sent slot, create a new one with slot, pattern and name
    1) [X] If sent pattern is '................', delete record
    2) [X] If slot exists and sent pattern is same as pattern found at slot, don't update
    3) [X] If slot exists and sent pattern is different than pattern found at slot, update pattern and name
  */

  // IF SENT PATTERN IS EMPTY, DELETE THAT SLOT FROM MEMORY
  if (req.body.pattern === '................') {
    Pattern.deleteOne({ slot: req.params.slot })
      .then(res.json({ 
        pattern: new String('.').repeat(16),
        name: 'xxxx'
      }))
      .catch(err => console.log(err))
  }
  // OTHERWISE CREATE OR UPDATE PATTERN AT SLOT
  else {
    // SAVE NOT YET USED RANDOM WORD FOR NAMING PURPOSES
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    while (usedWords.includes(randomWord)) { randomWord = wordList[Math.floor(Math.random() * wordList.length)];}
    usedWords.push(randomWord);

    // FIND DOCUMENT MATCHING SLOT
    Pattern.findOne({ slot: req.params.slot })
      .then(stored => {
        if (!stored) { // IF ONE DOESN'T EXIST, CREATE ONE W/ PASSED IN PATTERN AND RANDOM NAME
          console.log('created new pattern!');
          return Pattern.create({ slot: req.params.slot, pattern: req.body.pattern, name: randomWord })
        } else if (stored.pattern === req.body.pattern) { // IF DOC EXISTS BUT PATTERN IS SAME, DON'T UPDATE
          console.log('Same pattern, passed on request body!')
          return Promise.resolve(req.body);
        } else {                               // IF DOC EXISTS AND PATTERN IS DIFFERENT, UPDATE PATTERN AND NAME
          console.log('Updated doc with new pattern and name!')
          return Pattern.findOneAndUpdate({ slot: req.params.slot }, { pattern: req.body.pattern, name: randomWord }, { new: true })
      }})
      .then(updated => {
        res.send(updated)
      })
      .catch(err => console.log(err));
  };
};

const loadPattern = (req, res, next) => {
  const loadSlot = { slot: req.params.slot } 
  Pattern.findOne(loadSlot)
    .then(found => {
      res.json({ 
        pattern: found ? found.pattern : new String('.').repeat(16),
        name: found ? found.name : 'xxxx',
      })
    })
    .catch(err => console.log(err));
};

export { savePattern, loadPattern }