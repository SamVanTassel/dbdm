import dbConnect from '../../../dbConnect.js';
import Pattern from '../../../models/pattern.js';
import { Step } from '../../../../../Classes.js';

// get requests to api/bank/slotNum trigger this function
export async function get({ params }) {
  console.log('loading w/ params: ', params)

  await dbConnect()
  const loadSlotInBank = { slot: params.slotNum, bank: params.bank };
  const found = await Pattern.findOne(loadSlotInBank);

  console.log('loaded from db: ', found);
  const response = {body: {
    pattern: found.pattern || new Array(16).fill('.').map((el) => new Step(false)),
    name: found.name || 'xxxx'
  }};
  console.log(response);
  return response;
}

// post requests to api/bank/slotNum trigger this function
export async function post({ request }) {
  await dbConnect()

  console.log(request.json().body);
  /* find all the data in our database */
  const result = await Pattern.find({})
  // delete if empty
  // load pattern
  // generate random word
  // save new pattern
  // update pattern
  /* return 
   res.json({
      name: res.locals.name,
      pattern: res.locals.pattern
    })
  */
  return result;
}
/*
export async function post({ request }) {
	const json = await request.json();
	const body = await api.post('users/login', {
		user: {
			email: json.email,
			password: json.password
		}
	});

	return respond(body);
}
*/