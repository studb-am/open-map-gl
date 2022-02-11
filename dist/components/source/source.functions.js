"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSource = exports.getChildrenLayers = exports.createSource = void 0;

var _jsonEquality = require("../../utils/json-equality.functions");

const _excluded = ["beforeId", "children"],
      _excluded2 = ["beforeId", "children", "onClick"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

let childrenLayers = [];

const getChildrenLayers = children => {
  let childrenArray = [];

  if (Array.isArray(children)) {
    childrenArray = children;
  } else {
    childrenArray = [children];
  }

  childrenLayers = childrenArray.map(child => {
    const _child$props = child.props,
          {
      beforeId,
      children
    } = _child$props,
          layer = _objectWithoutProperties(_child$props, _excluded);

    if (child.type.name !== 'Layer') return;
    return layer.id;
  });
  return childrenArray;
};

exports.getChildrenLayers = getChildrenLayers;

const createSource = (map, id, options, children) => {
  if (map && map.current) {
    map.current.addSource(id, options);
    let childrenArray = [];

    if (Array.isArray(children)) {
      childrenArray = children;
    } else {
      childrenArray = [children];
    }

    childrenArray.forEach(child => {
      const _child$props2 = child.props,
            {
        beforeId,
        children,
        onClick
      } = _child$props2,
            layer = _objectWithoutProperties(_child$props2, _excluded2);

      if (child.type.name !== 'Layer') return;
      map.current.addLayer(layer, beforeId);
    });
    return map.current.getSource(id);
  }

  return;
};

exports.createSource = createSource;

const updateSource = (Source, newOptions, prevOptions) => {
  const key = 'data';

  if (!(0, _jsonEquality.jsonEquality)(newOptions[key], prevOptions[key])) {
    Source.setData(newOptions[key]);
  }

  return Source;
};

exports.updateSource = updateSource;