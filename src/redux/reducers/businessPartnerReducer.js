import { handleActions } from "redux-actions";

// Action Type Imports
import { constants as businessPartnerConstants } from "../actions/business-partner-actions";
import { Map } from "immutable";
import { cloneDeep } from "lodash";

// businessPartner Page's Reducer
export const reducers = {
  [businessPartnerConstants.SET_BUSINESS_PARTNER_MEMBERS]: (state, { payload }) => {
    return state.merge({
      businessPartnerMembers: payload.businessPartnerMembers,
    });
  },
  [businessPartnerConstants.SET_BUSINESS_PARTNER_RESOURCES]: (state, { payload }) => {
    return state.merge({
      businessPartnerResources: payload.businessPartnerResources,
    });
  },
  [businessPartnerConstants.SET_BUSINESS_PARTNER_RESOURCE]: (state, { payload }) => {
    return state.merge({
      businessPartnerResource: payload.businessPartnerResource,
    });
  },
  [businessPartnerConstants.UPDATE_BUSINESS_PARTNER_RESOURCES_INFORMATION]: (
    state,
    { payload }
  ) => {
    return state.merge({
      businessPartnerResources: cloneDeep(payload.businessPartnerResources),
    });
  },
};

export const initialState = () =>
  Map({
    businessPartner: [],
    businessPartnerResources: [],
    businessPartnerlResource: null,
  });

export default handleActions(reducers, initialState());
