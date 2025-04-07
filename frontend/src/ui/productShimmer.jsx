import PropTypes from 'prop-types';
import { useState } from 'react';

function ImageMagnifier({ 
  src, 
  width = '100%',  // Default width
  height = '100%', // Default height
  magnifierHeight = 100, 
  magnifierWidth = 100, 
  zoomLevel = 5,
  wrapperClassName = '', // Dynamic wrapper class
  imageClassName = '',   // Dynamic image class
  magnifierClassName = '', // Dynamic magnifier class
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  // Wrapper inline style object
  const wrapperStyle = {
    width,
    height,
    maxWidth: '100%',
    maxHeight: '100%',
  };

  // Magnifier inline style object
  const magnifierStyle = {
    width: `${magnifierWidth}px`,
    height: `${magnifierHeight}px`,
    left: `${x - magnifierWidth / 2}px`,
    top: `${y - magnifierHeight / 2}px`,
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
    backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
  };

  return (
    <div 
      className={`relative overflow-hidden ${wrapperClassName}`} 
      style={wrapperStyle}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
    >
      <img 
        src={src} 
        className={`object-contain w-full h-full ${imageClassName} md:block`} // Only visible on medium screens and above
        onLoad={(e) => {
          setSize([e.target.width, e.target.height]);
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setXY([x, y]);
        }}
        alt="Magnifiable"
      />
      {/* Show magnifier only on medium screens and above */}
      {showMagnifier && (
        <div 
          className={`absolute pointer-events-none border border-gray-300 rounded-full overflow-hidden hidden md:block ${magnifierClassName}`} // Only visible on medium screens and above
          style={magnifierStyle}
        />
      )}
    </div>
  );
}

ImageMagnifier.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  magnifierHeight: PropTypes.number,
  magnifierWidth: PropTypes.number,
  zoomLevel: PropTypes.number,
  wrapperClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  magnifierClassName: PropTypes.string,
};

export default ImageMagnifier;
