"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.flat.js");

require("core-js/modules/es.array.unscopables.flat.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/stable");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// https://github.com/browserslist/browserslist#queries
var arr = [0, 1, 2, [3, 4]];
arr.includes(1);
arr.flat();

function wait(ms) {
  setTimeout(function () {
    Promise.resolve();
  }, ms);
}

function process(_x) {
  return _process.apply(this, arguments);
}

function _process() {
  _process = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ms) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return wait(2000);

          case 2:
            return _context.abrupt("return", arr);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _process.apply(this, arguments);
}

var _default = process;
exports.default = _default;
