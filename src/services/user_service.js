import { map, switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";

const userSignUpEpic = (action$, state$, { axios }) =>
  action$.pipe(
    ofType("SIGNUPREQUEST"),
    switchMap((data) => {
      return axios
        .put("/authentication/signup", data.payload)
        .then((responseData) => {
          console.log(responseData);
          return {
            type: "SIGNUPDATA",
            payload: { username: "dummy", businessname: "dummy" },
          };
        })
        .catch((errorStatus) => {
          console.log(errorStatus);
          let errorMessage = "unknown server error";
          return {
            type: "SIGNUPERROR",
            payload: { error: true, errormessage: errorMessage },
          };
        });
    }),
    map((data) => {
      console.log(data);
      return data;
    })
  );

export { userSignUpEpic };
