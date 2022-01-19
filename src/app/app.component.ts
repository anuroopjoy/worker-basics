import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'worker-basics';
  worker!: Worker;
  sharedWorker!: SharedWorker;

  ngOnInit(): void {
    console.log(import.meta.url);
    this.#initWorker();
    this.#initSharedWorker();
    // const result = this.#generateFibonacci(42);
    // console.log(result);
  }

  #initWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        console.log('Data received from worker ', data);
      };
      this.worker.onerror = (error) => {
        console.error('Error message received from worker:', error);
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  #initSharedWorker() {
    if (typeof SharedWorker !== 'undefined') {
      this.sharedWorker = new SharedWorker(
        new URL('./app.shared.worker', import.meta.url)
      );
      this.sharedWorker.port.onmessage = ({ data }) => {
        console.log('Data received from shared worker ', data);
      };
      this.sharedWorker.port.onmessageerror = (error) => {
        console.error('Error message received from shared worker:', error);
      };
    } else {
      // Shared Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
  // #generateFibonacci = (n: number): number => {
  //   if (n < 2) {
  //     return n;
  //   }
  //   return this.#generateFibonacci(n - 1) + this.#generateFibonacci(n - 2);
  // };

  postMsg() {
    this.worker.postMessage({ action: 'generateFibonacci', param: 42 });
  }
  postSharedMsg() {
    this.sharedWorker.port.postMessage({ action: 'generateFibonacci', param: 42 });
  }
  terminateWorker() {
    this.worker.terminate();
  }
  terminateSharedWorker() {
    this.sharedWorker.port.postMessage({ action: 'terminate' });
  }
}
