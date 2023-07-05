import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ photos, openModal }) {
  return (
    <ul className="gallery">
      <ImageGalleryItem photosData={photos} showModal={openModal} />
    </ul>
  );
}
