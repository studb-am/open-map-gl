"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _map = require("../map/map.context");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Layer = props => {
  const {
    id,
    source,
    inspectClusterOnClick,
    onClick,
    onDblClick,
    onRightClick
  } = props;
  const {
    mapRef
  } = (0, _react.useContext)(_map.MapContext);

  if (onClick && inspectClusterOnClick) {
    throw new Error('Attention! You cannot set the onClick property if you enable the inspectClusterOnClick one!!!');
  }

  (0, _react.useEffect)(() => {
    if (inspectClusterOnClick) {
      const inspect = evt => {
        const features = mapRef.current.queryRenderedFeatures(evt.point, {
          layers: [id]
        });
        const clusterId = features[0].properties.cluster_id;
        mapRef.current.getSource(source).getClusterExpansionZoom(clusterId, function (err, zoom) {
          if (err) throw err;
          mapRef.current.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        });
      };

      mapRef.current.on('click', id, inspect);
      return () => mapRef.current.off('click', id, inspect);
    }
  }, [inspectClusterOnClick, mapRef, source]);
  (0, _react.useEffect)(() => {
    if (onClick) {
      mapRef.current.on('click', id, onClick);
      return () => {
        mapRef.current.off('click', id, onClick);
      };
    }

    return;
  }, [onClick, mapRef]);
  (0, _react.useEffect)(() => {
    if (onDblClick) {
      mapRef.current.on('click', id, onDblClick);
      return () => {
        mapRef.current.off('click', id, onDblClick);
      };
    }

    return;
  }, [onDblClick, mapRef]);
  (0, _react.useEffect)(() => {
    if (onRightClick) {
      mapRef.current.on('click', id, onRightClick);
      return () => {
        mapRef.current.off('click', id, onRightClick);
      };
    }

    return;
  }, [onRightClick, mapRef]);
  (0, _react.useEffect)(() => {
    if (onClick || onDblClick || onRightClick || inspectClusterOnClick) {
      const makePointer = () => mapRef.current.getCanvas().style.cursor = 'pointer';

      const resetPointer = () => mapRef.current.getCanvas().style.cursor = '';

      mapRef.current.on('mouseenter', id, makePointer);
      mapRef.current.on('mouseleave', id, resetPointer);
      return () => {
        mapRef.current.off('mouseenter', id, makePointer);
        mapRef.current.off('mouseleave', id, resetPointer);
      };
    }

    return;
  }, [onClick, onDblClick, onRightClick, inspectClusterOnClick, mapRef]);
  return null;
};

var _default = Layer;
exports.default = _default;