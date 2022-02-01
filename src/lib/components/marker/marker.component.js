import React, {
    useEffect,
    useMemo,
    useContext
} from 'react';
import { createPortal } from 'react-dom';
import maplibregl from 'maplibre-gl';
import { MapContext } from "../map/map.context";

const Marker = props => {

    const { 
        options, 
        coords, 
        popup,
        children,
        onDrag,
        onDragEnd,
        onDragStart 
    } = props;
    const { mapRef } = useContext(MapContext);
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
        marker.addTo(mapRef.current);
        return () => marker.remove();
    }, [mapRef]);

    //////*********Event Handlers************//////
    useEffect(() => {
        if (onDragStart) {
            marker.on('dragstart',onDragStart);
            return () => marker.off('dragstart',onDragStart);
        }
    },[onDragStart]);
    useEffect(() => {
        if (onDragEnd) {
            marker.on('dragend',onDragEnd);
            return () => marker.off('dragend',onDragEnd);
        }
    },[onDragEnd]);
    useEffect(() => {
        if (onDrag) {
            marker.on('drag',onDrag);
            return () => marker.off('drag',onDrag);
        }
    },[onDrag]);
    //////*********Event Handlers************//////

    //////*********Props Actions************//////
    if (marker.getLngLat().lng !== coords[0] || marker.getLngLat().lat !== coords[1]) {
        marker.setLngLat(coords);
    }
    if (options && options.draggable && marker.isDraggable() !== options.draggable) {
        marker.setDraggable(options.draggable);
    }
    if (popup && marker.getPopup() !== popup) {
        marker.setPopup(new maplibregl.Popup().setText("This is a test"));
    }
    //////*********Props Actions************//////

    return createPortal(children, marker.getElement());
}

export default React.memo(Marker);