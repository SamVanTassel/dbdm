import dbConnect from '../../../dbConnect.js';
import Pattern from '../../../models/pattern.js';
import { Step } from '../../../../../Classes.js';
import wordList from '../../../../static/words.js';

let usedWords = global.usedWords;

if (!usedWords) {
  usedWords = global.usedWords = [];
}

// get requests to api/bank/slotNum trigger this function
export async function get({ params }) {
  await dbConnect()
  const loadSlotInBank = { slot: params.slotNum, bank: params.bank };
  try {
    const found = await Pattern.findOne(loadSlotInBank);

    const response = { body: {
      pattern: found ? found.pattern : new Array(16).fill('.').map((el) => new Step(false)),
      name: found ? found.name : 'xxxx'
    } };
    return response;
  } catch(err) {
      console.log(err);
      return { status: 500 }
  }
}

// post requests to api/bank/slotNum trigger this function
export async function post({ request, params }) {
  const res = { locals: {} };
  const errStatus = { status: 500 };

  await dbConnect()
  const body = await request.json();
  // ----------------- delete if empty -------------------------------------
  if (!body.pattern.some((el) => el.isOn)) { // if no notes contain are on
    const err = await deleteIfEmpty(params, res);
    if (err) {
      console.log('delete error: ', err);
      return errStatus;
    }
  };
  // ----------------- generate random word ---------------------------------------
  generateRandomWord(res);
  // ----------------- create new pattern if needed --------------------------------
  if (res.locals.name === 'xxxx' && !res.locals.justDeleted) {
    const err = await createNewPattern(params, body, res);
    if (err) {
      console.log('create error: ', err);
      return errStatus;
    }
  } else {
  // ------------------ return OK if nothing needs to be changed ---------------------
    if (JSON.stringify(res.locals.pattern) === JSON.stringify(body.pattern)) { // IF DOC EXISTS BUT PATTERN IS SAME, DON'T UPDATE
      console.log('nothing new to save')
      return { 
        status: 200
      };
    } else {
  // ---------------- update pattern if necessary --------------------------
      const err = await updatePattern(params, body, res);
      if (err) {
        console.log('update error: ', err);
        return errStatus;
      }
    }
  }
  return { body: {
      name: res.locals.name,
      pattern: res.locals.pattern
    }
  }
}

async function deleteIfEmpty(params, res) {
  console.log('deleting pattern')
  try {
    await Pattern.deleteOne({ slot: params.slotNum, bank: params.bank })
    res.locals = {
      pattern: new Array(16).fill('.').map(() => new Step(false)),
      name: 'xxxx',
      justDeleted: true
    };
  } catch(err) {
    return err;
  }
}
function generateRandomWord(res) {
  console.log('generating random word');
  let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  // if random word has been used in this session, pick a new one
  while (usedWords.includes(randomWord)) { 
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    // if all words have been used, clear used words to recycle old ones
    if (usedWords.length === wordList.length) usedWords.length = 0;
  }
  usedWords.push(randomWord);
  res.locals.randomWord = randomWord;
  return res;
}
async function createNewPattern(params, body, res) {
  console.log('creating new pattern');
  try {
    const data = await Pattern.create(
      { slot: params.slotNum,
        bank: params.bank,
        pattern: body.pattern,
        name: res.locals.randomWord 
      })
    res.locals.pattern = data.pattern;
    res.locals.name = data.name;
  }
  catch(err) {
    return err;
  }
}
async function updatePattern(params, body, res) {
  console.log('updating pattern')
  try {
    const filter = { slot: params.slotNum, bank: params.bank };
    const update = { pattern: body.pattern, name: res.locals.randomWord };
    const data = await Pattern.findOneAndUpdate(filter, update, { new: true, upsert: true });
    res.locals.name = data.name;
    res.locals.pattern = data.pattern;
  }
  catch(err) {
    return err;
  }
}