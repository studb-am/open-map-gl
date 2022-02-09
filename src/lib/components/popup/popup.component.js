import React, {
    useEffect,
    useMemo,
    useRef,
    useContext
} from 'react';
import { createPortal } from 'react-dom';
import maplibregl from 'maplibre-gl';
import { MapContext } from "../map/map.context";

function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
}

const Popup = props => {

    const {
        coords,
        text,
        html,
        children,
        onOpen,
        onClose,
        ...options
    } = props;
    const { mapRef } = useContext(MapContext);
    const popupPropsRef = useRef({ props });

    const popupContainer = useMemo(() => {
        return document.createElement('div');
    })
    const popup = useMemo(() => {
        return new maplibregl.Popup(options).setLngLat(coords || [0,0]);
    }, []);

    useEffect(() => {
        popup.setDOMContent(popupContainer)
        if (text) {
            popup.setText(text);
        }
        if (html) {
            popup.setHTML(html)
        }
        popup.addTo(mapRef.current);
        return () => popup.remove();
    }, [mapRef]);

    useEffect(() => {
        if (mapRef && onOpen) {
            popup.on('open', onOpen);    
            return () => popup.off('open', onOpen);    
        }
        return;
    },[mapRef, onOpen]);
    
    useEffect(() => {
        if (mapRef && onClose) {
            popup.on('open', onClose);    
            return () => popup.off('open', onClose);    
        }
        return;
    },[mapRef, onClose]);

    //////*********Props Actions************//////
    if (popup.isOpen()) {
        if (popup.getLngLat().lng !== coords[0] || popup.getLngLat().lat !== coords[1]) {
            popup.setLngLat(coords);
        }
    }
   
    if (popup.options.className !== options.className) {
        const prevClassList = getClassList(popup.options.className);
        const newClassList = getClassList(options.className);
        for (const c of prevClassList) {
            if (!newClassList.has(c)) {
                popup.removeClassName(c);
            }
        }
        for (const c of newClassList) {
            if (!prevClassList.has(c)) {
                popup.addClassName(c);
            }
        }
        popup.options.className = options.className;
    }
    //////*********Props Actions************//////

    return createPortal(children, popupContainer);
}

export default React.memo(Popup);