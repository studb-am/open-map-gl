import React, { useRef, useState } from 'react';
import {
    Map,
    GeojsonSource,
    SymbolLayer,
    usePngImage
} from './lib';
import MARKER_IMG from './assets/marker-b-32.png';

const DUMMY_POINTS = {
    type: 'FeatureCollection',
    features: [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.77712493,
                    45.039546962
                ]
            },
            "properties": {
                "name": "Pino Torinese"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.684754261,
                    45.000461393
                ]
            },
            "properties": {
                "name": "Moncalieri"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.682489136,
                    45.067755083
                ]
            },
            "properties": {
                "name": "Torino"
            }
        }
    ]
};

const Example = props => {
    const [changeIcon, setChangeIcon] = useState(false);
    const _map = useRef();
    usePngImage(_map, 'custom-marker', MARKER_IMG);
    usePngImage(_map, 'custom-marker-2', 'https://maplibre.org/maplibre-gl-js-docs/assets/osgeo-logo.png');

    return <React.Fragment><Map
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
        <GeojsonSource
            sourceId="sourcePoint"
            data={DUMMY_POINTS}
        >
            <SymbolLayer id="testPoint1" markerImageName={changeIcon ? 'custom-marker-2' : 'custom-marker'} />
        </GeojsonSource>
    </Map>
        <button style={{ position: 'absolute', top: 50, left: 50 }} onClick={() => setChangeIcon(prev => !prev)}>change icon</button>
    </React.Fragment>
}

export default Example;