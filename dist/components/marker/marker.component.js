"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _maplibreGl = _interopRequireDefault(require("maplibre-gl"));

var _map = require("../map/map.context");

const _excluded = ["coords", "popup", "children", "onDrag", "onDragEnd", "onDragStart"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Marker = props => {
  const {
    coords,
    popup,
    children,
    onDrag,
    onDragEnd,
    onDragStart
  } = props,
        options = _objectWithoutProperties(props, _excluded);

  const {
    mapRef
  } = (0, _react.useContext)(_map.MapContext); //const _marker = useRef();

  const marker = (0, _react.useMemo)(() => {
    let hasChildren = false;

    _react.default.Children.forEach(children, el => {
      if (el) {
        hasChildren = true;
      }
    });

    const markerOptions = _objectSpread(_objectSpread({}, options), {}, {
      element: hasChildren ? document.createElement('div') : null
    });

    return new _maplibreGl.default.Marker(markerOptions).setLngLat(coords || [0, 0]);
  }, []);
  (0, _react.useEffect)(() => {
    marker.addTo(mapRef.current);
    return () => marker.remove();
  }, [mapRef]); //////*********Event Handlers************//////

  (0, _react.useEffect)(() => {
    if (onDragStart) {
      marker.on('dragstart', onDragStart);
      return () => marker.off('dragstart', onDragStart);
    }
  }, [onDragStart]);
  (0, _react.useEffect)(() => {
    if (onDragEnd) {
      marker.on('dragend', onDragEnd);
      return () => marker.off('dragend', onDragEnd);
    }
  }, [onDragEnd]);
  (0, _react.useEffect)(() => {
    if (onDrag) {
      marker.on('drag', onDrag);
      return () => marker.off('drag', onDrag);
    }
  }, [onDrag]); //////*********Event Handlers************//////
  //////*********Props Actions************//////

  if (marker.getLngLat().lng !== coords[0] || marker.getLngLat().lat !== coords[1]) {
    marker.setLngLat(coords);
  }

  if (options && options.draggable && marker.isDraggable() !== options.draggable) {
    marker.setDraggable(options.draggable);
  }

  if (popup && marker.getPopup() !== popup) {
    marker.setPopup(new _maplibreGl.default.Popup().setText("This is a test"));
  } //////*********Props Actions************//////


  return /*#__PURE__*/(0, _reactDom.createPortal)(children, marker.getElement());
};

var _default = /*#__PURE__*/_react.default.memo(Marker);

exports.default = _default;