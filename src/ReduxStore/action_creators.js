export const LOGINDATA = "LOGINDATA";
export const SPINNER = "SPINNER";
export const LOGINREQUEST = "LOGINREQUEST";
export const LOGINERROR = "LOGINERROR";
export const SIGNUPREQUEST = "SIGNUPREQUEST";
export const SIGNUPDATA = "SIGNUPDATA";
export const SIGNUPERROR = "SIGNUPERROR";
export const CLEARDATA = "CLEARDATA";

export const signupRequest = (signupdata) => {
  return { type: SIGNUPREQUEST, payload: signupdata };
};

export const signupData = (signupdata) => {
  return { type: SIGNUPDATA, payload: signupdata };
};

export const signupError = (signupdata) => {
  return { type: SIGNUPERROR, payload: signupdata };
};

export const loginRequest = (userdata) => {
  return (dispatch, getState) => {
    console.log(getState().LoginReducer.error);
    if (getState().LoginReducer.error) {
      dispatch({
        type: LOGINERROR,
        payload: { error: false, errormessage: "unkown internal error" },
      });
    }
    return dispatch({ type: LOGINREQUEST, payload: userdata });
  };
};

export const loginData = (userdata) => {
  return (dispatch, getState) => {
    return dispatch({ type: LOGINDATA, payload: userdata });
  };
};

export const spinner = (userdata) => {
  return { type: SPINNER, payload: userdata };
};

export const loginError = (userdata) => {
  return { type: LOGINERROR, payload: userdata };
};
