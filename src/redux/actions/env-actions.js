import { createAction } from "redux-actions";

// supportedLanguages array
import supportedLanguages from "../../config/supportedLanguages";

// Action Types
const SET_ENV = "SET_ENV";
const SET_DIMENSIONS = "SET_DIMENSIONS";
const SET_IS_MOBILE = "SET_IS_MOBILE";
const SET_COLLAPSED = "SET_COLLAPSED";
const SET_LANG = "SET_LANG";

export const constants = {
  SET_ENV,
  SET_DIMENSIONS,
  SET_IS_MOBILE,
  SET_COLLAPSED,
  SET_LANG,
};

// ------------------------------------
// Actions
// ------------------------------------
export const setEnv = createAction(SET_ENV, (env) => ({ env }));
export const setDimensions = createAction(SET_DIMENSIONS, (width, height) => ({
  width,
  height,
}));
export const setIsMobile = createAction(SET_IS_MOBILE, (isMobile) => ({
  isMobile,
}));
export const setCollapsed = createAction(SET_COLLAPSED, (collapsed) => ({
  collapsed,
}));
export const setLang = createAction(SET_LANG, (lang) => ({
  lang: supportedLanguages.includes(lang) ? lang : "en",
}));

export const actions = {
  setEnv,
  setDimensions,
  setIsMobile,
  setCollapsed,
  setLang,
};
