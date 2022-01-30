import React, { useRef, useLayoutEffect, useState, forwardRef, useImperativeHandle } from 'react';
import maplibregl from 'maplibre-gl';

import { addMapObject } from '../utils/mapObjects.function';


const Map = (props, ref) => {

    const {
        centerCoords,
        initialZoom,
        minZoom,
        maxZoom,
        mapStyle,
        navigationControl,
        onClick,
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
     * Section of action event
     */
    useImperativeHandle(ref, () => {
        return {
            flyTo: ({center, zoom, speed, maxDuration, curve}) => {
                map.current.flyTo({
                    center,
                    zoom,
                    speed: speed || 1.2,
                    curve: curve || 1.42,
                    maxDuration
                })
            }
        }
    })
    //========================

    useLayoutEffect(() => {
        //if the map exists then I just remove all her objects, otherwise I initialize the map itself
        if (map.current) {
            //update block
            mapObjects.current.map(mapObject => {
                mapObject.remove();
            });
            mapObjects.current = []; //I'm re-initializing the array too
        } else {
            //initialization block
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: mapStyle,
                center: [lng, lat],
                zoom: zoom,
                minZoom: minZoom || null,
                maxZoom: maxZoom || null
            });
            //initialization advanced options
            if (navigationControl !== "none") {
                map.current.addControl(new maplibregl.NavigationControl(), navigationControl);
            }
            if (onClick) {
                map.current.on('click', onClick);
            }
        }
        if (Array.isArray(children)) {
            children.map(child => {
                //First of all I evaluate if the child comes from a map (in this case is a nested array of children)
                if (Array.isArray(child)) {
                    child.map(elem => {
                        mapObjects.current = addMapObject(elem, map, mapObjects);
                    })
                } else {
                    mapObjects.current = addMapObject(child, map, mapObjects);
                }
            })
        } else {
            mapObjects.current = addMapObject(children, map, mapObjects);
        }
    }, [children]);

    return (
        <div className={mapContainerClassName}>
            <div ref={mapContainer} className={mapClassName}>
            </div>
        </div>
    );
}

export default forwardRef(Map);