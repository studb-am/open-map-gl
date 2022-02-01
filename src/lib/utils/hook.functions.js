import { useEffect } from 'react';

export const useImageIcon = (map, imageName, imageUrl) => {
    useEffect(() => {
        if (map && map.current) {
            const createImage = () => {
                map.current.loadImage(
                    imageUrl,
                    function (error, image) {
                        if (error) throw error;
                        map.current.addImage(imageName, image);
                    }
                )
            };
            map.current.onLoad(createImage);
            return () => map.current.offLoad(createImage);
        }
    }, [map])
}