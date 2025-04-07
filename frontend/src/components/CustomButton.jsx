import PropTypes from 'prop-types'; // Import PropTypes for validation

const CustomButton = ({ name, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={` ${className} bg-red-500 px-2 py-1 md:px-4 md:py-2 rounded text-white hover:bg-red-600`}
    >
      {name}
    </button>
  );
};

// Add PropTypes validation
CustomButton.propTypes = {
  name: PropTypes.string.isRequired, // 'name' must be a string and required
  onClick: PropTypes.func.isRequired, // 'onClick' must be a function and required
  className: PropTypes.string, // 'className' is optional and must be a string
};

export default CustomButton;
