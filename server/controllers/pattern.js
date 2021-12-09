import Pattern from '../models/pattern.js';
import wordList from '../static/words.js';
import express from 'express';

const usedWords = [];

const generateRandomWord = (req, res, next) => {
  console.log('generating random word');

  // doesn't care what is in res.locals
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  while (usedWords.includes(randomWord)) { randomWord = wordList[Math.floor(Math.random() * wordList.length)];}
  usedWords.push(randomWord);
  res.locals.randomWord = randomWord;
  return next();
  // return { randomWord } in res.locals
}

const loadPattern = (req, res, next) => {
  if (res.locals.justDeleted) return next();
  console.log('loading pattern');
  // expects nothing in res.locals
  const loadSlot = { slot: req.params.slot } 
  Pattern.findOne(loadSlot)
    .then(found => {
      res.locals = { 
        pattern: found ? found.pattern : new String('.').repeat(16),
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
    Pattern.create({ slot: req.params.slot, pattern: req.body.pattern, name: res.locals.randomWord })
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
    if (res.locals.pattern === req.body.pattern) { // IF DOC EXISTS BUT PATTERN IS SAME, DON'T UPDATE
      return next();
    } else {   
      console.log('updating pattern')                       // IF DOC EXISTS AND PATTERN IS DIFFERENT, UPDATE PATTERN AND NAME
      Pattern.findOneAndUpdate({ slot: req.params.slot }, { pattern: req.body.pattern, name: res.locals.randomWord }, { new: true })
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
  if (req.body.pattern === '................') {
    console.log('deleting pattern')
    Pattern.deleteOne({ slot: req.params.slot })
      .then(() => {
        res.locals = {
          pattern: new String('.').repeat(16),
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

export { deletePatternIfEmpty, loadPattern, generateRandomWord, saveNewPattern, updatePattern }