const STRIPE_PRICES = [
  {
    price: '99.99',
    country: 'GLOBAL',
    character: '&#36;',
    priceId: process.env.REACT_APP_STRIPE_YEARLY_USD_PRICE_ID
  },
  {
    price: '3,499',
    country: 'INDIA',
    character: '&#8377;',
    priceId: process.env.REACT_APP_STRIPE_YEARLY_INR_PRICE_ID
  },
  {
    price: '11,999',
    country: 'NIGERIA',
    character: '&#8358;',
    priceId: process.env.REACT_APP_STRIPE_YEARLY_NGN_PRICE_ID
  }
];

export default STRIPE_PRICES;