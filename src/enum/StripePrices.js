export default {
  STRIPE_PRICES: [
    {
      price: "119",
      country: "GLOBAL",
      character: "&#36;",
      priceId: process.env.REACT_APP_STRIPE_YEARLY_USD_PRICE_ID,
    },
    {
      price: "3,499",
      country: "INDIA",
      character: "&#8377;",
      priceId: process.env.REACT_APP_STRIPE_YEARLY_INR_PRICE_ID,
    },
    {
      price: "11,999",
      country: "NIGERIA",
      character: "&#8358;",
      priceId: process.env.REACT_APP_STRIPE_YEARLY_NGN_PRICE_ID,
    },
  ],
  CHANNELS_STRIPE_PRICES: [
    {
      price: "250",
      country: "GLOBAL",
      character: "&#36;",
      priceId: process.env.REACT_APP_STRIPE_YEARLY_USD_PRICE_CHANNELS_ID,
    },
    {
      price: "18,798",
      country: "INDIA",
      character: "&#8377;",
      priceId: process.env.REACT_APP_STRIPE_YEARLY_INR_PRICE_CHANNELS_ID,
    },
    {
      price: "95,125",
      country: "NIGERIA",
      character: "&#8358;",
      priceId: process.env.REACT_APP_STRIPE_YEARLY_NGN_PRICE_CHANNELS_ID,
    },
  ],
  RECRUITER_STRIPE_PRICES: [
    {
      price: "250",
      country: "GLOBAL",
      character: "&#36;",
      priceId: process.env.REACT_APP_STRIPE_YEARLY_USD_PRICE_RECRUITER_ID,
    },
  ],
  ADVERTISER_PRICE: [
    {
      price: "100",
      country: "GLOBAL",
      character: "&#36",
      priceId: process.env.REACT_APP_STRIPE_ONE_TIME_ADVERTISER_ID,
    },
  ],
  ADVERTISEMENT_CREDITS_STRIPE_PRICES: [
    {
      price: "100",
      credits: 10,
      country: "GLOBAL",
      character: "&#36",
      priceId: process.env.REACT_APP_STRIPE_ADVERTISER_CREDIT_10_CREDITS_ID,
    },
    {
      price: 200,
      credits: "20",
      country: "GLOBAL",
      character: "&#36",
      priceId: process.env.REACT_APP_STRIPE_ADVERTISER_CREDIT_20_CREDITS_ID,
    },
    {
      price: "300",
      credits: 30,
      country: "GLOBAL",
      character: "&#36",
      priceId: process.env.REACT_APP_STRIPE_ADVERTISER_CREDIT_30_CREDITS_ID,
    },
  ],
};
