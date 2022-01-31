import {
    useState,
    useContext,
    useEffect,
    useMemo,
    useRef
} from "react";
import { MapContext } from "../map/map.context";
import { createLayer } from "./layer.functions";

let layerCounter = 0;

const Layer = props => {
    const { mapRef } = useContext(MapContext);
    const [layer, setLayer] = useState(null);
    const propsRef = useRef();

    const {
        onClick,
        onDblClick,
        onRightClick
    } = props;

    const id = useMemo(() => props.id || `layer-${layerCounter++}`, []);

    let currLayer = mapRef && mapRef.current && mapRef.current.isStyleLoaded() && mapRef.current.getLayer(id);

    //Layer remotion when the component Unmount
    useEffect(() => {
        return () => {
            if (mapRef.current.getLayer(id)) mapRef.current.removeLayer(id);
        }
    }, []);
    //Layer creation when the component DidMount
    useEffect(() => {
        if (mapRef && !layer) {
            const addLayer = () => {
                currLayer = createLayer(mapRef, id, props);
                setLayer(currLayer);
            };
            mapRef.current.on('sourcedata', addLayer);

            return () => {
                mapRef.current.off('sourcedata', addLayer);
            }
        }
        return;
    }, [mapRef, layer]);

    ////********** Listener section **************/////
    useEffect(() => {
        if ((onClick || onDblClick || onRightClick) && mapRef) {
            const getPointer = () => mapRef.current.getCanvas().style.cursor = 'pointer';
            const removePointer = () => mapRef.current.getCanvas().style.cursor = '';

            mapRef.current.on('mouseenter', id, getPointer);
            mapRef.current.on('mouseleave', id, removePointer);

            return () => {
                mapRef.current.on('mouseenter', id, getPointer);
                mapRef.current.on('mouseleave', id, removePointer);
            }

        }
    }, [mapRef, onClick, onDblClick, onRightClick])
    useEffect(() => {
        if (onClick && mapRef) {
            mapRef.current.on('click', id, onClick);
            return () => mapRef.current.off('click', id, onClick);
        }
        return;
    }, [mapRef, onClick]);
    useEffect(() => {
        if (onDblClick && mapRef) {
            mapRef.current.on('dblclick', id, onDblClick);
            return () => mapRef.current.off('dblclick', id, onDblClick);
        }
        return;
    }, [mapRef, onDblClick]);
    ////****************************************/////

    if (currLayer) {
        //update
    }

    propsRef.current = props;

    return null;

}

export default Layer;