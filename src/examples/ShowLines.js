import React, { useRef } from 'react';
import { Map, Source, Layer } from '../lib';

const DUMMY_LINES = {
    type: 'FeatureCollection',
    features: [{ "type": "Feature", "geometry": { "type": "LineString", "coordinates": [[9.142216181, 45.379795653], [9.139049498, 45.374135521], [9.138976157, 45.37400468], [9.138729142, 45.373731346], [9.138474667, 45.373084431], [9.13721998, 45.370776976]] } }, { "type": "Feature", "geometry": { "type": "LineString", "coordinates": [[9.156798262, 45.404799289], [9.156280931, 45.403941234], [9.155235456, 45.402207353], [9.151296548, 45.395688328], [9.151276348, 45.39564843], [9.151216166, 45.395545668], [9.151200324, 45.395515828], [9.148261042, 45.390665137], [9.14647796, 45.387407427], [9.14638995, 45.387340958], [9.146314764, 45.387264851], [9.146242428, 45.387178182], [9.146200351, 45.387051363], [9.146158274, 45.386913984], [9.146082921, 45.386721536], [9.143537421, 45.382087852], [9.142886482, 45.380990577]] } }, { "type": "Feature", "geometry": { "type": "LineString", "coordinates": [[9.135960599, 45.368530794], [9.129601836, 45.357925843], [9.128907731, 45.356765955], [9.128177751, 45.355599445], [9.127977172, 45.355278838], [9.127927132, 45.35521832], [9.127829231, 45.355108098], [9.127735941, 45.355020088], [9.127640387, 45.354893689], [9.127592526, 45.354775337], [9.127553886, 45.354660169], [9.127515161, 45.35458557], [9.127465037, 45.354513067], [9.12721928, 45.354269824], [9.126827258, 45.353942762], [9.126788283, 45.353910157]] } }]
};


const Example = props => {

    const _map = useRef();

    return <Map
        ref={_map}
        accessToken="abc"
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
        center={[9.14, 45.37]}
        zoom={12}
        minZoom={5}
        style="https://locomovolt.com/api/map/styles/basic-preview/style.json"
    >
        <Source
            id="source-test"
            type="geojson"
            data={DUMMY_LINES}
        >
            <Layer
                id="symbol"
                type="line"
                source="source-test"
                layout={{
                    'line-join': 'round',
                    'line-cap': 'round'
                }}
                paint={{
                    'line-color': '#C33A1D',
                    'line-width': 3
                }}
            />
            <Layer
                id='arrows'
                type="symbol"
                source="source-test"
                layout={{
                    'symbol-placement': 'line',
                    'symbol-spacing': 100,
                    'icon-image': 'triangle',
                    'icon-size': 0.6,
                    'icon-rotate': 30,
                    'icon-offset': [-3, 0]
                }}
            />
        </Source>
    </Map>

}

export default Example;