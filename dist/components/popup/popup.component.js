"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.trim.js");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _maplibreGl = _interopRequireDefault(require("maplibre-gl"));

var _map = require("../map/map.context");

const _excluded = ["coords", "text", "html", "children", "onOpen", "onClose"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function getClassList(className) {
  return new Set(className ? className.trim().split(/\s+/) : []);
}

const Popup = props => {
  const {
    coords,
    text,
    html,
    children,
    onOpen,
    onClose
  } = props,
        options = _objectWithoutProperties(props, _excluded);

  const {
    mapRef
  } = (0, _react.useContext)(_map.MapContext);
  const popupPropsRef = (0, _react.useRef)({
    props
  });
  const popupContainer = (0, _react.useMemo)(() => {
    return document.createElement('div');
  });
  const popup = (0, _react.useMemo)(() => {
    return new _maplibreGl.default.Popup(options).setLngLat(coords || [0, 0]);
  }, []);
  (0, _react.useEffect)(() => {
    popup.setDOMContent(popupContainer);

    if (text) {
      popup.setText(text);
    }

    if (html) {
      popup.setHTML(html);
    }

    popup.addTo(mapRef.current);
    return () => popup.remove();
  }, [mapRef]);
  (0, _react.useEffect)(() => {
    if (mapRef && onOpen) {
      popup.on('open', onOpen);
      return () => popup.off('open', onOpen);
    }

    return;
  }, [mapRef, onOpen]);
  (0, _react.useEffect)(() => {
    if (mapRef && onClose) {
      popup.on('open', onClose);
      return () => popup.off('open', onClose);
    }

    return;
  }, [mapRef, onClose]); //////*********Props Actions************//////

  if (popup.isOpen()) {
    if (popup.getLngLat().lng !== coords[0] || popup.getLngLat().lat !== coords[1]) {
      popup.setLngLat(coords);
    }
  }

  if (popup.options.className !== options.className) {
    const prevClassList = getClassList(popup.options.className);
    const newClassList = getClassList(options.className);

    for (const c of prevClassList) {
      if (!newClassList.has(c)) {
        popup.removeClassName(c);
      }
    }

    for (const c of newClassList) {
      if (!prevClassList.has(c)) {
        popup.addClassName(c);
      }
    }

    popup.options.className = options.className;
  } //////*********Props Actions************//////


  return /*#__PURE__*/(0, _reactDom.createPortal)(children, popupContainer);
};

var _default = /*#__PURE__*/_react.default.memo(Popup);

exports.default = _default;