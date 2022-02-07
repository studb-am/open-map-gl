# Open Map GL

This library is a wrapper for the maplibre GL one and help you use the javascript GL as react components. The benefits of this library is that you can use any open GL map (i.e. the ones created with TileServer-GL or MapTiler-GL) that generates the style.json and the tileserver.

For further details about MapLibre look at the following links:
* [MapTiler, React, MapLibre integration](https://documentation.maptiler.com/hc/en-us/articles/4405444890897-How-to-display-MapLibre-GL-JS-map-using-React-JS)
* [MapLibre API docs](https://maplibre.org/maplibre-gl-js-docs/api/map/)

## Important Note
Please keep in account that at the moment the package is under development/testing so some features might not be available.

## Before you start
Please consider that in order to use mapLibre GL under the hood on your application, you need to copy and paste the following script tag below in the head tag of your index.html:

```html
<link href='https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css' rel='stylesheet' />
```

## Table of contents
* [Components](#components)
* [Map](#map)
    * [Properties](#properties)

## Components
The library currently supports the following components:
* **Map**, that is the map Container and holds all the objects that can be used as a children
* **Marker**, that let you show one or more markers on the map
* **Popup**, that can be opened (or closed) on the map
* **Source**, that let you load any type of source. Even though all the sources provided by maplibre are potentially available only the *geojson* one has currently been tested.
* **Layer**, that shows graphically the data present in a source, i.e. a geojson source. Even though all the layers provided by maplibre are potentially available, only the *point* and *line* have currently been tested.

### Map Component
#### Properties
Below the properties that can be used with the Map Component:

| **Property** | **Type** | **Description** | **Default Values** |
| --- | --- | --- | --- |
| ref | reference Variable | This property is used in order to link the map itself with all the events that can be called by this variable as functions (for futher details on this please read the *Event functions* section below). If you want to use on or more methods of the map, this property is required to be set. | *null* |
| minZoom | number | The minimum zoom level of the map (0-24). If not set, then the minimum zoom available is 0 | *0* |
| maxZoom | number | The maximum zoom level of the map (0-24). If not set, then the maximum zoom available is 24 | *22* |
| minPitch | number | The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. | *0* |
| maxPitch | number | The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. | *60* |
| interactive | boolean | If false, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction. | *true* |
| bearingSnap | number | The threshold, measured in degrees, that determines when the map's bearing will snap to north. For example, with a bearingSnap of 7, if the user rotates the map within 7 degrees of north, the map will automatically snap to exact north. | *7* |
| pitchWidthRotate | boolean | If false, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled. | *true* |
| clickTolerance | number | The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag). | *3* |
| attributionControl | boolean | If true, an AttributionControl will be added to the map. | *true* |
| customAttribution | string (or array of strings) | String or strings to show in an AttributionControl . Only applicable if options.attributionControl is true. | *null* |
| logoPosition | sting | A string representing the position of the MapLibre wordmark on the map. Valid options are top-left , top-right , bottom-left , bottom-right. | *bottom-left* |
| refreshExpiredTiles | boolean | If false, the map won't attempt to re-request tiles once they expire per their HTTP cacheControl / expires headers. | *true* |
| maxBounds | [LngLatBounds](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatboundslike) | If set, the map will be constrained to the given bounds. | *null* |
| scrollZoom | boolean (or object) | If true, the "scroll to zoom" interaction is enabled. An Object value is passed as options to [ScrollZoomHandler#enable](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#scrollzoomhandler#enable). | *true* |
| boxZoom | boolean | If true , the "box zoom" interaction is enabled (see [BoxZoomHandler](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#boxzoomhandler)). | *true* |
| dragRotate | boolean | If true, the "drag to pan" interaction is enabled. An Object value is passed as options to [DragPanHandler#enable](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#dragpanhandler#enable). | *true* |
| keyboard | boolean | If true, keyboard shortcuts are enabled (see [KeyboardHandler](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#keyboardhandler)). | *true* |
| doubleClickZoom | boolean | If true, the "double click to zoom" interaction is enabled (see [DoubleClickZoomHandler](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#doubleclickzoomhandler)). | *true* |
| touchZoomRotate | boolean | If true, the "pinch to rotate and zoom" interaction is enabled. An Object value is passed as options to [TouchZoomRotateHandler#enable](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#touchzoomrotatehandler#enable). | *true* |
| touchPitch | boolean | If true, the "drag to pitch" interaction is enabled. An Object value is passed as options to [TouchPitchHandler#enable](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#touchpitchhandler#enable). | *true* |
| trackResize | boolean | If true, the map will automatically resize when the browser window resizes. | *true* |
| center | [LngLatLike](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatlike) | The initial geographical centerpoint of the map. If center is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to [0, 0] Note: MapLibre GL uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON. | *```[0,0]```* |
| zoom | number | The initial zoom level of the map. If zoom is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. | *0* |
| bearing | number | The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. | *0* |
| children | React Components | This is the native property that comes with React and let us convert the map Compnent from a self closing Map tag to a tag container. Expected children are the elements of the map | *undefined* |

#### Map Methods
In this section we are going to illustrate the methods that can be called by the map. In order to use any of these map events, it's important to use the ref property above to point the map with a React ref variable (useRef hook):

```
import React, { useRef } from 'react';
import { Map } from 'open-map-gl';

const App = () => {
    const _map = useRef();

    return <Map ref={_map}/>
}
```

| **Method** | **Description** | **Example** |
| --- | --- | --- |
| fitBounds | This property is similar with flyTo, but the difference is that we are not passing a center and a zoom, but a bounding box, so that center and zoom are retrieved under the hood. FitBounds accepts two params:<ul><li>**bbox**, that is an array of 2 coordinates (each is an array of longitude and latitude) respectively stating the north-east and south-west points</li><li>**options**, an array of properties, for example the *padding* that help creating a bbox with a padding that can be specified as a value, or as an object stating the bottom, top, left, right, as in the CSS property</li></ul> | ```_map.current.fitBounds([[7,45],[6,46]],{ padding: {top: 20, left: 20, right: 20, bottom: 20}})```|
| flyTo | When *flyTo* is invoked, then the map automatically flies to the specified position. FlyTo accepts two parameters:<ul><li>**center**, that is an array of coordinates, where the first one is the longitude, the second the latitude </li><li>**zoom**, the zoom index at which we want to migrate to the map</li>**speed**, the average speed of the animation, in relations with curve property. Default value 1.2<li>**curve**, it represents the zooming "curve" that occurs along the flight path. Default value 1.42</li></ul> | ```_map.current.flyTo({center: [7,46], zoom: 14})``` |
| getBounds | Returns a LngLat object with the 2 bounding box coordinates. The object has the property "_ne" and "_sw" (north-east and south-west). Each property is a LngLat object of coordinates, respectively with lng and lat props | ```const bounds = _map.current.getBounds();```
| getCenter | Returns the LngLat object of center coordinates | ```const { lng, lat } = _map.current.getCenter();``` |
| getZoom | Returns the number of the current zoom | ```const zoom = _map.current.getZoom();``` |

For further details about LngLat object and all the methods associated, please have a look at [LngLat section](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglat) in MapLibre GL Doc.

### Marker Component
#### Properties
Below the properties that can be used with the Marker Component:

| **Property** | **Type** | **Description** | **Required** |
| --- | --- | --- | --- |
| coords | object | This object stores the coordinates center where the marker is shown. It is composed by **lat** (the latitude coordinates) and **lng** (the longitude coordinates) | *true* |
| options | object | This contains all the options configuration of the marker. Possible values:<ul><li>**color**, represents the color of the marker itself</li><li>**draggable**, a boolean value that states if the marker can be draggable or not</li>
| onDragEnd | function | This function is triggered once the user stops dragging the marker on the map. Note: please use this function only when options.draggable is *true* | *false* |



<p align="right"><i>© studb25</i></p>