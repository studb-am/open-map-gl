import React, { useEffect, useState } from 'react';
import { Source, Layer, Map } from '../lib';



const Example = props => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('points.json')
            .then(response => response.json())
            .then(newData => setData(newData[0]))
            .catch(err => console.error('error!!!', err.message))
    }, []);

    return <Map
        navigationControls="top-right"
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
        zoom={8}
        style='http://locomovolt.com:8080/styles/basic-preview/style.json'
    >
        <Source
            id="earthquakes"
            type="geojson"
            data={data}
            cluster
            clusterMaxZoom={9}
            clusterRadius={50}
        >
            <Layer
                id="unclustered"
                type="circle"
                source="earthquakes"
                filter={['!', ["has", "poi_count"]]}
                minzoom={9}
                onClick={evt => {
                    console.log('clicked', evt);
                }}
                paint={{
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }}
            />
            <Layer
                id="clusters"
                type="circle"
                source="earthquakes"
                filter={["has", "point_count"]}
                onClick={evt => {
                    console.log('clicked on cluster', evt)
                }}
                paint={{
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6',
                        100,
                        '#f1f075',
                        750,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }}
            />
            <Layer
                id="cluster-label"
                type="symbol"
                source="earthquakes"
                filter={["has", "point_count"]}
                layout={{
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['Noto Sans Regular'],
                    'text-size': 12
                }}
                paint={{
                    'text-color': '#fff'
                }}
            />
            {/** Da approfondire il caricamento del carattere dal server*/}
        </Source>
    </Map>
}

export default Example;