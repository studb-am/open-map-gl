import React, {
    useLayoutEffect,
    useState,
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef
} from 'react';
import maplibregl from 'maplibre-gl';

import { MapContext } from './map.context';

const Map = (props,ref) => {

    const {
        onClick,
        onRightClick,
        onDblClick,
        onLoad,
        onError,
        onDrag, 
        onDragStart,
        onDragEnd,
        accessToken,
        mapContainerCssStyle,
        mapCssStyle,
        navigationControl,
        children,
        ...options
    } = props;

    const [center] = useState(options.center);
    options.center = center;
    const [zoom] = useState(options.zoom);
    options.zoom = zoom;
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    const addTokenToUrl = (url) => {
        return {
            url: `${url}?access_token=${accessToken}`
        };
    }

    //***************************Property to be used by the ref father once invoked*******************************************/
    useImperativeHandle(ref, () => {
        return {
            addImage: (id, image, options) => mapRef.current.addImage(id, image, options),
            flyTo: (options, eventData) => mapRef.current.flyTo(options, eventData),
            fitBounds: (bounds, options, eventData) => mapRef.current.fitBounds(bounds, options, eventData),
            fitScreenToCoordinates: (p0, p1, bearing, options, eventData) => mapRef.current.fitScreenToCoordinates(p0, p1, bearing, options, eventData),
            getBearing: () => mapRef.current.getBearing(),
            getBounds: () => mapRef.current.getBounds(),
            getCanvas: () => mapRef.current.getCanvas(),
            getCanvasContainer: () => mapRef.current.getCanvasContainer(),
            getCenter: () => mapRef.current.getCenter(),
            getContainer: () => mapRef.current.getContainer(),
            getFeatureState: (feature) => mapRef.current.getFeatureState(feature),
            getFilter: (layerId) =>  mapRef.current.getFilter(layerId),
            getLayerId: (id) => mapRef.current.getLayer(id),
            getLayoutProperty: (layerId, name) => mapRef.current.getLayoutProperty(layerId, name),
            getLight: () => mapRef.current.getLight(), 
            getMaxBounds: () => mapRef.current.getMaxBounds(),
            getMaxPitch: () => mapRef.current.getMaxPitch(),
            getMaxZoom: () => mapRef.current.getMaxZoom(),
            getMinPitch: () => mapRef.current.getMinPitch(),
            getMinZoom: () => mapRef.current.getMinZoom(),
            getPadding: () => mapRef.current.getPadding(),
            getPaintProperty: () => mapRef.current.getPaintProperty(),
            getPitch: () => mapRef.current.getPitch(),
            getPixelRatio: () => mapRef.current.getPixelRatio(),
            getRenderWorldCopies: () => mapRef.current.getRenderWorldCopies(),
            getSource: (id) => mapRef.current.getSource(id),
            getStyle: () => mapRef.current.getStyle(),
            getZoom: () => mapRef.current.getZoom(),
            hasControl: (control) => mapRef.current.hasControl(control),
            hasImage: (id) => mapRef.current.hasImage(id),
            isMoving: () => mapRef.current.isMoving(),
            isRotating: () => mapRef.current.isRotating(),
            isSourceLoaded: (id) => mapRef.current.isSourceLoaded(id),
            isStyleLoaded: () => mapRef.current.isStyleLoaded(),
            isZooming: () => mapRef.current.isZooming(),
            jumpTo: (options, eventData) => mapRef.current.jumpTo(options, eventData),
            listImages: () => mapRef.current.listImages(),
            loaded: () => mapRef.current.loaded(),
            loadImage: (url,callback) => mapRef.current.loadImage(url,callback),
            moveLayer: (id, beforeId) => mapRef.current.moveLayer(id, beforeId),
            offLoad: (func) => mapRef.current.off('load', func),
            onLoad: (func) => mapRef.current.on('load', func),
            panBy: (offset, options, eventData) => mapRef.current.panBy(offset, options, eventData),
            panTo: (lnglat, options, eventData) => mapRef.current.panTo(lnglat, options, eventData),
            project: (lnglat) => mapRef.current.lnglat,
            queryRenderedFeatures: (geometry, options) => mapRef.current.queryRenderedFeatures(geometry, options),
            querySourceFeatures: (sourceId, parameters) => mapRef.current.querySourceFeatures(sourceId, parameters),
            redraw: () => mapRef.current.redraw(),
            resetNorth: (options, eventData) => mapRef.current.resetNorth(options, eventData),
            resetNorthPintch: (options, eventData) => mapRef.current.resetNorthPintch(options, eventData),
            resize: (eventData) => mapRef.current.resize(eventData),
            rotateTo: (bearing, options, eventData) => mapRef.current.rotateTo(bearing,options,eventData),
            setBearing: (bearing, eventData) => mapRef.current.setBearing(bearing, eventData),
            setCenter: (center, eventData) => mapRef.current.setCenter(center, eventData),
            setFeatureState: (feature, state) => mapRef.current.setFeatureState(feature, state),
            setFilter: (layerId, filter, options={}) => mapRef.current.setFilter(layerId, filter, options),
            setLayerZoomRange: (layerId, minzoom, maxzoom) => mapRef.current.setLayerZoomRange(layerId, minzoom, maxzoom),
            setLayoutProperty: (layerId, name, value, options={}) => mapRef.current.setLayoutProperty(layerId, name, value, options),
            setLight: (light, options={}) => mapRef.current.setLight(light, options),
            setMaxBounds: (bounds) => mapRef.current.setMaxBounds(bounds),
            setMaxPitch: (maxPitch) => mapRef.current.setMaxPitch(maxPitch),
            setMaxZoom: (maxZoom) => mapRef.current.setMaxZoom(maxZoom),
            setMinPitch: (minPitch) => mapRef.current.setMinPitch(minPitch),
            setMinZoom: (minZoom) => mapRef.current.setMinZoom(minZoom),
            setPadding: (padding, eventData) => mapRef.current.setPadding(padding, eventData),
            setPaintProperty: (layerId, name, value, options={}) => mapRef.current.setPaintProperty(layerId, name, value, options={}),
            setPitch: (pitch, eventData) => mapRef.current.setPitch(pitch, eventData),
            setPixelRatio: (pixelRatio) => mapRef.current.setPixelRatio(pixelRatio),
            setStyle: (style, options) => mapRef.current.setStyle(style, options),
            setZoom: (zoom, eventData) => mapRef.current.setZoom(zoom, eventData),
            updateImage: (id, image) => mapRef.current.updateImage(id, image),
            zoomIn: (options, eventData) => mapRef.current.zoomIn(options, eventData),
            zoomOut: (options, eventData) => mapRef.current.zoomOut(options, eventData),
            zoomTo: (zoom, options, eventData) => mapRef.current.zoomTo(zoom, options, eventData)
        }
    });
    //***************************Property to be used by the ref father once invoked*******************************************/

    //***************************Events and listener*******************************************/
    useEffect(() =>{
        if (mapRef && mapRef.current && onClick) mapRef.current.on('click',onClick);
        return () => mapRef.current.off('click',onClick);
    },[mapRef, onClick]);

    useEffect(() =>{
        if (mapRef && mapRef.current && onRightClick) mapRef.current.on('contextmenu',onRightClick);
        return () => mapRef.current.off('contextmenu',onRightClick);
    },[mapRef, onRightClick]);

    useEffect(() =>{
        if (mapRef && mapRef.current && onDblClick) mapRef.current.on('dblclick',onDblClick);
        return () => mapRef.current.off('dblclick',onDblClick);
    },[mapRef, onDblClick]);

    useEffect(() =>{
        if (mapRef && mapRef.current && onDrag) mapRef.current.on('drag',onDrag);
        return () => mapRef.current.off('dblclick',onDrag);
    },[mapRef, onDrag]);

    useEffect(() =>{
        if (mapRef && mapRef.current && onDragStart) mapRef.current.on('dragstart',onDragStart);
        return () => mapRef.current.off('dblclick',onDragStart);
    },[mapRef, onDragStart]);

    useEffect(() =>{
        if (mapRef && mapRef.current && onDragEnd) mapRef.current.on('dragend',onDragEnd);
        return () => mapRef.current.off('dblclick',onDragEnd);
    },[mapRef, onDragEnd]);

    useEffect(() =>{
        if (mapRef && mapRef.current && onError) mapRef.current.on('error',onError);
        return () => mapRef.current.off('error',onError);
    },[mapRef, onError]);

    useEffect(() =>{
        if (mapRef && mapRef.current && onLoad) mapRef.current.on('load', onLoad);
        return () => mapRef.current.off('load', onLoad);
    },[mapRef, onLoad]);
    //***************************Events and listener*******************************************/

    useLayoutEffect(() => {
        if (mapRef.current) return;
        mapRef.current = new maplibregl.Map({
            ...options,
            transformRequest: accessToken ? addTokenToUrl : null,
            container: mapContainer.current
        });
        if (navigationControl !== "hidden") {
            mapRef.current.addControl(new maplibregl.NavigationControl(), navigationControl);
        }
    }, []);

    useEffect(() =>  {
        return () => mapRef.current.remove();
    }, []);

    return (
        <MapContext.Provider value={{ mapRef }}>
            <div style={mapContainerCssStyle || {}}>
                <div ref={mapContainer} style={mapCssStyle || {}}>
                    {children}
                </div>
            </div>
        </MapContext.Provider>
    );
}

export default forwardRef(Map);