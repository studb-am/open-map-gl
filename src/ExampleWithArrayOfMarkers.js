import React, { useState } from 'react';
import './App.css';
import Map from './lib/components/Map';
import Marker from './lib/components/Marker';

function ExampleWithArrayOfMarkers() {
  //array of markers
  const [markers, setMarkers] = useState([]);

  return (
    <div className="App">
      <h1 className="heading">This is my map App</h1>
      <Map
        centerCoords={{ lat: 45, lng: 7 }}
        initialZoom={14}
        mapStyle='http://locomovolt.com:8080/styles/basic-preview/style.json'
        minZoom={9}
        maxZoom={16}
        navigationControl="top-right"
        mapClassName="map"
        mapContainerClassName="map-wrap"
        onClick={evt => {
          setMarkers(prev => [...prev, { coords: {lng: evt.lngLat.lng, lat: evt.lngLat.lat } }])
        }}
      >
        {markers.map((marker, index) => {

            return <Marker 
              key={index.toString()}
              options={{
                color: '#FF0000',
                draggable: false
              }}
              coords={{ lat: marker.coords.lat, lng: marker.coords.lng }}
            />
          })
        }
      </Map>
      <button style={{ position: 'absolute', left: 50, top: 150 }} onClick={() => setShowMarker(prev => !prev)}>{showMarker ? "Hide marker" : "Show marker"}</button>
    </div>
  );
}

export default ExampleWithArrayOfMarkers;