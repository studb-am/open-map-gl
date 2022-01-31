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

    const id = useMemo(() => props.id || `layer-${layerCounter++}`, []);

    let currLayer = mapRef && mapRef.current && mapRef.current.isStyleLoaded() && mapRef.current.getLayer(id);

    useEffect(() => {
        return () => {
            if (mapRef.current.getLayer(id)) mapRef.current.removeLayer(id);
        }
    },[]);

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

    if (currLayer) {
        //update
    }

    propsRef.current = props;

    return null;

}

export default Layer;