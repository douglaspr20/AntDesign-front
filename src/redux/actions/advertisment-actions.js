import { createAction } from "redux-actions";

const GET_ADVERTISEMENTS_TODAY_BY_PAGE = "GET_ADVERTISEMENTS_TODAY_BY_PAGE";
const SET_ADVERTISEMENTS_TODAY_BY_PAGE = "SET_ADVERTISEMENTS_TODAY_BY_PAGE";
const GET_ADVERTISEMENTS_BY_ADVERTISER = "GET_ADVERTISEMENTS_BY_ADVERTISER";
const SET_ADVERTISEMENTS_BY_ADVERTISER = "SET_ADVERTISEMENTS_BY_ADVERTISER";
const CREATE_ADVERTISEMENT = "CREATE_ADVERTISEMENT";

export const constants = {
  GET_ADVERTISEMENTS_TODAY_BY_PAGE,
  SET_ADVERTISEMENTS_TODAY_BY_PAGE,
  GET_ADVERTISEMENTS_BY_ADVERTISER,
  SET_ADVERTISEMENTS_BY_ADVERTISER,
  CREATE_ADVERTISEMENT,
};

export const getAdvertisementsTodayByPage = createAction(
  GET_ADVERTISEMENTS_TODAY_BY_PAGE,
  (page) => ({ page })
);
export const setAdvertisementsTodayByPage = createAction(
  SET_ADVERTISEMENTS_TODAY_BY_PAGE,
  (advertisement) => ({ advertisement })
);

export const getAdvertisementsByAdvertiser = createAction(
  GET_ADVERTISEMENTS_BY_ADVERTISER,
  (UserId) => ({ UserId })
);
export const setAdvertisementsByAdvertiser = createAction(
  SET_ADVERTISEMENTS_BY_ADVERTISER,
  (advertisements) => ({ advertisements })
);
export const createAdvertisement = createAction(
  CREATE_ADVERTISEMENT,
  (advertisement) => ({ advertisement })
);

export const actions = {
  getAdvertisementsTodayByPage,
  setAdvertisementsTodayByPage,
  getAdvertisementsByAdvertiser,
  setAdvertisementsByAdvertiser,
  createAdvertisement
};
