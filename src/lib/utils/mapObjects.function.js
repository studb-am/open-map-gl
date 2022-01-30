import maplibregl from 'maplibre-gl';

const addLayerToSource = options => {
    const { map, layerId, sourceId, elem, mapObjects, markerImageName } = options;

    switch(elem?.type?.name) {
        case 'SymbolLayer':
            map.current.addLayer({
                'id': layerId,
                'type': 'symbol',
                'source': sourceId,
                'layout': {
                    'icon-image': markerImageName
                }
            });
            return mapObjects.current.push({type: 'layer', layerId: layerId});
        default:
            return mapObjects;
    }

    
}

export const addMapObject = (elem, map, mapObjects) => {

    switch (elem?.type?.name) {
        case 'Marker':
            const { coords, options, onDragEnd } = elem.props;

            const currObj = new maplibregl.Marker({
                color: options.color,
                draggable: options.draggable
            })
                .setLngLat([coords.lng, coords.lat])
                .addTo(map.current);
            if (options.draggable) {
                currObj.on("dragend", onDragEnd)
            }

            mapObjects.current.push(currObj);
            return mapObjects.current;
        case 'GeojsonSource':
            const { data, sourceId, children } = elem.props;

            map.current.on('load', function () {
                map.current.addSource(
                    sourceId,
                    {
                        'type': 'geojson',
                        'data': data
                    }
                );
                mapObjects.current.push({ type: 'source', id: sourceId });
                if (!children) throw new Error('You cannot render a Geojson Source without any children layer! Please add one');
                if (Array.isArray(children)) {
                    children.map(child => {
                        const { id, markerImageName } = child.props;
                        mapObjects.current = addLayerToSource({
                            map: map,
                            layerId: id,
                            sourceId: sourceId,
                            elem: child,
                            mapObjects,
                            markerImageName
                        });
                    })
                } else {
                    const { id, markerImageName } = children.props;
                    mapObjects.current = addLayerToSource({
                        map: map,
                        layerId: id,
                        sourceId: sourceId,
                        elem: children,
                        mapObjects,
                        markerImageName
                    });
                }
            });

            return mapObjects.current;
        default:
            return [];
    }
}