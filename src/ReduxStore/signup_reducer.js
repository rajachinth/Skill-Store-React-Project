import * as rootStore from "./application_state";
import * as actionCreators from "./action_creators";

export const SignupReducer = (state = rootStore.SignUpState, action) => {
  switch (action.type) {
    case actionCreators.SIGNUPREQUEST:
      return state;

    case actionCreators.SIGNUPDATA:
      const signupData = {
        signupstatus: true,
      };
      return Object.assign({}, state, signupData);

    case actionCreators.SIGNUPERROR:
      return Object.assign({}, state, {
        error: action.payload.error,
        errormessage: action.payload.errormessage,
      });

    default:
      return state;
  }
};
