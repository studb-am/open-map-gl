import maplibregl from 'maplibre-gl';

export const addElemToMap = (map, elem, objs) => {
    switch (elem?.type?.name) {
        case 'SymbolLayer':
            objs.push({ type:'layer', id: elem.props.layerID, sourceID: elem.props.sourceID });
            map.current.addLayer({
                id: elem.props.layerID,
                type: 'symbol',
                source: elem.props.sourceID,
                filter: elem.props.filter,
                layout: elem.props.layout,
                
            });
            return objs;
        case 'CircleLayer':
            objs.push({ type:'layer', id: elem.props.layerID, sourceID: elem.props.sourceID });
            map.current.addLayer({
                id: elem.props.layerID,
                type: 'circle',
                source: elem.props.sourceID,
                filter: elem.props.filter,
                paint: elem.props.paint
            });
            return objs;
        case 'GeojsonSource':
            const { data, id, children } = elem.props;
            if (!children) throw new Error('Source must always have one or more layer as a children');
            const objIndex = objs.findIndex(obj => obj.type==='source' && obj.id === id);
            if (objIndex>=0) {
                map.current.getSource(id).setData(data);
            } else {
                map.current.on('load', () => {
                    objs.push({ type:'source', id: id });
                    map.current.addSource(
                        id,
                        {
                            'type': 'geojson',
                            'data': data
                        }
                    );
                    let UiElems;
                    if (Array.isArray(children)) {
                        UiElems = children;
                    } else {
                        UiElems = [children];
                    }
                    UiElems.map(elem => {
                        objs = addElemToMap(map, elem, objs);
                    })
                })
            }
            
            return objs;
        default:
            return objs;
    }
}