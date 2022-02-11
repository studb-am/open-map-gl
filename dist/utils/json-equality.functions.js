"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonEquality = void 0;

require("core-js/modules/es.array.sort.js");

const jsonEquality = (a, b) => {
  //if a and b aren't the same type, they can't be equal
  if (typeof a !== typeof b) {
    return false;
  } // Need the truthy guard because
  // typeof null === 'object'


  if (a && typeof a === 'object') {
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort(); //if a and b are objects with different no of keys, unequal

    if (keysA.length !== keysB.length) {
      return false;
    } //if keys aren't all the same, unequal


    if (!keysA.every(function (k, i) {
      return k === keysB[i];
    })) {
      return false;
    } //recurse on the values for each key


    return keysA.every(function (key) {
      //if we made it here, they have identical keys
      return jsonEquality(a[key], b[key]);
    }); //for primitives just use a straight up check
  } else {
    return a === b;
  }
};

exports.jsonEquality = jsonEquality;