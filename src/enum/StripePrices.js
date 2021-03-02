const STRIPE_PRICES = [
  {
    price: '99.99',
    country: 'GLOBAL',
    priceId: process.env.REACT_APP_STRIPE_YEARLY_USD_PRICE_ID
  },
  {
    price: '3,499',
    country: 'INDIA',
    priceId: process.env.REACT_APP_STRIPE_YEARLY_INR_PRICE_ID
  },
  {
    price: '11,999',
    country: 'NIGERIA',
    priceId: process.env.REACT_APP_STRIPE_YEARLY_NGN_PRICE_ID
  }
];

export default STRIPE_PRICES;