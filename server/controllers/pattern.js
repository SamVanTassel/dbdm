import Pattern from '../models/pattern.js';
import { Step } from '../../Classes.js'

const loadPattern = (req, res, next) => {
  if (res.locals.justDeleted) return next();
  console.log('loading pattern');
  // expects nothing in res.locals
  const loadSlotInBank = { slot: req.params.slot, bank: req.params.bank } 
  Pattern.findOne(loadSlotInBank)
    .then(found => {
      res.locals = { 
        pattern: found ? found.pattern : new Array(16).fill('.').map((el) => new Step(false)),
        name: found ? found.name : 'xxxx',
      };
      return next();
    })
    .catch(err => {
      return next(err);
    })  
  // returns { pattern, name } in res.locals 
};

const saveNewPattern = (req, res, next) => {
  console.log('checking if new pattern should be created');
  // expects {name, pattern, randomWord} in res.locals
  if (res.locals.name === 'xxxx' && !res.locals.justDeleted) { // IF NAME IS 'xxxx' AND IT WASN't JUST DELETED, CREATE NEW PATTERN W/ PASSED IN PATTERN AND RANDOM NAME
    console.log('creating new pattern');
    Pattern.create({ slot: req.params.slot, bank: req.params.bank, pattern: req.body.pattern, name: res.locals.randomWord })
      .then((data) => {
        res.locals.pattern = data.pattern;
        res.locals.name = data.name;
        res.locals.alreadySavedNew = true;
        return next();
      })
      .catch(err => {
        return next(err);
      });
  } else return next();
}

const updatePattern = (req, res, next) => {
  console.log('checking if pattern should be updated');
  // expects {name, pattern, randomWord, (OPTIONAL alreadySavedNew)} in res.locals
  if (res.locals.alreadySavedNew || res.locals.justDeleted) return next();
  else {
    if (JSON.stringify(res.locals.pattern) === JSON.stringify(req.body.pattern)) { // IF DOC EXISTS BUT PATTERN IS SAME, DON'T UPDATE
      return next();
    } else {   
      console.log('updating pattern')                       // IF DOC EXISTS AND PATTERN IS DIFFERENT, UPDATE PATTERN AND NAME
      Pattern.findOneAndUpdate({ slot: req.params.slot, bank: req.params.bank }, { pattern: req.body.pattern, name: res.locals.randomWord }, { new: true })
        .then((data) => {
          res.locals.name = data.name;
          res.locals.pattern = data.pattern;
          return next();
        })
        .catch(err => {
          return next(err);
        })
    }
  }
}

const deletePatternIfEmpty = (req, res, next) => {
  console.log('checking if pattern should be deleted');
  // expects nothing in res.locals
  if (!req.body.pattern.some((el) => el.isOn)) { // if no notes contain are on
    console.log('deleting pattern')
    Pattern.deleteOne({ slot: req.params.slot, bank: req.params.bank })
      .then(() => {
        res.locals = {
          pattern: new Array(16).fill('.').map((el) => new Step(false)),
          name: 'xxxx',
          justDeleted: true
        };
        return next();
      })
      .catch(err => {
        console.log(err)
        return next(err);
      })    
  } else return next();
}

export { deletePatternIfEmpty, loadPattern, saveNewPattern, updatePattern }