var util = require('util');

exports.log = function (msg) {
  if (typeof msg === 'object') {
    msg = JSON.stringify(msg, null, '\t');
  }
  console.log(msg);
};

exports.logRequest = function (req) {
  var body = '';
  if (req.body) {
    body += JSON.stringify(req.body);
  }
  
  console.log(util.format(' - %s %s %s', req.method, req.url, body));

};

// // Polyfills
// if (!Object.assign) {
//   Object.defineProperty(Object, 'assign', {
//     enumerable: false,
//     configurable: true,
//     writable: true,
//     value: function(target, firstSource) {
//       'use strict';
//       if (target === undefined || target === null) {
//         throw new TypeError('Cannot convert first argument to object');
//       }

//       var to = Object(target);
//       for (var i = 1; i < arguments.length; i++) {
//         var nextSource = arguments[i];
//         if (nextSource === undefined || nextSource === null) {
//           continue;
//         }

//         var keysArray = Object.keys(Object(nextSource));
//         for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
//           var nextKey = keysArray[nextIndex];
//           var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
//           if (desc !== undefined && desc.enumerable) {
//             to[nextKey] = nextSource[nextKey];
//           }
//         }
//       }
//       return to;
//     }
//   });
// }

// if (!Object.cloneDeep) {
//   Object.defineProperty(Object, 'cloneDeep', {
//     enumerable: false,
//     configurable: true,
//     writable: true,
//     value: function(object) {
//       'use strict';
//       if (object === undefined || object === null) {
//         throw new TypeError('Cannot clone object');
//       }

//       var clone = Object.create(object);
//       var keys = Object.keys(object);
//       for (var i = 0; i < keys.length; i++) {
//         if (Array.isArray(object[keys[i]])) {
//           clone[keys[i]] = object[keys[i]].concat();
//         }
//       }
//       return clone;
//     }
//   });
// }