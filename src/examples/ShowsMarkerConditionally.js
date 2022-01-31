import React, { useState } from 'react';

import { Map, Marker } from '../lib';

const Example = props => {
    const [test, setTest] = useState(false);

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
            {!test && <Marker coords={[7.1, 45.1]} options={{ color: "#FFBB00" }} />}
            {test && <Marker coords={[7, 45]} options={{ color: "#FF0000" }} />}
        </Map>
        <button style={{ position: 'absolute', top: 100, left: 50 }} onClick={() => setTest(prev => !prev)}>Change</button>
    </React.Fragment>
}

export default Example;

