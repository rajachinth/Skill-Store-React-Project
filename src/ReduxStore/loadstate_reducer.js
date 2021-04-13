import * as rootStore from "./application_state";
import * as actionCreators from "./action_creators";

export const LoadstateReducer = (state = rootStore.LoadState, action) => {
  switch (action.type) {
    case actionCreators.SPINNER:
      return Object.assign({}, state, { spinner: action.payload });

    default:
      return state;
  }
};
