import { useState, useEffect } from 'react';

export default function useImagesLoaded(images: any[] | undefined): boolean {

    const [imagesLoaded, setImagesLoaded] = useState(false);
    useEffect(() => {
        if (!images || !images?.length || images.some(item => item === undefined)) {
            if (imagesLoaded) {
                setImagesLoaded(false);
            }
            return;
        }

        const imagesURL = images.map((item) => URL.createObjectURL(item as File));
        const loadImage = (url: string) => {
            return new Promise<string>((resolve, reject) => {
                if (!url) resolve(url);
                const loadImg = new Image();
                loadImg.src = url;
                loadImg.onload = ({ target }) => {
                    if ((target as HTMLImageElement).complete) {
                        resolve(url);
                    }
                };
                loadImg.onerror = err => reject(err);
            });
        };

        Promise.allSettled(imagesURL.map(loadImage))
            .then(() => setImagesLoaded(true))
            .catch(err => console.log('Failed to load images', err));

        // Hủy các URL sau khi hoàn thành để tránh rò rỉ bộ nhớ
        return () => {
            imagesURL.forEach(url => URL.revokeObjectURL(url));
        };
    }, [images]);

    return imagesLoaded;
}
