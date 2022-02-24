describe('Worker', () => {
  it('fibonacci data', (done) => {
    const worker = new Worker(new URL('./app.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      expect(data).toEqual([[1, 1], 1]);
      done();
    };

    worker.postMessage({ action: 'generateFibonacci', param: 1 });
  });
});
