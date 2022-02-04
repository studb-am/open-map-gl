import { jsonEquality } from "../../utils/json-equality.functions";

let childrenLayers = [];

export const getChildrenLayers = (children) => {
    let childrenArray = [];

    if (Array.isArray(children)) {
        childrenArray = children;
    } else {
        childrenArray = [children];
    }

    childrenLayers = childrenArray.map(child => {
        const { beforeId, children, ...layer } = child.props;
        if (child.type.name !== 'Layer') return;
        return layer.id;
    });

    return childrenArray

}


export const createSource = (map, id, options, children) => {

    if (map && map.current) {
        map.current.addSource(id, options);

        let childrenArray = [];

        if (Array.isArray(children)) {
            childrenArray = children;
        } else {
            childrenArray = [children];
        }

        childrenArray.forEach(child => {
            const { beforeId, children, onClick, ...layer } = child.props;
            if (child.type.name !== 'Layer') return;
            map.current.addLayer(layer, beforeId);
        });

        return map.current.getSource(id);
    }
    return;
}


export const updateSource = (Source, newOptions, prevOptions) => {
    const key = 'data';
    if (!jsonEquality(newOptions[key], prevOptions[key])) {
        Source.setData(newOptions[key]);
    }
    return Source;
}