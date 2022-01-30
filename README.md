# Open Map GL

This library is a wrapper for the maplibre GL one and help you use the javascript GL as react components. The benefits of this library is that you can use any open GL map (i.e. the ones created with TileServer-GL or MapTiler-GL) that generates the style.json and the tileserver.

For further details about MapLibre look at the following links:
* [MapTiler, React, MapLibre integration](https://documentation.maptiler.com/hc/en-us/articles/4405444890897-How-to-display-MapLibre-GL-JS-map-using-React-JS)
* [MapLibre API docs](https://maplibre.org/maplibre-gl-js-docs/api/map/)

## Important Note
Please keep in account that at the moment the package is under development/testing so not all the features are still available.
This is just the beginning!

## Before you start
Please consider that in order to use mapLibre GL under the hood on your application, you need to copy and paste the following script tag below in the head tag of your index.html:

    <link href='https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.css' rel='stylesheet' />

## Components
At the moment there are only two components available as a pilot:
* **Map**, that is the map Container and holds all the objects that can be used as a children
* **Marker**, this is the first and the last step created at the moment and let's you shows one or more markers on the map itself 

### Map Component
#### Properties
Below the properties that can be used with the Map Component:

| **Property** | **Type** | **Description** | **Required** |
| --- | --- | --- | --- |
| ref | reference Variable | This property is used in order to link the map itself with all the event that can be called by this variable as functions (for futher details on this please read the *Event functions* section below) | *false* |
| centerCoords | object | This is the object of the center coordinates of the map. It is composed by **lat** (the latitude coordinates) and **lng** (the longitude coordinates) | *true* |
| initialZoom | number | This is the initial value that we want to start the map with | *true* |
| mapStyle | string | It's tje style Url where the gl server map style is located | *true* |
| minZoom | number | It's the minimum level, in numbers, that the map is allowed to reach (if missing that the minimum is 1) | *false* |
| maxZoom | number | It's the maximum level, in numbers, that the map is allowed to reach (if missing that the maximum is 20) | *false* |
| mapClassName | string | It's the name of the class we want to associate to the map inside it's container. Note: please use a css to link to the file in order to define the properties of the class itself) | *false* |
| mapContainerClassName | string | It's the name of the class we want to associate to the container of the map (the one that occupies the space in the browser page). Note: please use a css to link to the file in order to define the properties of the class itself) | *false* |
| navigationControl | string | It represents the position of the navigation control on the map container. Possible values:<ul><li>**top-right**, when the navigation control is in the top right position of the screen</li><li>**top-left**, when the navigation control is in the top left position of the screen</li><li>**bottom-right**, when navigation control is in the bottom right position of the screen</li><li>**bottom-left**, when navigation control is in the top right position of the screen</li><li>**none**, when we don't want to show the navigation control. Default value is *none*</li></ul> | *false* |
| onClick | function | This is a function that can be set and is fired once a user click on the map. It gives as default input the event with its properties. An example of the property is the lngLat, the object that contains latitude and longitude of the clicked coordinates on the map | *false* |
| onDblClick | function | This function is fired when a double click action happens on the map. As a default, the function inherit the event coordinate of the click | *false*|
| onDrag | function | This fuction is fired when the user drag the map | *false* |
| onDragStart | function | This function is fired once the user start dragging the map | *false* |
| onDragEnd | function | This function is fired once the user stop dragging the map | *false* |
| onDataLoading | function | This function is fired whenever an element of the map (tile, data, style) starts loading or re-rendering | *false* |
| onDataLoaded | fucntion | This function is fired once the loaded data have been loaded successfully | *false* |
| onDataError | function | This function is fired once the data loading ends with errors | *false* |
| children | React Components | This is the native property that comes with React and let us convert the map Compnent from a self closing Map tag to a tag container. Expected children are the elements of the map | *false* |

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