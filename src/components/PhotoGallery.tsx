'use client';

import { useEffect, useRef } from 'react';

import 'photoswipe/style.css';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

import { Image } from '@/types/Image.type';

interface GalleryProps {
  images: Image[];
}

export default function PhotoGallery({ images }: GalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = null;
    if (galleryRef.current) {
      lightbox = new PhotoSwipeLightbox({
        gallery: galleryRef.current,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();
    }
    return () => {
      lightbox?.destroy();
    };
  }, []);

  return (
    <div ref={galleryRef} className='grid grid-cols-2 gap-4 p-4'>
      {images.map((image, index) => (
        <a
          key={index}
          href={image.url}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          target='_blank'
          rel='noreferrer'
          className='block'
        >
          <img
            src={image.url}
            alt={image.caption || 'Gallery Image'}
            className='w-full h-60 object-cover rounded-lg cursor-pointer'
          />
        </a>
      ))}
    </div>
  );
}
