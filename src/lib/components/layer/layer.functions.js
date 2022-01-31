export const createLayer = (map, id, props) => {
    if (map && map.current && !map.current.getLayer(id)) {
        const options = { ...props.options, id};
        delete options.beforeId;

        map.current.addLayer(options, props.beforeId);
        return map.current.getLayer(id);
    }
}