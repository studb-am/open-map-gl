"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLayer = exports.createLayer = void 0;

var _jsonEquality = require("../../utils/json-equality.functions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createLayer = (map, id, props) => {
  if (map && map.current && !map.current.getLayer(id)) {
    const options = _objectSpread(_objectSpread({}, props.options), {}, {
      id
    });

    delete options.beforeId;
    map.current.addLayer(options, props === null || props === void 0 ? void 0 : props.beforeId);
    return map.current.getLayer(id);
  }
};

exports.createLayer = createLayer;

const updateLayer = (map, id, newProps, oldProps) => {
  if (newProps.beforeId !== oldProps.beforeId) {
    map.current.moveLayer(id, newProps.beforeId);
  }

  const newOptions = newProps.options || {};
  const oldOptions = oldProps.options || {};

  if (!(0, _jsonEquality.jsonEquality)(newOptions.layout, oldOptions.layout)) {
    for (let key in newOptions.layout) {
      map.current.setLayoutProperty(id, key, newOptions.layout[key]);
    }

    for (let key in oldOptions.layout) {
      if (!newOptions.layout.hasOwnProperty(key)) {
        map.current.setLayoutProperty(id, key, undefined);
      }
    }
  }

  if (!(0, _jsonEquality.jsonEquality)(newOptions.paint, oldOptions.paint)) {
    for (let key in newOptions.paint) {
      map.current.setPaintProperty(id, key, newOptions.paint[key]);
    }

    for (let key in oldOptions.paint) {
      if (!newOptions.paint.hasOwnProperty(key)) {
        map.current.setPaintProperty(id, key, undefined);
      }
    }
  }
};

exports.updateLayer = updateLayer;