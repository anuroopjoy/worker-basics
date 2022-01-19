/// <reference lib="webworker" />
declare var _: any;

import { generateFibonacci } from './utils/fibonacci';

importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'
);
console.log(_);
addEventListener('message', (evt) => {
  console.log('worker got message: ', evt);
  // throw new Error('Test error from worker');
  const response = generateFibonacci(evt.data.param);
  postMessage(response);
});
