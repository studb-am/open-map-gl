import React, { 
    useState, 
    useRef, 
    useLayoutEffect, 
    forwardRef, 
    useImperativeHandle 
} from 'react';
import maplibregl from 'maplibre-gl';

import { addElemToMap } from '../utils/addElems';
import { removeAllElemsToMap } from '../utils/removeElemsToMap';


const Map = (props, ref) => {

    const {
        centerCoords,
        initialZoom,
        minZoom,
        maxZoom,
        mapStyle,
        navigationControl,
        onClick,
        onDblClick,
        onDragEnd,
        onDataLoading,
        onDataLoaded,
        onDataError,
        onDrag,
        mapContainerClassName,
        mapClassName,
        children
    } = props;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const mapObjects = useRef([]);
    const [lng] = useState(centerCoords.lng);
    const [lat] = useState(centerCoords.lat);
    const [zoom] = useState(initialZoom);

    /**
     * Section of action events
     */
    useImperativeHandle(ref, () => {
        return {
            flyTo: ({ center, zoom, speed, maxDuration, curve }) => {
                map.current.flyTo({
                    center,
                    zoom,
                    speed: speed || 1.2,
                    curve: curve || 1.42,
                    maxDuration
                })
            },
            fitBounds: (bbox, options) => {
                map.current.fitBounds(bbox, options);
            },
            getBounds: () => {
                return map.current.getBounds();
            },
            getCenter: () => {
                return map.current.getCenter();
            },
            getZoom: () => {
                return map.current.getZoom();
            },
            onLoad: (callback) => {
                map.current.on('load', callback)
            },
            loadImage: (url, callback) => {
                map.current.loadImage(url, callback);
            },
            addImage: (id, image) => {
                map.current.addImage(id, image);
            }
        }
    })
    //========================

    useLayoutEffect(() => {
        //if the map exists then I just remove all her objects, otherwise I initialize the map itself
        if (!map && !map.current) return;
        //initialization block
        if (map && !map.current) {
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: mapStyle,
                center: [lng, lat],
                zoom: zoom,
                minZoom: minZoom || null,
                maxZoom: maxZoom || null
            });
            if (navigationControl !== "none") {
                map.current.addControl(new maplibregl.NavigationControl(), navigationControl);
            }
        }
        //initialization advanced options
        
        if (onClick) {
            map.current.on('click', onClick);
        }
        if (onDragEnd) {
            map.current.on('dragend', onDragEnd);
        }
        if (onDrag) {
            map.current.on('drag', onDrag);
        }
        if (onDataLoading) {
            map.current.on('dataloading', onDataLoading);
        }
        if (onDataLoaded) {
            map.current.on('data', onDataLoaded);
        }
        if (onDataError) {
            map.current.on('error', onDataError);
        }
        if (onDblClick) {
            map.current.on('dblclick', onDblClick);
        }

        let UiElems;
        if(Array.isArray(children)) {
            UiElems = children;
        } else {
            UiElems = [children];
        }
        UiElems.map(elem => {
            mapObjects.current = addElemToMap(map, elem, mapObjects.current);
        })
    }, [map, children]);

    return (
        <div className={mapContainerClassName}>
            <div ref={mapContainer} className={mapClassName}>
            </div>
        </div>
    );
}

export default forwardRef(Map);