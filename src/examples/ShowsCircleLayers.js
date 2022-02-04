import React, { useState, useRef, useEffect } from 'react';
import { Map, Source, Layer } from '../lib';

const Example = props => {

    const _map = useRef();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('points.json')
            .then(response => response.json())
            .then(newData => setData(newData[0]))
            .catch(err => console.error('Error on fetch', err.message));

        setTimeout(() => {
            _map.current.flyTo({
                center: [7.7, 45],
                zoom: 9
            });
        }, 2000);
    }, []);

    return <React.Fragment>
        <Map
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
            maxZoom={16}
            style='http://locomovolt.com:8080/styles/basic-preview/style.json'
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
        <button style={{position: 'absolute', top: 100, left: 100}} onClick={() => {
            const newData = {
                type: "FeatureCollection",
                features: [data.features[0]]
            }
            setData(newData);
        }}>Change dataset</button>
    </React.Fragment>
}

export default Example;