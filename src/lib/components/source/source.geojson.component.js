import React from "react";
import Source from "./source.component";

const GeojsonSource = props => {
    
    const {data, ...otherProps} = props;
    const options = {
        type: 'geojson',
        data: data
    };

    return <Source {...otherProps} options={options}/>
}

export default GeojsonSource;