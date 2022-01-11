import { createAction } from "redux-actions";

const GET_BUSINESS_PARTNER_MEMBERS = "GET_BUSINESS_PARTNER_MEMBERS";
const SET_BUSINESS_PARTNER_MEMBERS = "SET_BUSINESS_PARTNER_MEMBERS";
const CREATE_BUSINESS_PARTNER_RESOURCE = "CREATE_BUSINESS_PARTNER_RESOURCE";
const SET_BUSINESS_PARTNER_RESOURCE = "SET_BUSINESS_PARTNER_RESOURCE";
const GET_BUSINESS_PARTNER_RESOURCE = "GET_BUSINESS_PARTNER_RESOURCE";
const SET_BUSINESS_PARTNER_RESOURCES = "SET_BUSINESS_PARTNER_RESOURCES";
const UPDATE_BUSINESS_PARTNER_RESOURCES_INFORMATION =
  "UPDATE_BUSINESS_PARTNER_RESOURCES_INFORMATION";
const GET_BUSINESS_PARTNER_RESOURCES = "GET_BUSINESS_PARTNER_RESOURCES";

export const constants = {
  GET_BUSINESS_PARTNER_MEMBERS,
  SET_BUSINESS_PARTNER_MEMBERS,
  CREATE_BUSINESS_PARTNER_RESOURCE,
  SET_BUSINESS_PARTNER_RESOURCES,
  UPDATE_BUSINESS_PARTNER_RESOURCES_INFORMATION,
  SET_BUSINESS_PARTNER_RESOURCE,
  GET_BUSINESS_PARTNER_RESOURCE,
  GET_BUSINESS_PARTNER_RESOURCES,
};

export const getBusinessPartnerMembers = createAction(
  GET_BUSINESS_PARTNER_MEMBERS
);
export const setBusinessPartnerMembers = createAction(
  SET_BUSINESS_PARTNER_MEMBERS,
  (businessPartnerMembers) => ({ businessPartnerMembers })
);

export const getBusinessPartnerResources = createAction(
  GET_BUSINESS_PARTNER_RESOURCES
);

export const getBusinessPartnerResourceById = createAction(
  GET_BUSINESS_PARTNER_RESOURCE,
  (id, callback) => ({
    id,
    callback,
  })
);
export const setBusinessPartnerResource = createAction(
  SET_BUSINESS_PARTNER_RESOURCE,
  (businessPartnerResource) => ({ businessPartnerResource })
);

export const updateBusinessPartnerResourcesInformation = createAction(
  UPDATE_BUSINESS_PARTNER_RESOURCES_INFORMATION,
  (businessPartnerResources) => ({
    businessPartnerResources,
  })
);
export const setBusinessPartnerResources = createAction(
  SET_BUSINESS_PARTNER_RESOURCES,
  (businessPartnerResources) => ({
    businessPartnerResources,
  })
);
export const createBusinessPartnerResource = createAction(
  CREATE_BUSINESS_PARTNER_RESOURCE,
  (businessPartner, callback) => ({
    businessPartner,
    callback,
  })
);

export const actions = {
  getBusinessPartnerMembers,
  setBusinessPartnerMembers,
  getBusinessPartnerResources,
  setBusinessPartnerResource,
  getBusinessPartnerResourceById,
  updateBusinessPartnerResourcesInformation,
  setBusinessPartnerResources,
  createBusinessPartnerResource,
};
