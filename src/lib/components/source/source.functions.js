export const createSource = (map, id, props) => { 
    if (map && map.current && !map.current.getSource(id)) {
        const options = props.options;

        map.current.addSource(id, options);
        return map.current.getSource(id);
    }
    return null;
};

const isEqualsJson = (obj1,obj2)=>{
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    //return true when the two json has same length and all the properties has same value key by key
    return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
}


export const updateSource = (Source, newOptions, prevOptions) => {
    const key = 'data';
    if (!isEqualsJson(newOptions[key],prevOptions[key])) {
        Source.setData(newOptions[key]);
    } 
    return;
}