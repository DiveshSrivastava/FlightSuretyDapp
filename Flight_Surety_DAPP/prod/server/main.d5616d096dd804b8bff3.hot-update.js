exports.id = "main";
exports.modules = {

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ \"babel-polyfill\");\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _build_contracts_flightSuretyApp_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../build/contracts/flightSuretyApp.json */ \"./build/contracts/flightSuretyApp.json\");\nvar _build_contracts_flightSuretyApp_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/Object.assign({}, _build_contracts_flightSuretyApp_json__WEBPACK_IMPORTED_MODULE_1__, {\"default\": _build_contracts_flightSuretyApp_json__WEBPACK_IMPORTED_MODULE_1__});\n/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.json */ \"./src/server/config.json\");\nvar _config_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/Object.assign({}, _config_json__WEBPACK_IMPORTED_MODULE_2__, {\"default\": _config_json__WEBPACK_IMPORTED_MODULE_2__});\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! web3 */ \"web3\");\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _flightSchedules_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./flightSchedules.json */ \"./src/server/flightSchedules.json\");\nvar _flightSchedules_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/Object.assign({}, _flightSchedules_json__WEBPACK_IMPORTED_MODULE_5__, {\"default\": _flightSchedules_json__WEBPACK_IMPORTED_MODULE_5__});\n/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bignumber.js */ \"bignumber.js\");\n/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_6__);\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n\n\n // Flight status codees\n\nvar STATUS_CODE_UNKNOWN = 0;\nvar STATUS_CODE_ON_TIME = 10;\nvar STATUS_CODE_LATE_AIRLINE = 20;\nvar STATUS_CODE_LATE_WEATHER = 30;\nvar STATUS_CODE_LATE_TECHNICAL = 40;\nvar STATUS_CODE_LATE_OTHER = 50;\nvar flightStatus = [STATUS_CODE_UNKNOWN, STATUS_CODE_ON_TIME, STATUS_CODE_LATE_AIRLINE, STATUS_CODE_LATE_WEATHER, STATUS_CODE_LATE_TECHNICAL, STATUS_CODE_LATE_OTHER];\nvar ORACLES_COUNT = 20;\nvar config = _config_json__WEBPACK_IMPORTED_MODULE_2__['localhost'];\nvar web3 = new web3__WEBPACK_IMPORTED_MODULE_3___default.a(new web3__WEBPACK_IMPORTED_MODULE_3___default.a.providers.WebsocketProvider(config.url.replace('http', 'ws')));\nweb3.eth.defaultAccount = web3.eth.accounts[0];\nvar flightSuretyApp = new web3.eth.Contract(_build_contracts_flightSuretyApp_json__WEBPACK_IMPORTED_MODULE_1__.abi, config.appAddress);\nvar oracleIndexes = [];\n\nvar registerOracle = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var accounts, staking, a, result;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return web3.eth.getAccounts();\n\n          case 2:\n            accounts = _context.sent;\n            _context.next = 5;\n            return flightSuretyApp.methods.REGISTRATION_FEE().call();\n\n          case 5:\n            staking = _context.sent;\n            console.log(\"staking:\".concat(staking));\n            _context.prev = 7;\n            a = 1;\n\n          case 9:\n            if (!(a <= ORACLES_COUNT)) {\n              _context.next = 20;\n              break;\n            }\n\n            _context.next = 12;\n            return flightSuretyApp.methods.registerOracle().send({\n              from: accounts[a],\n              value: staking,\n              gas: 4500000\n            });\n\n          case 12:\n            _context.next = 14;\n            return flightSuretyApp.methods.getMyIndexes().call({\n              from: accounts[a]\n            });\n\n          case 14:\n            result = _context.sent;\n            console.log(\"Oracle Registered: \".concat(result[0], \", \").concat(result[1], \", \").concat(result[2]));\n            oracleIndexes.push({\n              address: accounts[a],\n              indexes: [new bignumber_js__WEBPACK_IMPORTED_MODULE_6___default.a(result[0]).toString(), new bignumber_js__WEBPACK_IMPORTED_MODULE_6___default.a(result[1]).toString(), new bignumber_js__WEBPACK_IMPORTED_MODULE_6___default.a(result[2]).toString()]\n            });\n\n          case 17:\n            a++;\n            _context.next = 9;\n            break;\n\n          case 20:\n            console.log(\"OracleRequest registerOracle : \".concat(JSON.stringify(oracleIndexes, null, 4)));\n            _context.next = 26;\n            break;\n\n          case 23:\n            _context.prev = 23;\n            _context.t0 = _context[\"catch\"](7);\n            console.error(_context.t0);\n\n          case 26:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[7, 23]]);\n  }));\n\n  return function registerOracle() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nregisterOracle();\nflightSuretyApp.events.OracleRequest({\n  fromBlock: \"latest\"\n}, /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(error, event) {\n    var reqIndex, resOracles, statusCode, _iterator, _step, oracle;\n\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            if (error) console.log(error);\n            console.log(event);\n            reqIndex = new bignumber_js__WEBPACK_IMPORTED_MODULE_6___default.a(event.returnValues.index).toString();\n            console.log(\"OracleRequest reqIndex : \".concat(reqIndex));\n            resOracles = oracleIndexes.filter(function (oraclse) {\n              return oraclse.indexes[0] === reqIndex || oraclse.indexes[1] === reqIndex || oraclse.indexes[2] === reqIndex;\n            });\n            statusCode = new bignumber_js__WEBPACK_IMPORTED_MODULE_6___default.a(flightStatus[Math.floor(Math.random() * 6)]).toString(); //let statusCode = new BigNumber(20).toString();\n\n            console.log(\"OracleRequest resOracles : \".concat(JSON.stringify(resOracles, null, 4)));\n            _iterator = _createForOfIteratorHelper(resOracles);\n            _context2.prev = 8;\n\n            _iterator.s();\n\n          case 10:\n            if ((_step = _iterator.n()).done) {\n              _context2.next = 24;\n              break;\n            }\n\n            oracle = _step.value;\n            _context2.prev = 12;\n            console.log(\"OracleRequest oracle : \".concat(JSON.stringify(oracle, null, 4))); // Submit a response...it will only be accepted if there is an Index match\n\n            _context2.next = 16;\n            return flightSuretyApp.methods.submitOracleResponse(reqIndex, event.returnValues.airline, event.returnValues.flight, event.returnValues.timestamp, statusCode).send({\n              from: oracle.address,\n              gas: 4500000\n            });\n\n          case 16:\n            _context2.next = 22;\n            break;\n\n          case 18:\n            _context2.prev = 18;\n            _context2.t0 = _context2[\"catch\"](12);\n            console.error(_context2.t0);\n            console.log('\\nNot match Oracles', reqIndex, event.returnValues.airline, event.returnValues.timestamp, oracle.address);\n\n          case 22:\n            _context2.next = 10;\n            break;\n\n          case 24:\n            _context2.next = 29;\n            break;\n\n          case 26:\n            _context2.prev = 26;\n            _context2.t1 = _context2[\"catch\"](8);\n\n            _iterator.e(_context2.t1);\n\n          case 29:\n            _context2.prev = 29;\n\n            _iterator.f();\n\n            return _context2.finish(29);\n\n          case 32:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[8, 26, 29, 32], [12, 18]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref2.apply(this, arguments);\n  };\n}());\nflightSuretyApp.events.OracleReport({\n  fromBlock: \"latest\"\n}, /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(error, event) {\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            if (error) console.log(error);\n            console.log(JSON.stringify(event));\n\n          case 2:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref3.apply(this, arguments);\n  };\n}());\nflightSuretyApp.events.FlightStatusInfo({\n  fromBlock: \"latest\"\n}, /*#__PURE__*/function () {\n  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(error, event) {\n    var status, flight;\n    return regeneratorRuntime.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            if (error) console.log(error);\n            console.log(JSON.stringify(event));\n            status = event.returnValues.status;\n            flight = event.returnValues.flight;\n            console.log(status, flight);\n\n          case 5:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4);\n  }));\n\n  return function (_x5, _x6) {\n    return _ref4.apply(this, arguments);\n  };\n}());\nvar app = express__WEBPACK_IMPORTED_MODULE_4___default()();\napp.get('/api', function (req, res) {\n  res.send({\n    message: 'An API for use with your Dapp!'\n  });\n  app.get('/flightschedules', function (req, res) {\n    res.status(200).json(_flightSchedules_json__WEBPACK_IMPORTED_MODULE_5__);\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ })

};