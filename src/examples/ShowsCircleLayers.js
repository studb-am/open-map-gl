import React, { useRef, useEffect } from 'react';
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

    const _map = useRef();
    useEffect(() => {
        setTimeout(() => {
            _map.current.flyTo({
                center: [7.7, 45],
                zoom: 9
            });
        }, 2000);
    }, []);

    return <Map
        ref={_map}
        navigationControl="top-right"
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
        options={{
            center: [7, 45],
            zoom: 14,
            minZoom: 9,
            maxZoom: 16,
            style: 'http://locomovolt.com:8080/styles/basic-preview/style.json'
        }}
    >
        <GeojsonSource
            id="source-test"
            data={DUMMY_POINTS}
        >
            <CircleLayer
                id='layer-circle'
                options={{
                    source: 'source-test',
                    filter: ['!=', 'isSelected', true],
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
                    filter: ['==', 'isSelected', true],
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