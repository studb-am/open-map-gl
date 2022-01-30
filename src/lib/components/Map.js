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
            flyTo: ({center, zoom, speed, maxDuration, curve}) => {
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
            getCenter:() => {
                return map.current.getCenter();
            },
            getZoom: () => {
                return map.current.getZoom();
            },
            onLoad: (callback) => {
                map.current.on('load', callback)
            },
            loadImage: (url,callback) => {
                map.current.loadImage(url,callback);
            },
            addImage: (id,image) => {
                map.current.addImage(id,image);
            }
        }
    })
    //========================

    useLayoutEffect(() => {
        console.log('here');
        console.log(mapObjects.current);
        //if the map exists then I just remove all her objects, otherwise I initialize the map itself
        if (map.current) {
            //update block
            /*
            --da capire dopo aver visto i geojson come lavorare coi marker di nuovo
            mapObjects.current.map(mapObject => {
                mapObject.remove();
            });
            mapObjects.current = []; //I'm re-initializing the array too
            */
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