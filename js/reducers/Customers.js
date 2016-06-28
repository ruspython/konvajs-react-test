"use strict";

import * as constants from "../constants/ActionTypes";

const initialState = {
  customers: [],
  customersLoading: false,
  customersLoaded: false

};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case constants.LOAD_CUSTOMERS:
      return {
        ...state,
        customersLoading: true,
        customersLoaded: false,
        customers: []
      };
    case constants.LOAD_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.result,
        customersLoading: false,
        customersLoaded: true
      };
    case constants.LOAD_CUSTOMERS_FAIL:
      return {
        ...state,
        customersLoading: false,
        customersLoaded: true
      };

    default:
      return state;
  }
}
