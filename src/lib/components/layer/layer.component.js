import React, { useState, useEffect, useContext } from 'react';
import { MapContext } from '../map/map.context';

const Layer = props => {

    const { id, minZoom, onClick } = props;
    const { mapRef } = useContext(MapContext);

    useEffect(() => {
        if (onClick) {
            mapRef.current.on('click', id, onClick);
            return () => {
                mapRef.current.off('click', id, onClick);
            }
        }
        return;
    }, [onClick, minZoom]);

    return null;
}

export default Layer;