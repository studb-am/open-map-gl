import React from 'react';

import { Map, Marker, createPopup, Popup } from '../lib';

const Example = props => {

    const popup = createPopup({
        coords: [7, 45],
        options: {
            offset: 25
        },
        text: "This is an example of popup"
    })

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
                popup={popup}
                onDragEnd={evt => console.log(evt.target)}
            />
            <Popup 
                coords={[7, 45]}
                options={{
                    maxWidth: 100,
                    offset: 50
                }}
                text="This is another example"
            />
        </Map>
    </React.Fragment>
}

export default Example;

