import wordList from '../static/words.js';

const usedWords = [];

const generateRandomWord = (req, res, next) => {
  console.log('generating random word');
  // doesn't care what is in res.locals

  let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  // if random word has been used in this session, pick a new one
  while (usedWords.includes(randomWord)) { 
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    // if all words have been used, clear used words to recycle old ones
    if (usedWords.length === wordList.length) usedWords.length = 0;
  }
  usedWords.push(randomWord);
  res.locals.randomWord = randomWord;
  return next();
  // return { randomWord } in res.locals
}

export { generateRandomWord }