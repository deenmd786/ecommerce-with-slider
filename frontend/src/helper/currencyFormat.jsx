import PropTypes from 'prop-types';

const CurrencyFormat = ({ value, currency, locale }) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);

  return <span>{formattedValue}</span>;
};

CurrencyFormat.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string,
  locale: PropTypes.string,
};

CurrencyFormat.defaultProps = {
  currency: 'INR', // default currency to Indian Rupees
  locale: 'en-IN', // default locale to India
};

export default CurrencyFormat;
