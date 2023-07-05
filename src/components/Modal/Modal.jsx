import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal');

export function Modal({ hideModal, largeImage }) {
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        hideModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hideModal]);

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={largeImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

// export class Modal extends Component {
// handleKeyDown = event => {
//   if (event.code === 'Escape') {
//     this.props.showModal();
//   }
// };

// handleBackdropClick = event => {
//   if (event.target === event.currentTarget) {
//     this.props.showModal();
//   }
// };

//   componentDidMount() {
// window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   render() {
// return createPortal(
//   <div className="overlay" onClick={this.handleBackdropClick}>
//     <div className="modal">
//       <img src={this.props.largeImage} alt="" />
//     </div>
//   </div>,
//   modalRoot
// );
//   }
// }
