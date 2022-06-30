import CarouselGallery from 'react-gallery-carousel';
import '../../../node_modules/react-gallery-carousel/dist/index.css';

export default function Carousel({images}) {
  return (
    <CarouselGallery
      hasLeftButton={false}
      hasRightButton={false}
      hasMediaButton={false}
      hasSizeButton={false}
      hasIndexBoard={false}
      objectFit="contain"
      images={images}
      style={{
        height: '585px',
        maxWidth: '585px',
        width: '100%',
        background: 'white',
      }}
    />
  );
}
