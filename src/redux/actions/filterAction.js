import { TOGGLE_BRAND } from "../actionTypes/actionTypes.js";

export const toggleFilter = (brandName) => {
  return {
    type: TOGGLE_BRAND,
    payload: brandName,
  };
};
