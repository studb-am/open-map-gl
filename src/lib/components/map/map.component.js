import React, {
    useLayoutEffect,
    useState,
    useRef,
    useEffect
} from 'react';
import maplibregl from 'maplibre-gl';

import { MapContext } from './map.context';
import './Map.css';

const Map = props => {

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

    const [center] = useState(centerCoords);
    const [zoom] = useState(initialZoom);
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useLayoutEffect(() => {
        if (mapRef.current) return;
        mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center,
            minZoom,
            maxZoom,
            zoom
        });
        if (navigationControl !== "none") {
            mapRef.current.addControl(new maplibregl.NavigationControl(), navigationControl);
        }
    }, []);

    useEffect(() =>  {
        return () => mapRef.current.remove();
    }, []);

    return (
        <MapContext.Provider value={{ mapRef }}>
            <div className="map-wrap">
                <div ref={mapContainer} className="map">
                    {children}
                </div>
            </div>
        </MapContext.Provider>
    );
}

export default Map;