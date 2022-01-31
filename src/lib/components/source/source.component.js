import React, {
    useState,
    useEffect,
    useRef,
    useContext,
    useMemo
} from 'react';
import { createSource, updateSource } from './source.functions';
import { MapContext } from '../map/map.context';

let sourceCounter = 0;

const Source = props => {

    const { mapRef } = useContext(MapContext);
    const propsRef = useRef();
    const sourceChildrenRef = useRef();
    const [source, setSource] = useState(null);

    const id = useMemo(() => props.id || `gj-source-${sourceCounter++}`, []);

    let Source = mapRef && mapRef.current && mapRef.current.isStyleLoaded() && mapRef.current.getSource(id);

    useEffect(() => {
        const addSource = function () {
            Source = createSource(mapRef, id, props);
            setSource(Source);
        }
        if (mapRef && !source) {
            mapRef.current.on('load', addSource);

            return () => {
                mapRef.current.off('load', addSource);
            }
        }
        return;
    }, [mapRef, source]);

    useEffect(() => {
        return () => {
            sourceChildrenRef.map(layerId => {
                mapRef.current.removeLayer(layerId);
            });
            mapRef.current.removeSource(id);
        }
    }, [])


    if (Source) {
        updateSource(Source, props.options, propsRef.current.options);
    }

    propsRef.current = props;

    let childrenArray;
    if (Array.isArray(props.children)) {
        childrenArray = props.children
    } else {
        childrenArray = [props.children]
    }

    if (source) {
        sourceChildrenRef.current = [];
        childrenArray.map(child => sourceChildrenRef.current.push(child.props.id));
    }

    return source && <div>{props.children}</div>

}

export default Source;