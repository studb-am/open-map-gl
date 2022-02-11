"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _maplibreGl = _interopRequireDefault(require("maplibre-gl"));

var _map = require("./map.context");

const _excluded = ["onClick", "onRightClick", "onDblClick", "onLoad", "onError", "onDrag", "onDragStart", "onDragEnd", "accessToken", "mapContainerCssStyle", "mapCssStyle", "navigationControl", "children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Map = (props, ref) => {
  const {
    onClick,
    onRightClick,
    onDblClick,
    onLoad,
    onError,
    onDrag,
    onDragStart,
    onDragEnd,
    accessToken,
    mapContainerCssStyle,
    mapCssStyle,
    navigationControl,
    children
  } = props,
        options = _objectWithoutProperties(props, _excluded);

  const [center] = (0, _react.useState)(options.center);
  options.center = center;
  const [zoom] = (0, _react.useState)(options.zoom);
  options.zoom = zoom;
  const mapContainer = (0, _react.useRef)(null);
  const mapRef = (0, _react.useRef)(null);

  const addTokenToUrl = url => {
    return {
      url: "".concat(url, "?access_token=").concat(accessToken)
    };
  }; //***************************Property to be used by the ref father once invoked*******************************************/


  (0, _react.useImperativeHandle)(ref, () => {
    return {
      addImage: (id, image, options) => mapRef.current.addImage(id, image, options),
      flyTo: (options, eventData) => mapRef.current.flyTo(options, eventData),
      fitBounds: (bounds, options, eventData) => mapRef.current.fitBounds(bounds, options, eventData),
      fitScreenToCoordinates: (p0, p1, bearing, options, eventData) => mapRef.current.fitScreenToCoordinates(p0, p1, bearing, options, eventData),
      getBearing: () => mapRef.current.getBearing(),
      getBounds: () => mapRef.current.getBounds(),
      getCanvas: () => mapRef.current.getCanvas(),
      getCanvasContainer: () => mapRef.current.getCanvasContainer(),
      getCenter: () => mapRef.current.getCenter(),
      getContainer: () => mapRef.current.getContainer(),
      getFeatureState: feature => mapRef.current.getFeatureState(feature),
      getFilter: layerId => mapRef.current.getFilter(layerId),
      getLayer: id => mapRef.current.getLayer(id),
      getLayoutProperty: (layerId, name) => mapRef.current.getLayoutProperty(layerId, name),
      getLight: () => mapRef.current.getLight(),
      getMaxBounds: () => mapRef.current.getMaxBounds(),
      getMaxPitch: () => mapRef.current.getMaxPitch(),
      getMaxZoom: () => mapRef.current.getMaxZoom(),
      getMinPitch: () => mapRef.current.getMinPitch(),
      getMinZoom: () => mapRef.current.getMinZoom(),
      getPadding: () => mapRef.current.getPadding(),
      getPaintProperty: (layerId, name) => mapRef.current.getPaintProperty(layerId, name),
      getPitch: () => mapRef.current.getPitch(),
      getPixelRatio: () => mapRef.current.getPixelRatio(),
      getRenderWorldCopies: () => mapRef.current.getRenderWorldCopies(),
      getSource: id => mapRef.current.getSource(id),
      getStyle: () => mapRef.current.getStyle(),
      getZoom: () => mapRef.current.getZoom(),
      hasControl: control => mapRef.current.hasControl(control),
      hasImage: id => mapRef.current.hasImage(id),
      isMoving: () => mapRef.current.isMoving(),
      isRotating: () => mapRef.current.isRotating(),
      isSourceLoaded: id => mapRef.current.isSourceLoaded(id),
      isStyleLoaded: () => mapRef.current.isStyleLoaded(),
      isZooming: () => mapRef.current.isZooming(),
      jumpTo: (options, eventData) => mapRef.current.jumpTo(options, eventData),
      listImages: () => mapRef.current.listImages(),
      loaded: () => mapRef.current.loaded(),
      loadImage: (url, callback) => mapRef.current.loadImage(url, callback),
      moveLayer: (id, beforeId) => mapRef.current.moveLayer(id, beforeId),
      offLoad: func => mapRef.current.off('load', func),
      onLoad: func => mapRef.current.on('load', func),
      panBy: (offset, options, eventData) => mapRef.current.panBy(offset, options, eventData),
      panTo: (lnglat, options, eventData) => mapRef.current.panTo(lnglat, options, eventData),
      project: lnglat => mapRef.current.project(lnglat),
      queryRenderedFeatures: (geometry, options) => mapRef.current.queryRenderedFeatures(geometry, options),
      querySourceFeatures: (sourceId, parameters) => mapRef.current.querySourceFeatures(sourceId, parameters),
      redraw: () => mapRef.current.redraw(),
      resetNorth: (options, eventData) => mapRef.current.resetNorth(options, eventData),
      resetNorthPintch: (options, eventData) => mapRef.current.resetNorthPintch(options, eventData),
      resize: eventData => mapRef.current.resize(eventData),
      rotateTo: (bearing, options, eventData) => mapRef.current.rotateTo(bearing, options, eventData),
      setBearing: (bearing, eventData) => mapRef.current.setBearing(bearing, eventData),
      setCenter: (center, eventData) => mapRef.current.setCenter(center, eventData),
      setFeatureState: (feature, state) => mapRef.current.setFeatureState(feature, state),
      setFilter: function setFilter(layerId, filter) {
        let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return mapRef.current.setFilter(layerId, filter, options);
      },
      setLayerZoomRange: (layerId, minzoom, maxzoom) => mapRef.current.setLayerZoomRange(layerId, minzoom, maxzoom),
      setLayoutProperty: function setLayoutProperty(layerId, name, value) {
        let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        return mapRef.current.setLayoutProperty(layerId, name, value, options);
      },
      setLight: function setLight(light) {
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return mapRef.current.setLight(light, options);
      },
      setMaxBounds: bounds => mapRef.current.setMaxBounds(bounds),
      setMaxPitch: maxPitch => mapRef.current.setMaxPitch(maxPitch),
      setMaxZoom: maxZoom => mapRef.current.setMaxZoom(maxZoom),
      setMinPitch: minPitch => mapRef.current.setMinPitch(minPitch),
      setMinZoom: minZoom => mapRef.current.setMinZoom(minZoom),
      setPadding: (padding, eventData) => mapRef.current.setPadding(padding, eventData),
      setPaintProperty: function setPaintProperty(layerId, name, value) {
        let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        return mapRef.current.setPaintProperty(layerId, name, value, options = {});
      },
      setPitch: (pitch, eventData) => mapRef.current.setPitch(pitch, eventData),
      setPixelRatio: pixelRatio => mapRef.current.setPixelRatio(pixelRatio),
      setStyle: (style, options) => mapRef.current.setStyle(style, options),
      setZoom: (zoom, eventData) => mapRef.current.setZoom(zoom, eventData),
      updateImage: (id, image) => mapRef.current.updateImage(id, image),
      zoomIn: (options, eventData) => mapRef.current.zoomIn(options, eventData),
      zoomOut: (options, eventData) => mapRef.current.zoomOut(options, eventData),
      zoomTo: (zoom, options, eventData) => mapRef.current.zoomTo(zoom, options, eventData)
    };
  }); //***************************Property to be used by the ref father once invoked*******************************************/
  //***************************Events and listener*******************************************/

  (0, _react.useEffect)(() => {
    if (mapRef && mapRef.current && onClick) mapRef.current.on('click', onClick);
    return () => mapRef.current.off('click', onClick);
  }, [mapRef, onClick]);
  (0, _react.useEffect)(() => {
    if (mapRef && mapRef.current && onRightClick) mapRef.current.on('contextmenu', onRightClick);
    return () => mapRef.current.off('contextmenu', onRightClick);
  }, [mapRef, onRightClick]);
  (0, _react.useEffect)(() => {
    if (mapRef && mapRef.current && onDblClick) mapRef.current.on('dblclick', onDblClick);
    return () => mapRef.current.off('dblclick', onDblClick);
  }, [mapRef, onDblClick]);
  (0, _react.useEffect)(() => {
    if (mapRef && mapRef.current && onDrag) mapRef.current.on('drag', onDrag);
    return () => mapRef.current.off('dblclick', onDrag);
  }, [mapRef, onDrag]);
  (0, _react.useEffect)(() => {
    if (mapRef && mapRef.current && onDragStart) mapRef.current.on('dragstart', onDragStart);
    return () => mapRef.current.off('dblclick', onDragStart);
  }, [mapRef, onDragStart]);
  (0, _react.useEffect)(() => {
    if (mapRef && mapRef.current && onDragEnd) mapRef.current.on('dragend', onDragEnd);
    return () => mapRef.current.off('dblclick', onDragEnd);
  }, [mapRef, onDragEnd]);
  (0, _react.useEffect)(() => {
    if (mapRef && mapRef.current && onError) mapRef.current.on('error', onError);
    return () => mapRef.current.off('error', onError);
  }, [mapRef, onError]);
  (0, _react.useEffect)(() => {
    if (mapRef && mapRef.current && onLoad) mapRef.current.on('load', onLoad);
    return () => mapRef.current.off('load', onLoad);
  }, [mapRef, onLoad]); //***************************Events and listener*******************************************/

  (0, _react.useLayoutEffect)(() => {
    if (mapRef.current) return;
    mapRef.current = new _maplibreGl.default.Map(_objectSpread(_objectSpread({}, options), {}, {
      transformRequest: accessToken ? addTokenToUrl : null,
      container: mapContainer.current
    }));

    if (navigationControl !== "hidden") {
      mapRef.current.addControl(new _maplibreGl.default.NavigationControl(), navigationControl);
    }
  }, []);
  (0, _react.useEffect)(() => {
    return () => mapRef.current.remove();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_map.MapContext.Provider, {
    value: {
      mapRef
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: mapContainerCssStyle || {}
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: mapContainer,
    style: mapCssStyle || {}
  }, children)));
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(Map);

exports.default = _default;