"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PromiseWorker = function PromiseWorker(props) {
  var _this = this;

  _classCallCheck(this, PromiseWorker);

  _defineProperty(this, "onMessage", function (data) {
    if (data.data.Error) {
      _this.promisesStack[data.data.id].reject(data.data.Result);

      _this.worker.removeEventListener('message', _this.onMessage);

      _this.worker.terminate();
    } else {
      _this.promisesStack[data.data.id].resolve(data.data);

      _this.worker.removeEventListener('message', _this.onMessage);

      _this.worker.terminate();
    }

    _this.promisesStack[data.data.id] = undefined;
  });

  _defineProperty(this, "invoke", function (data) {
    if (!data) return false;
    var message = {
      data: data,
      id: (0, _uuid.v4)()
    };
    var promise = new Promise(function (resolve, reject) {
      _this.promisesStack[message.id] = {
        resolve: resolve,
        reject: reject
      };
    });

    _this.worker.postMessage(message);

    return promise;
  });

  _defineProperty(this, "workerInit", function () {
    return _this.worker;
  });

  _defineProperty(this, "init", function () {
    var worker = _this.workerInit();

    worker.addEventListener('message', _this.onMessage);
    return {
      invoke: _this.invoke
    };
  });

  this.worker = new Worker(props.url, {
    type: props.type ? props.type : 'classic'
  });
  this.promisesStack = [];
};

exports.default = PromiseWorker;