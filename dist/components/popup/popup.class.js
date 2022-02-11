"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPopup = void 0;

var _maplibreGl = _interopRequireDefault(require("maplibre-gl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createPopup = params => {
  const {
    text,
    html,
    coords,
    options
  } = params;
  const popup = new _maplibreGl.default.Popup(options).setLngLat(coords);

  if (text) {
    popup.setText(text);
  }

  if (html) {
    popup.setHTML(html);
  }

  return popup;
};

exports.createPopup = createPopup;