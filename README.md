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
    * [Properties](#map-properties)
    * [Map Usage](#map-usage)
    * [Map Methods](#map-methods)

## Components
The library currently supports the following components:
* **Map**, that is the map Container and holds all the objects that can be used as a children
* **Marker**, that let you show one or more markers on the map
* **Popup**, that can be opened (or closed) on the map
* **Source**, that let you load any type of source. Even though all the sources provided by maplibre are potentially available only the *geojson* one has currently been tested.
* **Layer**, that shows graphically the data present in a source, i.e. a geojson source. Even though all the layers provided by maplibre are potentially available, only the *point* and *line* have currently been tested.

## Map
### Properties
Below the properties that can be used with the Map Component:

| **Property** | **Type** | **Description** | **Default Values** |
| --- | --- | --- | --- |
| ref | reference Variable | This property is used in order to link the map itself with all the events that can be called by this variable as functions (for futher details on this please read the *Event functions* section below). If you want to use on or more methods of the map, this property is required to be set. | *`null`* |
| minZoom | number | The minimum zoom level of the map (0-24). If not set, then the minimum zoom available is 0 | *`0`* |
| maxZoom | number | The maximum zoom level of the map (0-24). If not set, then the maximum zoom available is 24 | *`22`* |
| minPitch | number | The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. | *`0`* |
| maxPitch | number | The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. | *`60`* |
| interactive | boolean | If false, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction. | *`true`* |
| bearingSnap | number | The threshold, measured in degrees, that determines when the map's bearing will snap to north. For example, with a bearingSnap of 7, if the user rotates the map within 7 degrees of north, the map will automatically snap to exact north. | *`7`* |
| pitchWidthRotate | boolean | If false, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled. | *`true`* |
| clickTolerance | number | The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag). | *`3`* |
| attributionControl | boolean | If true, an AttributionControl will be added to the map. | *`true`* |
| customAttribution | string (or array of strings) | String or strings to show in an AttributionControl . Only applicable if options.attributionControl is true. | *`null`* |
| logoPosition | sting | A string representing the position of the MapLibre wordmark on the map. Valid options are top-left , top-right , bottom-left , bottom-right. | *bottom-left* |
| refreshExpiredTiles | boolean | If false, the map won't attempt to re-request tiles once they expire per their HTTP cacheControl / expires headers. | *`true`* |
| maxBounds | [LngLatBounds](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatboundslike) | If set, the map will be constrained to the given bounds. | *`null`* |
| scrollZoom | boolean (or object) | If true, the "scroll to zoom" interaction is enabled. An Object value is passed as options to [ScrollZoomHandler#enable](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#scrollzoomhandler#enable). | *`true`* |
| boxZoom | boolean | If true , the "box zoom" interaction is enabled (see [BoxZoomHandler](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#boxzoomhandler)). | *`true`* |
| dragRotate | boolean | If true, the "drag to pan" interaction is enabled. An Object value is passed as options to [DragPanHandler#enable](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#dragpanhandler#enable). | *`true`* |
| keyboard | boolean | If true, keyboard shortcuts are enabled (see [KeyboardHandler](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#keyboardhandler)). | *`true`* |
| doubleClickZoom | boolean | If true, the "double click to zoom" interaction is enabled (see [DoubleClickZoomHandler](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#doubleclickzoomhandler)). | *`true`* |
| touchZoomRotate | boolean | If true, the "pinch to rotate and zoom" interaction is enabled. An Object value is passed as options to [TouchZoomRotateHandler#enable](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#touchzoomrotatehandler#enable). | *`true`* |
| touchPitch | boolean | If true, the "drag to pitch" interaction is enabled. An Object value is passed as options to [TouchPitchHandler#enable](https://maplibre.org/maplibre-gl-js-docs/api/handlers/#touchpitchhandler#enable). | *`true`* |
| trackResize | boolean | If true, the map will automatically resize when the browser window resizes. | *`true`* |
| center | [LngLatLike](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatlike) | The initial geographical centerpoint of the map. If center is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to [0, 0] Note: MapLibre GL uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON. | *`[0,0]`* |
| zoom | number | The initial zoom level of the map. If zoom is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. | *`0`* |
| bearing | number | The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. | *`0`* |
| pitch | number | The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If pitch is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. | *`0`* |
| bounds | [LngLatBounds](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatboundslike) | The initial bounds of the map. If bounds is specified, it overrides center and zoom constructor options. | 
| fitBoundsOptions | object | A [Map#fitBounds](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#fitbounds) options object to use only when fitting the initial bounds provided above. | *`<none>`* |
| renderWorldCopies | boolean | If true, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to false:<ul><li>When the map is zoomed out far enough that a single representation of the world does not fill the map's entire container, there will be blank space beyond 180 and -180 degrees longitude.</li><li>Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the map and the other on the left edge of the map) at every zoom level.</li></ul> | *`true`* |
| maxTileSizeCache | number | The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport.| *`null`* |
| localIdeographFontFamily | string | Defines a CSS font-family for locally overriding generation of glyphs in the 'CJK Unified Ideographs', 'Hiragana', 'Katakana' and 'Hangul Syllables' ranges. In these ranges, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold). Set to false , to enable font settings from the map's style for these glyph ranges. The purpose of this option is to avoid bandwidth-intensive glyph server requests. (See [Use locally generated ideographs](https://maplibre.org/maplibre-gl-js-docs/example/local-ideographs/)) | *sans-serif* |
| collectResourceTiming | boolean | If true, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a resourceTiming property of relevant data events. | *`false`* |
| fadeDuration | number | Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading. | *300* |
| crossSourceCollisions | boolean | If true, symbols from multiple sources can collide with each other during collision detection. If false, collision detection is run separately for the symbols in each source. | *`true`* |
| locale | object | A patch to apply to the default localization table for UI strings, e.g. control tooltips. The locale object maps namespaced UI string IDs to translated strings in the target language; see src/ui/default_locale.js for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table). |
| pixelRatio | number | The pixel ratio. The canvas' width attribute will be container.clientWidth * pixelRatio and its height attribute will be container.clientHeight * pixelRatio . Defaults to devicePixelRatio if not specified. | *`<none>`* |
| navigationControl | string | It represents the control used in order to zoom in, zoom out or rotate the map. Valid values to specify:<ul><li>top-left</li><li>top-right</li><li>bottom-left</li><li>bottom-right</li><li>hidden, once the navigation control is supposed to not be shown (this value is also the default one in case this property is not specified)</li> | *`hidden`* |
| mapContainerCssStyle | object | In line style object where the needed css properties will be applied to the *div* that contains the map | *`null`* |
| mapCssStyle | object | In line style object where the needed css properties will be applied to the *div* of the map | *`null`* |
| accessToken | string | If your backend is configured to accept an accessToken, then it will be appended as GET request to query parameters (the variable to be used is `access_token`). If not provided, then no token will be applied to the api calls | *`null`* |
| onClick | function | if valorized, this property will fire a function that will react to the click event. The property get as input function an event that stores several information for example the clicked location coordinates | *`<none>`* |
| onRightClick | function | If valorized, this property will fire a function that will react to the right click event. The property get as input function an event that stores several information for example the clicked location coordinates | *`<none>`* |
| onDblClick | function | If valorized, this property will fire a function that will react to the double click event. The property get as input function an event that stores several information for example the clicked location coordinates | *`<none>`* |
| onLoad | function | This property react to the map loading event | *`<none>`* |
| onError | function | This property react to the map error event | *`<none>`* |
| onDrag | function | This property react to the map dragging event | *`<none>`* |
| onDragStart | function | This property react once the map begins being dragged | *`<none>`* |
| onDragEnd | function | This property react once the map stops being dragged | *`<none>`* |
| children | React Components | This is the native property that comes with React and let us convert the map Compnent from a self closing Map tag to a tag container. Expected children are the elements of the map | *`<none>`* |

### Map Usage
In this section we are going to illustrate the methods that can be called by the map. In order to use any of these map events, it's important to use the ref property above to point the map with a React ref variable (useRef hook):

```jsx
import React, { useRef } from 'react';
import { Map } from 'open-map-gl';

const App = () => {
    const _map = useRef();

    return <Map 
        ref={_map} 
        style="..." //enter your style json here
        accessToken="..." //use the access token only if your backend will require it: please remember that at the moment solution will manage only get requests
        mapCssStyle={{
            position: 'absolute',
            width: '100%',
            height: '100%',
        }}
        mapContainerCssStyle={{
            position: 'relative',
            width: '100%',
            height: 'calc(100vh - 77px)'
        }}
    />
}
```
### Map Methods
Map Methods are important in order to make actions from the map within the application code. In order to call map function it's required to provide a map with a reference (see the example above on how to use a ref hook). An example of how to use them:

```jsx
import React, {useEffect} from 'react';
...
//after the renderization this is a demo to see how the camera flies to after two seconds of the map renderization
useEffect(() => {
    setTimeout(() => {
        _map.current.flyTo({center: [0,0], zoom: 9});
    }, 2000)
}, []);
```
**Available methods**:
* [flyTo(option, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#flyto-parameters)
* [fitBounds(bounds, options?, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#fitbounds-parameters)
* [fitScreenToCoordinates(p0, p1, bearing, options?, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#fitscreencoordinates-parameters)
* [getBearing()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getbearing-returns)
* [getBounds()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getbounds-returns)
* [getCanvas()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getcanvas-returns)
* [getCanvasContainer()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getcanvascontainer-returns)
* [getCenter()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getcenter-returns)
* [getContainer()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getcontainer-returns)
* [getFilter(layerId)](https://maplibre.org/maplibre-gl-js-docs/api/map/#getfilter-parameters)
* [getLayer(id)](https://maplibre.org/maplibre-gl-js-docs/api/map/#getlayer-parameters)
* [getLayoutProperty(layerId, name)](https://maplibre.org/maplibre-gl-js-docs/api/map/#getlayoutproperty-parameters)
* [getLight()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getlight-returns)
* [getMaxBounds()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getmaxbounds-returns)
* [getMaxPitch()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getmaxpitch-returns)
* [getMaxZoom()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getmaxzoom-returns)
* [getMinPitch()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getminpitch-returns)
* [getMinZoom()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getminzoom-returns)
* [getPadding()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getpadding-returns)
* [getPaintProperty(layerId, name)](https://maplibre.org/maplibre-gl-js-docs/api/map/#getpaintproperty-parameters)
* [getPitch()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getpitch-returns)
* [getPixelRatio()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getpixelratio-returns)
* [getRenderWorldCopies()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getrenderworldcopies-returns)
* [getSource(id)](https://maplibre.org/maplibre-gl-js-docs/api/map/#getsource-parameters)
* [getStyle()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getstyle-returns)
* [getZoom()](https://maplibre.org/maplibre-gl-js-docs/api/map/#getzoom-returns)
* [hasControl(control)](https://maplibre.org/maplibre-gl-js-docs/api/map/#hascontrol-parameters)
* [hasImage(id)](https://maplibre.org/maplibre-gl-js-docs/api/map/#hasimage-parameters)
* [isMoving()](https://maplibre.org/maplibre-gl-js-docs/api/map/#ismoving-returns)
* [isRotating()](https://maplibre.org/maplibre-gl-js-docs/api/map/#isrotating-returns)
* [isSourceLoaded(id)](https://maplibre.org/maplibre-gl-js-docs/api/map/#issourceloaded-parameters)
* [isStyleLoaded()](https://maplibre.org/maplibre-gl-js-docs/api/map/#isstyleloaded-returns)
* [isZooming()](https://maplibre.org/maplibre-gl-js-docs/api/map/#iszooming-returns)
* [jumpTo(options, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#jumpto-parameters)
* [listImages()](https://maplibre.org/maplibre-gl-js-docs/api/map/#listimages-returns)
* [loaded()](https://maplibre.org/maplibre-gl-js-docs/api/map/#loaded-returns)
* [moveLayer(id, beforeId?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#movelayer-parameters)
* [panBy(offset, options?, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#panby-parameters)
* [panTo(lngLat, options? eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#panto-parameters)
* [project(lngLat)](https://maplibre.org/maplibre-gl-js-docs/api/map/#project-parameters)
* [queryRenderedFeatures(geometry?, options?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#queryrenderedfeatures-parameters)
* [querySourceFeatures(sourceId, parameters?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#querysourcefeatures-parameters)
* [redraw()](https://maplibre.org/maplibre-gl-js-docs/api/map/#redraw-returns)
* [resetNorth(options?, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#resetnorth-parameters)
* [resetNorthPitch(options?, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#resetnorthpitch-parameters)
* [resize(eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#resize-parameters)
* [rotateTo(bearing, options?, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#rotateto-parameters)
* [setBearing(bearing, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setbearing-parameters)
* [setCenter(center, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setcenter-parameters)
* [setFeatureState(feature, state)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setfeaturestate-parameters)
* [setFilter(layerId, filter, options={})](https://maplibre.org/maplibre-gl-js-docs/api/map/#setfilter-parameters)
* [setLayerZoomRange(layerId, minzoom, maxzoom)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setlayerzoomrange-parameters)
* [setLayoutProperty(layerId, name, value, options={})](https://maplibre.org/maplibre-gl-js-docs/api/map/#setlayoutproperty-parameters)
* [setLight(light, options={})](https://maplibre.org/maplibre-gl-js-docs/api/map/#setlight-parameters)
* [setMaxBounds(bounds)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setmaxbounds-parameters)
* [setMaxPitch(maxPitch)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setmaxpitch-parameters)
* [setMaZoom(maxZoom)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setmaxzoom-parameters)
* [setMinPitch(minPitch)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setminpitch-parameters)
* [setMinZoom(minZoom)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setminzoom-parameters)
* [setPadding(padding, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setpadding-parameters)
* [setPaintProperty(layerId, name, value, options={})](https://maplibre.org/maplibre-gl-js-docs/api/map/#setpaintproperty-parameters)
* [setPitch(pitch, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setpitch-parameters)
* [setPixelRatio(pixelRatio)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setpixelratio-parameters)
* [setStyle(style, options?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setstyle-parameters)
* [setZoom(zoom, eventData?)](https://maplibre.org/maplibre-gl-js-docs/api/map/#setzoom-parameters)
* [zoomIn(options?, eventData)](https://maplibre.org/maplibre-gl-js-docs/api/map/#zoomin-parameters)
* [zoomOut(options?, eventData)](https://maplibre.org/maplibre-gl-js-docs/api/map/#zoomout-parameters)
* [zoomTo(zoom, options?, eventData)](https://maplibre.org/maplibre-gl-js-docs/api/map/#zoomto-parameters)



## Marker Component
### Properties
Below the properties that can be used with the Marker Component:

| **Property** | **Type** | **Description** | **Required** |
| --- | --- | --- | --- |
| coords | object | This object stores the coordinates center where the marker is shown. It is composed by **lat** (the latitude coordinates) and **lng** (the longitude coordinates) | *`true`* |
| options | object | This contains all the options configuration of the marker. Possible values:<ul><li>**color**, represents the color of the marker itself</li><li>**draggable**, a boolean value that states if the marker can be draggable or not</li>
| onDragEnd | function | This function is triggered once the user stops dragging the marker on the map. Note: please use this function only when options.draggable is *`true`* | *`false`* |



<p align="right"><i>© studb25</i></p>