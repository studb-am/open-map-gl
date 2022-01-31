import React from 'react';
import { Map, GeojsonSource, CircleLayer } from '../lib';

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
                "name": "Pino Torinese",
                "isSelected": true
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

    return <Map
        centerCoords={[7, 45]}
        initialZoom={14}
        mapStyle='http://locomovolt.com:8080/styles/basic-preview/style.json'
        minZoom={9}
        maxZoom={16}
        navigationControl="top-right"
        mapClassName="map"
        mapContainerClassName="map-wrap"
    >
        <GeojsonSource
            id="source-test"
            data={DUMMY_POINTS}
        >
            <CircleLayer
                id='layer-circle'
                options={{
                    source: 'source-test',
                    filter: ['!=','isSelected',true],
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#B42222'
                    }
                }}
            />
        </GeojsonSource>
        <GeojsonSource
            id="source-test-2"
            data={DUMMY_POINTS}
        >
            <CircleLayer
                id='layer-circle-2'
                options={{
                    source: 'source-test-2',
                    filter: ['==','isSelected',true],
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#B4FFFF'
                    }
                }}
            />
        </GeojsonSource>
    </Map>

}

export default Example;