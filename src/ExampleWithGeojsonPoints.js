import React, { useRef, useState } from 'react';
import {
    Map,
    GeojsonSource,
    SymbolLayer,
    CircleLayer,
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
    const [index, setIndex] = useState(0);
    const newData = {
        type: 'FeatureCollection',
        features: DUMMY_POINTS.features.map((point, currIndex) => {
        if (currIndex === index) {
            return {
                ...point,
                properties: {
                    name: point.properties.name,
                    isSelected: true
                }
            }
        } else {
            return point;
        }
    })};
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
        {index>=0 && <GeojsonSource
            id="sourcePoint"
            data={newData}
        >
            {/*<SymbolLayer 
                layerID="testPoint" 
                sourceID="sourcePoint" 
                layout={{
                    'icon-image': 'custom-marker'
                }}
                filter={["==",'isSelected', true]}
            />*/}
            <CircleLayer 
                layerID="testPoint" 
                sourceID="sourcePoint"
                paint= {{
                    'circle-radius': 13,
                    'circle-color': '#C42222'
                    }} 
                filter={["==",'isSelected', true]}
            />
            <CircleLayer 
                layerID="testPoint2" 
                sourceID="sourcePoint"
                paint= {{
                    'circle-radius': 10,
                    'circle-color': '#B42222'
                    }} 
                filter={["!=",'isSelected', true]}
            />
        </GeojsonSource>}
    </Map>
        <button style={{ position: 'absolute', top: 50, left: 50 }} onClick={() => setIndex(prev => {
            const res = (prev+1) % 3;
            return res
        })}>change icon</button>
    </React.Fragment>
}

export default Example;