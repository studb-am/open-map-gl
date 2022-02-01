import maplibregl from 'maplibre-gl'

export const createPopup = params => {
    const { text, html, coords, options } = params;

    const popup = new maplibregl.Popup(options).setLngLat(coords);

    if (text) {
        popup.setText(text);
    }
    if (html) {
        popup.setHTML(html);
    }

    return popup;
}