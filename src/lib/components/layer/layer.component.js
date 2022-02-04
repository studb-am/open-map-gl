import React, { useState, useEffect, useContext } from 'react';
import { MapContext } from '../map/map.context';

const Layer = props => {

    const { 
        id,
        source,
        inspectClusterOnClick, 
        onClick, 
        onDblClick, 
        onRightClick 
    } = props;
    const { mapRef } = useContext(MapContext);

    if (onClick && inspectClusterOnClick) {
        throw new Error('Attention! You cannot set the onClick property if you enable the inspectClusterOnClick one!!!');
    }

    useEffect(() => {
        if (inspectClusterOnClick) {
            const inspect = evt => {
                const features = mapRef.current.queryRenderedFeatures(evt.point, {
                    layers: [id]
                });
                const clusterId = features[0].properties.cluster_id;
                mapRef.current.getSource(source).getClusterExpansionZoom(
                    clusterId,
                    function (err, zoom) {
                        if (err) throw err;
                        mapRef.current.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            }
            mapRef.current.on('click', id, inspect);
            return () => mapRef.current.off('click', id, inspect);
        }
    }, [inspectClusterOnClick, mapRef, source]);

    useEffect(() => {
        if (onClick) {
            mapRef.current.on('click', id, onClick);
            return () => {
                mapRef.current.off('click', id, onClick);
            }
        }
        return;
    }, [onClick, mapRef]);
    useEffect(() => {
        if (onDblClick) {
            mapRef.current.on('click', id, onDblClick);
            return () => {
                mapRef.current.off('click', id, onDblClick);
            }
        }
        return;
    }, [onDblClick, mapRef]);
    useEffect(() => {
        if (onRightClick) {
            mapRef.current.on('click', id, onRightClick);
            return () => {
                mapRef.current.off('click', id, onRightClick);
            }
        }
        return;
    }, [onRightClick, mapRef]);
    useEffect(() => {
        if (onClick || onDblClick || onRightClick || inspectClusterOnClick) {
            const makePointer = () => mapRef.current.getCanvas().style.cursor = 'pointer';
            const resetPointer = () => mapRef.current.getCanvas().style.cursor = '';
            mapRef.current.on('mouseenter', id, makePointer);
            mapRef.current.on('mouseleave', id, resetPointer);

            return () => {
                mapRef.current.off('mouseenter', id, makePointer);
                mapRef.current.off('mouseleave', id, resetPointer);        
            }
        }
        return;
    },[onClick, onDblClick, onRightClick, inspectClusterOnClick, mapRef]);

    return null;
}

export default Layer;