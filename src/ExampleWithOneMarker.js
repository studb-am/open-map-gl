import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Map from './lib/components/Map';
import Marker from './lib/components/Marker';

function ExampleWithOneMarker() {
    const [showMarker, setShowMarker] = useState(true);
    const _map = useRef(null);

    //test the ref property of the map
    useEffect(() => {
        /*const mapParams = () => {
            const center = _map.current.getCenter();
            const zoom = _map.current.getZoom();
            const bounds = _map.current.getBounds();

            console.log('center', center);
            console.log('zoom', zoom);
            console.log('bounds', bounds);
        }

        mapParams();*/

        setTimeout(() => {
            _map.current.fitBounds([[7.05, 45.01],[6.97,44.97]],{ padding: 20 });
        },2000)

        /*setTimeout(() => {
            _map.current.flyTo({
                center:[7,46],
                zoom: 10
            });
        }, 2000);*/
    }, []);

    return (
        <div className="App">
            <h1 className="heading">This is my map App</h1>
            <Map
                ref={_map}
                centerCoords={{ lat: 45, lng: 7 }}
                initialZoom={14}
                mapStyle='http://locomovolt.com:8080/styles/basic-preview/style.json'
                minZoom={9}
                maxZoom={16}
                navigationControl="top-right"
                mapClassName="map"
                mapContainerClassName="map-wrap"
            >
                {//marker iniziale di test
                    showMarker && <Marker
                        coords={{ lat: 45, lng: 7 }}
                        onDragEnd={evt => {
                            const coords = evt.target._lngLat;
                            console.log(coords); //function that let extract the final value of the coordinates
                        }}
                        options={{
                            color: '#3FB1CE',
                            draggable: true
                        }}
                    />
                }
            </Map>
            <button style={{ position: 'absolute', left: 50, top: 150 }} onClick={() => setShowMarker(prev => !prev)}>{showMarker ? "Hide marker" : "Show marker"}</button>
        </div>
    );
}

export default ExampleWithOneMarker;