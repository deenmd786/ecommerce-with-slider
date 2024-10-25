import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';

const DisplayImage = ({ onClose, imgUrl }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75">
      <div className="relative max-w-[80vh] max-h-[80vh] flex justify-center items-center">
        {/* Close Icon */}
        <div
          className="absolute hover:text-red-600 top-4 right-4 text-white cursor-pointer"
          onClick={onClose}
        >
          <CgClose size={32} />
        </div>

        {/* Display Image */}
        <img
          src={imgUrl}
          alt="Full Screen Display"
          className="max-w-full max-h-full px-3 object-contain"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </div>
  );
};

DisplayImage.propTypes = {
  onClose: PropTypes.func.isRequired, // Validate onClose as a required function
  imgUrl: PropTypes.string.isRequired, // Validate imgUrl as a required string
};

export default DisplayImage;
