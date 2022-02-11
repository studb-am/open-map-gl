"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useImageIcon = void 0;

var _react = require("react");

const useImageIcon = (map, imageName, imageUrl) => {
  (0, _react.useEffect)(() => {
    if (map && map.current) {
      const createImage = () => {
        map.current.loadImage(imageUrl, function (error, image) {
          if (error) throw error;
          map.current.addImage(imageName, image);
        });
      };

      map.current.onLoad(createImage);
      return () => map.current.offLoad(createImage);
    }
  }, [map]);
};

exports.useImageIcon = useImageIcon;