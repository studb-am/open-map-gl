import maplibregl from 'maplibre-gl';

export const addMapObject = (elem, map, mapObjects) => {
    //default condition to return an empty or invalid array
    if (!elem) {
        return [];
    }

    if (elem?.type?.name === 'Marker') {
        const { coords, options, onDragEnd } = elem.props;

        const currObj = new maplibregl.Marker({ 
            color:  options.color,
            draggable: options.draggable
        })
            .setLngLat([coords.lng, coords.lat])
            .addTo(map.current);
        if (options.draggable) {
            currObj.on("dragend", onDragEnd)
        }
        
        mapObjects.current.push(currObj);
        return mapObjects.current;
    }
}