import { jsonEquality } from "../../utils/json-equality.functions";

export const createSource = (map, id, props) => { 
    if (map && map.current && !map.current.getSource(id)) {
        const options = props.options;

        map.current.addSource(id, options);
        return map.current.getSource(id);
    }
    return null;
};




export const updateSource = (Source, newOptions, prevOptions) => {
    const key = 'data';
    if (!jsonEquality(newOptions[key],prevOptions[key])) {
        Source.setData(newOptions[key]);
    } 
    return;
}