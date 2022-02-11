"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _map = require("../map/map.context");

var _source = require("./source.functions");

var _jsonEquality = require("../../utils/json-equality.functions");

const _excluded = ["id", "children"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Source = props => {
  const {
    id,
    children
  } = props,
        options = _objectWithoutProperties(props, _excluded);

  const childrenRef = (0, _react.useRef)([]);
  const dataRef = (0, _react.useRef)(null);
  const {
    mapRef
  } = (0, _react.useContext)(_map.MapContext);
  const [source, setSource] = (0, _react.useState)(null); //source update once data changes

  if (mapRef && mapRef.current && mapRef.current.getSource(id) && !(0, _jsonEquality.jsonEquality)(dataRef.current, options.data)) {
    mapRef.current.getSource(id).setData(options.data);
  }

  ;
  (0, _react.useEffect)(() => {
    if (mapRef && !source) {
      const addSource = () => {
        const currSource = (0, _source.createSource)(mapRef, id, options, children);
        setSource(currSource);
      };

      childrenRef.current = (0, _source.getChildrenLayers)(children);
      mapRef.current.on('load', addSource);
      return () => mapRef.current.off('load', addSource);
    }

    mapRef.current.getSource(id).setData(options.data);
    return;
  }, [mapRef, source]);
  (0, _react.useEffect)(() => {
    return () => {
      childrenRef.current.forEach(layerId => {
        mapRef.current.removeLayer(layerId);
      });
      mapRef.current.removeSource(id);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", null, children);
};

var _default = Source;
exports.default = _default;