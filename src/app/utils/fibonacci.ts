declare var _: any;

// export function generateFibonacci(n: number): number {
//   return n < 1
//     ? 0
//     : n <= 2
//     ? 1
//     : generateFibonacci(n - 1) + generateFibonacci(n - 2);
// }

export const generateFibonacci = (n: number, arr = new Array(n - 1)) => [
  arr,
  _.reduce(
    arr,
    (acc: any, curr: any, index: any) =>
      (arr[index + 1] = index ? acc + arr[index - 1] : 1),
    (arr[0] = 1)
  ),
];
