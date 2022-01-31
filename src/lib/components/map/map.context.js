import { createContext } from "react";

export const MapContext = createContext({
    map: null,
    mapRef: null,
    changeMap: () => {}
});