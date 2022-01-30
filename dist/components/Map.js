"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _maplibreGl = _interopRequireDefault(require("maplibre-gl"));

var _mapObjects = require("../utils/mapObjects.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Map = (props, ref) => {
  const {
    centerCoords,
    initialZoom,
    minZoom,
    maxZoom,
    mapStyle,
    navigationControl,
    onClick,
    mapContainerClassName,
    mapClassName,
    children
  } = props;
  const mapContainer = (0, _react.useRef)(null);
  const map = (0, _react.useRef)(null);
  const mapObjects = (0, _react.useRef)([]);
  const [lng] = (0, _react.useState)(centerCoords.lng);
  const [lat] = (0, _react.useState)(centerCoords.lat);
  const [zoom] = (0, _react.useState)(initialZoom);
  /**
   * Section of action event
   */

  (0, _react.useImperativeHandle)(ref, () => {
    return {
      flyTo: (center, zoom) => {
        map.current.flyTo({
          center,
          zoom
        });
      }
    };
  }); //========================

  (0, _react.useLayoutEffect)(() => {
    //if the map exists then I just remove all her objects, otherwise I initialize the map itself
    if (map.current) {
      //update block
      mapObjects.current.map(mapObject => {
        mapObject.remove();
      });
      mapObjects.current = []; //I'm re-initializing the array too
    } else {
      //initialization block
      map.current = new _maplibreGl.default.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [lng, lat],
        zoom: zoom,
        minZoom: minZoom || null,
        maxZoom: maxZoom || null
      }); //initialization advanced options

      if (navigationControl !== "none") {
        map.current.addControl(new _maplibreGl.default.NavigationControl(), navigationControl);
      }

      if (onClick) {
        map.current.on('click', onClick);
      }
    }

    if (Array.isArray(children)) {
      children.map(child => {
        //First of all I evaluate if the child comes from a map (in this case is a nested array of children)
        if (Array.isArray(child)) {
          child.map(elem => {
            mapObjects.current = (0, _mapObjects.addMapObject)(elem, map, mapObjects);
          });
        } else {
          mapObjects.current = (0, _mapObjects.addMapObject)(child, map, mapObjects);
        }
      });
    } else {
      mapObjects.current = (0, _mapObjects.addMapObject)(children, map, mapObjects);
    }
  }, [children]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: mapContainerClassName
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: mapContainer,
    className: mapClassName
  }));
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(Map);

exports.default = _default;