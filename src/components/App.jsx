import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { fetchPhotos } from 'services/api';

import { toast } from 'react-toastify';
import { useEffect } from 'react';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export function App() {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState({});

  const handleSubmit = searchQuery => {
    if (searchQuery === query) {
      return;
    }

    setPage(1);
    setQuery(searchQuery);
    setPhotos([]);
  };

  const showModalWindow = largeImage => {
    setShowModal(prevState => !prevState);
    setModalImage(largeImage);
  };

  const hideModalWindow = () => {
    setShowModal(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    async function getImages(query) {
      if (!query) {
        return;
      }
      setLoading(true);

      try {
        const { hits, totalHits } = await fetchPhotos(query, page);

        if (totalHits < 1) {
          setError(`${query} is not found`);
          toast.error(`${query} is not found`, toastConfig);
        } else {
          setError(null);
        }

        setPhotos(prevState => [...prevState, ...hits]);
        setTotalHits(prevState => totalHits);
      } catch (error) {
        setError('Something went wrong');
        toast.error('Something went wrong', toastConfig);
      } finally {
        setLoading(false);
      }
    }

    getImages(query);
  }, [page, query]);

  return (
    <div>
      <Searchbar handleSubmit={handleSubmit} />
      {photos && <ImageGallery photos={photos} openModal={showModalWindow} />}
      {showModal && (
        <Modal hideModal={hideModalWindow} largeImage={modalImage} />
      )}
      {loading && <Loader />}
      {photos.length > 0 && Math.ceil(totalHits / 12) > page && (
        <Button onClickLoadMore={loadMore} />
      )}
    </div>
  );
}
