'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const MasonryGallery = ({ images }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    console.log(`Images loaded: ${imagesLoaded} / ${images.length}`);
    if (imagesLoaded === images.length) {
      console.log('All images loaded');
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded, images.length]);

  const handleImageLoad = () => {
    console.log(imagesLoaded);
    
    // Check if imagesLoaded was already updated to its final value.
    if (imagesLoaded !== images.length) {
      setImagesLoaded(images.length);
    } else {
      // If it's not, update it immediately.
      setImagesLoaded(images.length);
    }
  };
  

  // if (!allImagesLoaded) {
  //   return (
  //     <div className="flex flex-col justify-center items-center">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 m-4"></div>
  //       <p className="ml-4">Loading... {imagesLoaded} / {images.length}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="masonry-gallery">
      {images.map((image, index) => (
        <div key={index} className="masonry-item">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            style={{ width: '100%', height: 'auto' }}
            priority={index === 0}
            onLoad={handleImageLoad}
            onError={(e) => console.error(`Error loading image: ${image.src}`, e)}
          />
        </div>
      ))}
      <style jsx>{`
        .masonry-gallery {
          column-count: 5;
          column-gap: 35px;
        }
        @media (max-width: 768px) {
          .masonry-gallery {
            column-count: 2;
          }
        }
        @media (max-width: 480px) {
          .masonry-gallery {
            column-count: 1;
          }
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 35px;
        }
      `}</style>
    </div>
  );
};

const ClientPage = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
  const originalImages = [
    { src: 'https://picsum.photos/id/1018/800/600', alt: 'Sample 1', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1015/600/800', alt: 'Sample 2', width: 600, height: 800 },
    { src: 'https://picsum.photos/id/1019/800/600', alt: 'Sample 3', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1016/600/800', alt: 'Sample 4', width: 600, height: 800 },
    { src: 'https://picsum.photos/id/1020/800/800', alt: 'Sample 5', width: 800, height: 800 },
    { src: 'https://picsum.photos/id/1021/800/600', alt: 'Sample 6', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1023/800/600', alt: 'Sample 7', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1024/800/600', alt: 'Sample 8', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1025/800/600', alt: 'Sample 9', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1026/600/800', alt: 'Sample 10', width: 600, height: 800 },
    { src: 'https://picsum.photos/id/1018/800/600', alt: 'Sample 1', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1015/600/800', alt: 'Sample 2', width: 600, height: 800 },
    { src: 'https://picsum.photos/id/1019/800/600', alt: 'Sample 3', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1016/600/800', alt: 'Sample 4', width: 600, height: 800 },
    { src: 'https://picsum.photos/id/1020/800/800', alt: 'Sample 5', width: 800, height: 800 },
    { src: 'https://picsum.photos/id/1021/800/600', alt: 'Sample 6', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1023/800/600', alt: 'Sample 7', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1024/800/600', alt: 'Sample 8', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1025/800/600', alt: 'Sample 9', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1026/600/800', alt: 'Sample 10', width: 600, height: 800 },
    { src: 'https://picsum.photos/id/1018/800/600', alt: 'Sample 1', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1015/600/800', alt: 'Sample 2', width: 600, height: 800 },
    { src: 'https://picsum.photos/id/1019/800/600', alt: 'Sample 3', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1016/600/800', alt: 'Sample 4', width: 600, height: 800 },
    { src: 'https://picsum.photos/id/1020/800/800', alt: 'Sample 5', width: 800, height: 800 },
    { src: 'https://picsum.photos/id/1021/800/600', alt: 'Sample 6', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1023/800/600', alt: 'Sample 7', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1024/800/600', alt: 'Sample 8', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1025/800/600', alt: 'Sample 9', width: 800, height: 600 },
    { src: 'https://picsum.photos/id/1026/600/800', alt: 'Sample 10', width: 600, height: 800 },
  ];

  // Randomize the order of the images
  const randomizedImages = originalImages.sort(() => Math.random() - 0.5);
  setImages(randomizedImages);
  }, []);

  return (
    <div className="w-screen mx-auto px-8 py-8 flex flex-col items-center space-y-8">
      <div className='h-32 w-32 rounded-full bg-gray-200 py-8 border-8  hover:scale-105 duration-200 transition-all' />
      <h1 className="text-6xl font-light mb-6 font-serif text-center animate-fadeInUp">Username</h1>
      <p className='w-[80vw] md:w-[40vw] text-justify animate-fadeInUp delay-150'>Et labore ea veniam nostrud consequat eu sunt quis non reprehenderit excepteur irure duis. Duis qui fugiat aliquip enim. Laborum commodo tempor consectetur est nostrud irure veniam minim. Cupidatat pariatur aliqua incididunt elit proident sint.</p>
    
      <div className='pt-8'>
        <MasonryGallery images={images} />
      </div>
    </div>
  );
};

export default ClientPage;