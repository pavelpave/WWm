import { v4 } from 'uuid';

export default class PromiseWorker {
  constructor(props) {
    this.worker = new Worker(props.url, {
      type: props.type ? props.type : 'classic',
    });
    this.promisesStack = [];
  }

  onMessage = (data) => {
    if (data.data.Error) {
      this.promisesStack[data.data.id].reject(data.data.Result);
      this.worker.removeEventListener('message', this.onMessage);
      this.worker.terminate();
    } else {
      this.promisesStack[data.data.id].resolve(data.data);
      this.worker.removeEventListener('message', this.onMessage);
      this.worker.terminate();
    }
    this.promisesStack[data.data.id] = undefined;
  };

  invoke = (data) => {
    if (!data) return false;
    var message = { data: data, id: v4() };
    var promise = new Promise((resolve, reject) => {
      this.promisesStack[message.id] = { resolve: resolve, reject: reject };
    });
    this.worker.postMessage(message);
    return promise;
  };

  workerInit = () => {
    return this.worker;
  };

  init = () => {
    var worker = this.workerInit();
    worker.addEventListener('message', this.onMessage);
    return {
      invoke: this.invoke,
    };
  };
}
