export default {
  STRIPE_PRICES: [
    {
      price: '119',
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
  ],
  CHANNELS_STRIPE_PRICES: [
    {
      price: '250',
      country: 'GLOBAL',
      character: '&#36;',
      priceId: process.env.REACT_APP_STRIPE_YEARLY_USD_PRICE_CHANNELS_ID
    },
    {
      price: '18,798',
      country: 'INDIA',
      character: '&#8377;',
      priceId: process.env.REACT_APP_STRIPE_YEARLY_INR_PRICE_CHANNELS_ID
    },
    {
      price: '95,125',
      country: 'NIGERIA',
      character: '&#8358;',
      priceId: process.env.REACT_APP_STRIPE_YEARLY_NGN_PRICE_CHANNELS_ID
    }
  ]
}