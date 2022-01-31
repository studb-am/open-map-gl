import React, {useState} from 'react';
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

    const [test, setTest] = useState(0);
    const newData = {
        type: 'FeatureCollection',
        features: DUMMY_POINTS.features.map((point, currIndex) => {
            if (currIndex === test) {
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
        })
    };

    return <React.Fragment>
        <Map
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
                data={newData}
            >
                <CircleLayer
                    id='layer-circle'
                    onDblClick={evt => {
                        console.log(evt.features)
                    }}
                    options={{
                        source: 'source-test',
                        filter: ['!=', 'isSelected', true],
                        paint: {
                            'circle-radius': 10,
                            'circle-color': '#B42222'
                        }
                    }}
                />
                <CircleLayer
                    id='layer-circle-2'
                    options={{
                        source: 'source-test',
                        filter: ['==', 'isSelected', true],
                        paint: {
                            'circle-radius': 10,
                            'circle-color': '#B4FFFF'
                        }
                    }}
                />
            </GeojsonSource>
        </Map>
        <button style={{ position: 'absolute', top: 100, left: 50 }} onClick={() => setTest(prev => (prev + 1) % 3)}>Change Data</button>
    </React.Fragment>
}

export default Example;