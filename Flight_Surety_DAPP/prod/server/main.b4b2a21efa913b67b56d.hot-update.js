exports.id = "main";
exports.modules = {

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _build_contracts_FlightSuretyApp_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../build/contracts/FlightSuretyApp.json */ \"./build/contracts/FlightSuretyApp.json\");\nvar _build_contracts_FlightSuretyApp_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/Object.assign({}, _build_contracts_FlightSuretyApp_json__WEBPACK_IMPORTED_MODULE_0__, {\"default\": _build_contracts_FlightSuretyApp_json__WEBPACK_IMPORTED_MODULE_0__});\n/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.json */ \"./src/server/config.json\");\nvar _config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/Object.assign({}, _config_json__WEBPACK_IMPORTED_MODULE_1__, {\"default\": _config_json__WEBPACK_IMPORTED_MODULE_1__});\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! web3 */ \"web3\");\n/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _build_contracts_FlightSuretyData_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../build/contracts/FlightSuretyData.json */ \"./build/contracts/FlightSuretyData.json\");\nvar _build_contracts_FlightSuretyData_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/Object.assign({}, _build_contracts_FlightSuretyData_json__WEBPACK_IMPORTED_MODULE_4__, {\"default\": _build_contracts_FlightSuretyData_json__WEBPACK_IMPORTED_MODULE_4__});\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n\n\n__webpack_require__(/*! babel-polyfill */ \"babel-polyfill\");\n\nvar config = _config_json__WEBPACK_IMPORTED_MODULE_1__['localhost'];\nvar web3 = new web3__WEBPACK_IMPORTED_MODULE_2___default.a(new web3__WEBPACK_IMPORTED_MODULE_2___default.a.providers.WebsocketProvider(config.url.replace('http', 'ws')));\nweb3.eth.defaultAccount = web3.eth.accounts[0];\nvar flightSuretyApp = new web3.eth.Contract(_build_contracts_FlightSuretyApp_json__WEBPACK_IMPORTED_MODULE_0__.abi, config.appAddress);\nvar flightSuretyData = new web3.eth.Contract(_build_contracts_FlightSuretyData_json__WEBPACK_IMPORTED_MODULE_4__.abi, config.dataAddress);\nvar oracles = [];\nvar accounts = web3.eth.getAccounts();\nflightSuretyApp.events.OracleRequest({\n  fromBlock: 0\n}, function (error, event) {\n  if (error) console.log(error);\n  console.log(event);\n});\n\nfunction registerOracles() {\n  return _registerOracles.apply(this, arguments);\n}\n\nfunction _registerOracles() {\n  _registerOracles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var fee, accts, numberOfOracles, i;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return flightSuretyApp.methods.REGISTRATION_FEE().call();\n\n          case 2:\n            fee = _context.sent;\n            _context.next = 5;\n            return accounts;\n\n          case 5:\n            accts = _context.sent;\n            numberOfOracles = config.numOracles;\n\n            if (accts.length < config.numOracles) {\n              numberOfOracles = accts.length;\n            }\n\n            i = 0;\n\n          case 9:\n            if (!(i < numberOfOracles)) {\n              _context.next = 16;\n              break;\n            }\n\n            oracles.push(accts[i]);\n            _context.next = 13;\n            return flightSuretyApp.methods.registerOracle().send({\n              from: accts[i],\n              value: fee,\n              gas: 999999999\n            });\n\n          case 13:\n            i++;\n            _context.next = 9;\n            break;\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _registerOracles.apply(this, arguments);\n}\n\nfunction submitOracleResponse(_x, _x2, _x3) {\n  return _submitOracleResponse.apply(this, arguments);\n}\n\nfunction _submitOracleResponse() {\n  _submitOracleResponse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(airline, flight, timestamp) {\n    var i, statusCode, indexes, j;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            i = 0;\n\n          case 1:\n            if (!(i < oracles.length)) {\n              _context2.next = 21;\n              break;\n            }\n\n            statusCode = (Math.floor(Math.random() * Math.floor(4)) + 1) * 10 + 10;\n            _context2.next = 5;\n            return flightSuretyApp.methods.getMyIndexes().call({\n              from: oracles[i]\n            });\n\n          case 5:\n            indexes = _context2.sent;\n            j = 0;\n\n          case 7:\n            if (!(j < indexes.length)) {\n              _context2.next = 18;\n              break;\n            }\n\n            _context2.prev = 8;\n            _context2.next = 11;\n            return flightSuretyApp.methods.submitOracleResponse(indexes[j], airline, flight, timestamp, statusCode).send({\n              from: oracles[i],\n              gas: 999999999\n            });\n\n          case 11:\n            _context2.next = 15;\n            break;\n\n          case 13:\n            _context2.prev = 13;\n            _context2.t0 = _context2[\"catch\"](8);\n\n          case 15:\n            j++;\n            _context2.next = 7;\n            break;\n\n          case 18:\n            i++;\n            _context2.next = 1;\n            break;\n\n          case 21:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[8, 13]]);\n  }));\n  return _submitOracleResponse.apply(this, arguments);\n}\n\nfunction listenForEvents() {\n  return _listenForEvents.apply(this, arguments);\n}\n\nfunction _listenForEvents() {\n  _listenForEvents = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {\n    return regeneratorRuntime.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            /****************************************************************\n             ****************** FLIGHT SURETY APP EVENTS *******************\n             ****************************************************************/\n            flightSuretyApp.events.FlightStatusInfo({}, function (error, event) {\n              logEvent(error, event, \"FLIGHT STATUS REPORT\");\n            });\n            flightSuretyApp.events.OracleReport({}, function (error, event) {\n              logEvent(error, event, \"ORACLE REPORT\");\n            });\n            flightSuretyApp.events.OracleRegistered({}, function (error, event) {\n              logEvent(error, event, \"ORACLE REGISTERED\");\n            });\n            flightSuretyApp.events.OracleRequest({}, /*#__PURE__*/function () {\n              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(error, event) {\n                return regeneratorRuntime.wrap(function _callee3$(_context3) {\n                  while (1) {\n                    switch (_context3.prev = _context3.next) {\n                      case 0:\n                        logEvent(error, event, \"ORACLE REQUEST\");\n\n                        if (error) {\n                          _context3.next = 4;\n                          break;\n                        }\n\n                        _context3.next = 4;\n                        return submitOracleResponse(event.returnValues[1], // airline\n                        event.returnValues[2], // flight\n                        event.returnValues[3] // timestamp\n                        );\n\n                      case 4:\n                      case \"end\":\n                        return _context3.stop();\n                    }\n                  }\n                }, _callee3);\n              }));\n\n              return function (_x4, _x5) {\n                return _ref.apply(this, arguments);\n              };\n            }());\n            /****************************************************************\n             ****************** FLIGHT SURETY DATA EVENTS *******************\n             ****************************************************************/\n\n            flightSuretyData.events.AirlineRegistered({}, function (error, event) {\n              logEvent(error, event, \"AIRLINE REGISTERED\");\n            });\n            flightSuretyData.events.AirlineFunded({}, function (error, event) {\n              logEvent(error, event, \"AIRLINE FUNDED\");\n            });\n            flightSuretyData.events.FlightRegistered({}, function (error, event) {\n              logEvent(error, event, \"FLIGHT REGISTERED\");\n            });\n            flightSuretyData.events.ProcessedFlightStatus({}, function (error, event) {\n              logEvent(error, event, \"PROCESSED FLIGHT STATUS\");\n            });\n            flightSuretyData.events.FlightStatusUnknown({}, function (error, event) {\n              logEvent(error, event, \"FLIGHT STATUS UNKNOWN\");\n            });\n            flightSuretyData.events.PassengerInsured({}, function (error, event) {\n              logEvent(error, event, \"PASSENGER INSURED\");\n            });\n            flightSuretyData.events.InsureeCredited({}, function (error, event) {\n              logEvent(error, event, \"INSUREE CREDITED\");\n            });\n            flightSuretyData.events.FlightStatusUpdating({}, function (error, event) {\n              logEvent(error, event, \"FLIGHT STATUS UPDATING\");\n            });\n            flightSuretyData.events.PayInsuree({}, function (error, event) {\n              logEvent(error, event, \"PAY INSUREE\");\n            });\n\n          case 13:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4);\n  }));\n  return _listenForEvents.apply(this, arguments);\n}\n\nfunction logEvent(error, event, title) {\n  if (error) console.log(error);else {\n    console.log('----- EVENT -----');\n    console.log(title);\n    console.log(event.returnValues);\n    console.log('-----------------');\n  }\n}\n\nvar app = express__WEBPACK_IMPORTED_MODULE_3___default()();\napp.get('/api', function (req, res) {\n  res.send({\n    message: 'An API for use with your Dapp!'\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ })

};