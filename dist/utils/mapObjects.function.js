"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMapObject = void 0;

var _maplibreGl = _interopRequireDefault(require("maplibre-gl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addMapObject = (elem, map, mapObjects) => {
  var _elem$type;

  //default condition to return an empty or invalid array
  if (!elem) {
    return [];
  }

  if ((elem === null || elem === void 0 ? void 0 : (_elem$type = elem.type) === null || _elem$type === void 0 ? void 0 : _elem$type.name) === 'Marker') {
    const {
      coords,
      options,
      onDragEnd
    } = elem.props;
    const currObj = new _maplibreGl.default.Marker({
      color: options.color,
      draggable: options.draggable
    }).setLngLat([coords.lng, coords.lat]).addTo(map.current);

    if (options.draggable) {
      currObj.on("dragend", onDragEnd);
    }

    mapObjects.current.push(currObj);
    return mapObjects.current;
  }
};

exports.addMapObject = addMapObject;