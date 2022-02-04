import { jsonEquality } from "../../utils/json-equality.functions";

export const createLayer = (map, id, props) => {
    if (map && map.current && !map.current.getLayer(id)) {
        const options = { ...props.options, id};
        delete options.beforeId;
        map.current.addLayer(options, props?.beforeId);
        return map.current.getLayer(id);
    }
}

export const updateLayer = (map, id, newProps, oldProps) => {

    if(newProps.beforeId !== oldProps.beforeId) {
        map.current.moveLayer(id, newProps.beforeId);
    }

    const newOptions = newProps.options || {};
    const oldOptions = oldProps.options || {};

    if (!jsonEquality(newOptions.layout, oldOptions.layout)) {
        for (let key in newOptions.layout) {
            map.current.setLayoutProperty(id, key, newOptions.layout[key]);
        }
        for (let key in oldOptions.layout) {
            if (!newOptions.layout.hasOwnProperty(key)) {
                map.current.setLayoutProperty(id, key, undefined);
            }
        }
    }

    if (!jsonEquality(newOptions.paint, oldOptions.paint)) {
        for (let key in newOptions.paint) {
            map.current.setPaintProperty(id, key, newOptions.paint[key]);
        }
        for (let key in oldOptions.paint) {
            if (!newOptions.paint.hasOwnProperty(key)) {
                map.current.setPaintProperty(id, key, undefined);
            }
        }
    }


    
}