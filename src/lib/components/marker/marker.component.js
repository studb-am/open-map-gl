import React, {
    useEffect,
    useMemo,
    useRef,
    useContext
} from 'react';
import { createPortal } from 'react-dom';
import maplibregl from 'maplibre-gl';
import { MapContext } from "../map/map.context";

const Marker = props => {

    const {options, coords, children} = props;
    const mapCxt = useContext(MapContext);
    //const _marker = useRef();

    const marker = useMemo(() => {
        let hasChildren = false;
        React.Children.forEach(children, el => {
            if (el) {
                hasChildren = true;
            }
        })
        const markerOptions = {
            ...options,
            element: hasChildren ? document.createElement('div') : null
        }

        return new maplibregl.Marker(markerOptions).setLngLat(coords);
    }, []);

    useEffect(() => {
        marker.addTo(mapCxt.mapRef.current);
        return () => marker.remove();
    }, []);

    return createPortal(children,marker.getElement());
}

export default React.memo(Marker);