import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'worker-basics';
  worker!: SharedWorker;

  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new
      console.log(import.meta.url);
      this.worker = new SharedWorker(new URL('./app.shared.worker', import.meta.url));
      this.worker.port.onmessage = ({ data }) => {
        console.log(data);
      };
      this.worker.port.onmessageerror = (error) => {
        console.error('Error message received from worker:', error);
      };
      // setTimeout(() => {
      //   worker.terminate();
      //   console.log('terminated');
      // }, 1000);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
    // const result = this.#generateFibonacci(42);
    // console.log(result);
  }

  // #generateFibonacci = (n: number): number => {
  //   if (n < 2) {
  //     return n;
  //   }
  //   return this.#generateFibonacci(n - 1) + this.#generateFibonacci(n - 2);
  // };

  postMsg() {
    this.worker.port.postMessage({ action: 'generateFibonacci', param: 42 });
  }
}
