importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
);

connections = [];
self.onconnect = (connectEvent) => {
  const port = connectEvent.ports[0];
  connections.push(port);
  port.start();

  port.onmessage = (messageEvent) => {
    console.log("worker got message: ", messageEvent);
    // throw new Error('Test error from worker');
    const response = generateFibonacci(messageEvent.data.param);
    connections.forEach((connection) => {
      connection.postMessage(response);
    });
  };
};

// function generateFibonacci(n) {
//   return n < 1
//     ? 0
//     : n <= 2
//     ? 1
//     : generateFibonacci(n - 1) + generateFibonacci(n - 2);
// }

function generateFibonacci(n, arr = new Array(n - 1)) {
  return [
    arr,
    _.reduce(
      arr,
      (acc, curr, index) => (arr[index + 1] = index ? acc + arr[index - 1] : 1),
      (arr[0] = 1)
    ),
  ];
}
