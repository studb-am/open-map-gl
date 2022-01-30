export const removeAllElemsToMap = (map, objs) => {
    objs.forEach(obj => {
        if (obj.type === 'source') {
            const layersInSource = objs.filter(layer => layer.sourceID === obj.id);
            layersInSource.forEach(layer => {
                map.current.removeLayer(layer.id);
            });
            map.current.removeSource(obj.id);
        }
    });
    return [];
}