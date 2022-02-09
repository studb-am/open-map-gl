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
* [Components Overview](#components-overview)
* [Map](#map)
    * [Map Properties](#map-properties)
    * [Map Usage](#map-usage)
    * [Map Methods](#map-methods)
* [Marker](#marker)
    * [Marker Properties](#marker-properties)
    * [Marker Usage](#marker-usage)
* [Popup](#popup)
    * [Popup Properties](#popup-properties)
    * [Popup Usage](#popup-usage)
* [Source](#source)
    * [Geojson Properties](#source-properties)
* [Layer](#layer)
    * [Symbol](#symbol)
    * [Line](#line)
    * [Circle](#circle)
* [Utilities](#utilities)

## Components Overview
The library currently supports the following components:
* **Map**, that is the map Container and holds all the objects that can be used as a children
* **Marker**, that let you show one or more markers on the map
* **Popup**, that can be opened (or closed) on the map
* **Source**, that let you load any type of source. Even though all the sources provided by maplibre are potentially available only the *geojson* one has currently been tested.
* **Layer**, that shows graphically the data present in a source, i.e. a geojson source. Even though all the layers provided by maplibre are potentially available, only the *point* and *line* have currently been tested.

## Map
### Map Properties
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
The marker is the pin that can be available on the map. You can use the marker when you don't have so many points to render, otherwice is better to go to the `Symbol Layer`solution.

### Marker Properties
Below the properties that can be used with the Marker Component:

| **Property** | **Type** | **Description** | **Default Value** |
| --- | --- | --- | --- |
| anchor | string | A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker#setLngLat. Options are 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. | *`center`* |
| offset | [PointLike](https://maplibre.org/maplibre-gl-js-docs/api/geography/#pointlike) | The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up. | *`<none>`* |
| color | string | The color to use for the default marker if options.element is not provided. | `light blue`or `#3FB1CE` |
| scale | number | The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of 41px and a width of 27px. | 1 |
| draggable | boolean | A boolean indicating whether or not a marker is able to be dragged to a new position on the map. | `false` |
| clickTolerance | number | The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance. | `0` |
| rotation | number | The rotation angle of the marker in degrees, relative to its respective rotationAlignment setting. A positive value will rotate the marker clockwise. |`0` |
| pitchAlignment | string | map aligns the Marker to the plane of the map<ul><li>`viewport` aligns the Marker to the plane of the viewport</li><li>`auto` automatically matches the value of rotationAlignment</li></ul> | `auto`|
| rotationAlignment | string | map aligns the Marker's rotation relative to the map, maintaining a bearing as the map rotates<ul><li>`viewport` aligns the Marker's rotation relative to the viewport, agnostic to map rotations</li><li>`auto` is equivalent to viewport</li></ul> | `auto` | 
| coords | [latLng like](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatlike) | Array of coordinates where the marker will point at (longitude first) | `[0,0]` |
| popup | popup object created with [createPopup]() function | This property can be used if we want to add a popup on a marker | `<none>`|
| onDrag | function | action that is fired once the marker is being dragged. The function inherit an `event` property as parameter where there are important info that might be used, such as the latitude and longitude of the current drag position | `<none>`|
| onDragStart | function | action that is fired once the marker has been started to drag. The function inherit an `event` property as parameter where there are important info that might be used, such as the latitude and longitude of the start position before dragging | `<none>`|
| onDragEnd | function | action that is fired once the marker has been stopped to drag. The function inherit an `event` property as parameter where there are important info that might be used, such as the latitude and longitude of the arrival position after dragging | `<none>`|

### Marker Usage
The basic usage of the marker will also show the marker creation with the add on of the popup:

```jsx
import React from 'react';
import { Map, Marker, createPopup, Popup } from 'open-map-gl';

const App = () => {

    const popup = createPopup({
        coords: [7, 45],
        options: {
            offset: 25
        },
        text: "This is an example of popup"
    })

    return <React.Fragment>
        <Map
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
        >
            <Marker
                coords={[7, 45]}
                popup={popup}
                onDragEnd={evt => console.log(evt.target)}
            />
        </Map>
    </React.Fragment>
}

export default App;
```

## Popup
### Popup Properties
Below the properties that can be used with the Popup Component:

| **Property** | **Type** | **Description** | **Default Value** |
| --- | --- | --- | --- |
| closeButton | boolean | If true, a close button will appear in the top right corner of the popup. | `true` |
| closeOnLink | boolean | If true, the popup will closed when the map is clicked. | `true` |
| closeOnMove | boolean | If true, the popup will closed when the map moves. | `false` |
| focusAfterOpen | boolean | If true, the popup will try to focus the first focusable element inside the popup. | `true` |
| anchor | string | A string indicating the part of the Popup that should be positioned closest to the coordinate set via [Popup#setLngLat](https://maplibre.org/maplibre-gl-js-docs/api/markers/#popup#setlnglat). Options are 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. If unset the anchor will be dynamically set to ensure the popup falls within the map container with a preference for 'bottom'. | `bottom` |
| offset | number or [PointLike](https://maplibre.org/maplibre-gl-js-docs/api/geography/#pointlike) or Object | A pixel offset applied to the popup's location specified as:<ul><li>a single number specifying a distance from the popup's location</li><li>a PointLike specifying a constant offset</li><li>an object of Points specifing an offset for each anchor position</li></ul>Negative offsets indicate left and up. | `<none>` |
| className | string | Space-separated CSS class names to add to popup container | `<none>` |
| maxWidth | string | A string that sets the CSS property of the popup's maximum width, eg '300px' . To ensure the popup resizes to fit its content, set this property to 'none' . Available values can be found at Mozilla [doc](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) | `240px` |
| coords | [latLng like](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatlike) | Array of coordinates where the marker will point at (longitude first) | `[0,0]` |
| text | string | A non required property that can be set if we want to add a text to the created popup | `<none>` |
| html | HTML element | Instead of the text, we can think about using the HTML sintax to display web content in the popup itself | `<none>` |
| onOpen | function | This function is triggered once the popup opens | `<none>` |
| onClose | function | This function is triggered once the popup closes | `<none>` |

### Popup Usage
A basic example to show a popup direcly visible on the map once the app start:

```jsx
import React from 'react';
import { Map, Marker, createPopup, Popup } from 'open-map-gl';

const App = () => {

    return <React.Fragment>
        <Map
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
        >
            <Popup 
                coords={[7, 45]}
                options={{
                    maxWidth: 100,
                    offset: 50
                }}
                text="This is another example"
            />
        </Map>
    </React.Fragment>
}

export default App;
```

## Source
A source can be used in order to load on the map data, image, videos or canvas. Note that, even though the usage of other things out of data might work, those features haven't been tested yet and the only tested one is the `geojson` type.

### Geojson Properties
Below are stated all the properties that can be used once invoking a Source component of geojson. The default properties that can be applied to the geojson are available in the maplibre official [doc](https://maplibre.org/maplibre-gl-js-docs/style-spec/sources/#geojson). An additional property that is needed for the geojson is the `id` that is used in order to uniquely identify a source: it's important to remember to add this field once a Source component is declared and if you have more than one source in the code to create different id, otherwise it will be rendered only the first one (in order to see the second with the same name you should unmount the previous source first). Since a source does not show anything without layers the usage example will be done on the layer section.

## Layer
The layer is one or more graphical representation of the source data. There are several layers that can be used and more than one layer can be used in order to differently show cluster of data in the source itself. There are several properties that belongs to each layer, independently from the type:

* **id**, it represents the unique layer ID (the concept about unique ID for each layer is the same as per the source).
* **beforeId**, if one or more layer overlaps, it can be useful to render a specific layer before another one, in order to manually decide which come upon and below (generally speaking React will render from top to bottom so if you don't set this property than the last written will be upon).
* **source**, it states the name of source where the layer belongs to.
* **type**, it selects the graphical type of the layer, that can be `symbol`, `line`, `circle`, `fill`.
* **inspectClusterOnClick**, a boolean value that let the user to click and drill down a cluster to every single point. This feature can be used only if the cluster function has been enabled in the Source component.

Let's have a look at all the specific properties of each layer type available.

### Symbol
This is the layer that is applied to points or line space application (if we want to show symbols on the line to be applied regularly at a specified distance) and shows on the map small images or icons. A symbol can be retried from backend info if those are available at backend side or can be created directly on the frontend by using the [useImageIcon](#useImageIcon) hook coming together with this library.

Further details on the property that can be used are available at the maplibre official [doc](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#symbol).
A usage example of the symbol appliacation

```jsx
import React, {useRef} from 'react';
import { Map, Source, Layer, useImageIcon } from 'open-map-gl';

const DUMMY_POINTS = {...} //a geojson object: it might be a single feature or a feature collection

const App = () => 

    const _map = useRef();
    useImageIcon(_map, 'test-icon', 'https://maplibre.org/maplibre-gl-js-docs/assets/osgeo-logo.png'); //the utils that let's you load images directly from frontend

    return <Map
        ref={_map}
        //...map properties...//
        >
        <Source
            id="source-test"
            type="geojson"
            data={DUMMY_POINTS}
        >
            <Layer 
                id="symbol-to-test"
                type="symbol"
                source="source-test"
                layout={{
                    'icon-image': 'test-icon',
                    'icon-size': 1.5
                }}    
            />
        </Source>
    </Map>
}

export default App;
```

### Circle
This is another representation of the points that provider a circle with color, radius, and other properties. An interesting usage can be done for the cluster data, once enabling the feature of the cluster from the source. In this case, we will see at certain zoom an aggregation of data with the count of point belonging to each cluster.

Further details on the property that can be used are available at the maplibre official [doc](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle).

A usage example of the circle:

```jsx
import React, {useState} from 'react';
import { Map, Source, Layer } from 'open-map-gl';

const App = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('...') //the link where you have data on DB
            .then(response => response.json())
            .then(newData => setData(newData[0]))
            .catch(err => console.error('Error on fetch', err.message));
    }, []);

    return <Map
        //...map properties...//
    >
        <Source
            id="source-test"
            type="geojson"
            data={data}
        >
            <Layer
                id='layer-circle'
                type='circle'
                source='source-test'
                filter={['!=', 'isSelected', true]}
                paint={{
                    'circle-radius': 10,
                    'circle-color': '#B42222'
                }}
            />
            <Layer
                id='layer-circle-2'
                type='circle'
                source='source-test'
                filter={['==', 'isSelected', true]}
                paint={{
                    'circle-radius': 10,
                    'circle-color': '#B4FFFF'
                }}
            />
        </Source>
    </Map>
}

export default App;
```

### Line
The line layer is used once we have linestring to show in the geojson object. 

Further details on the line properties are available at the maplibre official [doc](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line).

An usage example of the line:

```jsx
import React from 'react';
import { Map, Source, Layer } from '../lib';

const DUMMY_LINES = { /*... your base here...*/ };

const App = () => {

    return <Map
       //...map properties...//
    >
        <Source
            id="source-test"
            type="geojson"
            data={DUMMY_LINES}
        >
            <Layer
                id="symbol"
                type="line"
                source="source-test"
                layout={{
                    'line-join': 'round',
                    'line-cap': 'round'
                }}
                paint={{
                    'line-color': '#C33A1D',
                    'line-width': 3
                }}
            />
        </Source>
    </Map>

}

export default App;
```

## Utilities
This section provides helpful function or hook function to be used in order to facilitate the usage of the whole library.

### useImageIcon
This is a hook function that help you create a symbol icon on frontend directly. It might be useful once backend Sprite are not configured yet or you just have to use one single image (for multiple image usage is of course faster have the image on backend side). This hook accept the following parameters:
* **map**, it's the ref object of the map itself. In order to use this function, it's important to create a reference of the map
* **imageName**, the name we will call in the layer properties the symbol
* **imageUrl**, the Url where the image is available. This can be a URL or a React loaded png image on the project itself

In order to see how to use it please see the example in the [Symbol](#symbol) section.



<p align="right"><i>© studb25</i></p>