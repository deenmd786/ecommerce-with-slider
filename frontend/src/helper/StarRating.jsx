import PropTypes from 'prop-types';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating % 1 >= 0.5; // Determine if there's a half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <p className="text-orange-400 flex gap-1 mb-2 md:mb-6 text-xl md:text-2xl">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}
      {/* Render half star if applicable */}
      {halfStar && <FaStarHalf />}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} />
      ))}
    </p>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
