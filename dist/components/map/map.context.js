"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapContext = void 0;

var _react = require("react");

const MapContext = /*#__PURE__*/(0, _react.createContext)({
  map: null,
  mapRef: null,
  changeMap: () => {}
});
exports.MapContext = MapContext;