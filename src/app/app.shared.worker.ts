/// <reference lib="webworker" />
declare var _: any;
declare var self: any;

import { generateFibonacci } from './utils/fibonacci';

importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'
);
console.log(_);
const connections: MessagePort[] = [];
self.onconnect = (connectEvent: MessageEvent) => {
  const port = connectEvent.ports[0];
  connections.push(port);
  // port.start();

  port.onmessage = (messageEvent) => {
    console.log('worker got message: ', messageEvent);
    // throw new Error('Test error from worker');
    if (messageEvent.data.action === 'generateFibonacci') {
      const response = generateFibonacci(messageEvent.data.param);
      connections.forEach((connection) => {
        connection.postMessage(response);
      });
    } else if (messageEvent.data.action === 'terminate') {
      self.close();
    }
  };
};
