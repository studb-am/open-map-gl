import React from 'react';

import { Map, Marker } from '../lib';

const Example = props => {

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
            <Marker 
                coords={[7, 45]} 
                options={{ 
                    color: "#FF0000",
                    draggable: true
                }} 
                onDragEnd={evt => console.log(evt.target)}
            />
        </Map>
    </React.Fragment>
}

export default Example;

