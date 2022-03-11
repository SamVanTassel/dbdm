import { dataset_dev } from 'svelte/internal';
import dbConnect from './mongoose.js';

const Pattern = dbConnect();

export function save (bank, slot, data) {
  // delete if empty
  // load pattern
  // gnerate random word
  // save new pattern
  // update pattern
  /* return 
   res.json({
      name: res.locals.name,
      pattern: res.locals.pattern
    })
  */
 console.log(data)
  return Promise.resolve({ name: 'test' })

}

export function load (bank, slot) {
  // load pattern
  // return res.json({
  //    name: res.locals.name,
  //    pattern: res.locals.pattern
  //  })
}