import React, { useRef, useEffect } from 'react';
import { Map, Source, Layer, useImageIcon } from '../lib';

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

    //useImageIcon(_map, 'test-icon', 'https://maplibre.org/maplibre-gl-js-docs/assets/osgeo-logo.png');

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
        center={[7, 45]}
        zoom={14}
        minZoom={9}
        style='http://locomovolt.com:8080/styles/basic-preview/style.json'
    >
        <Source
            id="source-test"
            type="geojson"
            data={DUMMY_POINTS}
        >
            <Layer 
                id="symbol"
                type="symbol"
                source="source-test"
                layout={{
                    'icon-image': 'volleyball',
                    'icon-size': 1.5
                }}    
            />
        </Source>
    </Map>

}

export default Example;