import { useEffect } from 'react';

export const usePngImage = (map, imageName, imageUrl) => {
    useEffect(() => {
        if (map && map.current) {
            map.current.onLoad(() => {
                map.current.loadImage(
                    imageUrl,
                    function (error, image) {
                        if (error) throw error;
                        map.current.addImage(imageName, image);
                    }
                )
            })
        }
    }, [map])
}