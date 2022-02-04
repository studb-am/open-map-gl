import React, {
    useState,
    useRef,
    useContext,
    useEffect
} from 'react';
import { MapContext } from '../map/map.context';
import { createSource, getChildrenLayers } from './source.functions';
import { jsonEquality } from '../../utils/json-equality.functions';

const Source = props => {

    const { id, children, ...options } = props;
    const childrenRef = useRef([]);
    const dataRef = useRef(null);
    const { mapRef } = useContext(MapContext);
    const [source, setSource] = useState(null);

    //source update once data changes
    if (mapRef && mapRef.current && mapRef.current.getSource(id) && !jsonEquality(dataRef.current, options.data)) {
        mapRef.current.getSource(id).setData(options.data);
    };

    useEffect(() => {
        if (mapRef && !source) {
            const addSource = () => {
                const currSource = createSource(mapRef, id, options, children);
                setSource(currSource);
            }
            childrenRef.current = getChildrenLayers(children);
            mapRef.current.on('load', addSource);
            return () => mapRef.current.off('load', addSource);
        }
        mapRef.current.getSource(id).setData(options.data);
        return;
    }, [mapRef, source]);

    useEffect(() => {
        return () => {
            childrenRef.current.forEach(layerId => {
                mapRef.current.removeLayer(layerId);
            });
            mapRef.current.removeSource(id);
        }
    }, []);

    return <div>{children}</div>



}

export default Source;