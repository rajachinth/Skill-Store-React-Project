import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import * as actionCreator from "./ReduxStore/action_creators";
import ROOTCONTEXT from "./HOC/RootContext";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Fragment } from "react";
import Loader from "./ComponentsUI/Loader/Loader";
import { StyleRoot } from "radium";
import HomePage from "./HomeComponent/HomePage";
const LoginComponent = lazy(() => import("./LoginComponent/LoginPage")); // Only Client Side Render
const SignupComponent = lazy(() => import("./SignupComponent/SignUpPage")); // Only Client Side Render
const ComponentViewComponent = lazy(() =>
  import("./HomeComponent/ComponentView/ComponentView")
);
const CategoryViewComponent = lazy(() =>
  import("./HomeComponent/CategoryView/CategoryView")
);

class App extends Component {
  render() {
    const rootContextProps = {
      signupstatus: this.props.signupstatus,
      signupError: this.props.signupError,
      signupErrorMessage: this.props.signupErrorMessage,
      spinner: this.props.spinner,
      loginstatus: this.props.loginstatus,
      loginusername: this.props.loginusername,
      loginError: this.props.loginError,
      loginErrorMessage: this.props.loginErrorMessage,
      userLoginRequest: this.props.userLoginRequest,
      userSignupRequest: this.props.userSignupRequest,
    };

    return (
      <StyleRoot>
        <Fragment>
          <ROOTCONTEXT.Provider value={rootContextProps}>
            <BrowserRouter basename="/">
              <Switch>
                <Route
                  path="/home"
                  exact={true}
                  render={() => {
                    return <HomePage />;
                  }}
                />
                <Route
                  path="/login"
                  exact={true}
                  render={() => (
                    <Suspense fallback={<Loader />}>
                      <LoginComponent />
                    </Suspense>
                  )}
                />
                <Route
                  path="/signup"
                  exact={true}
                  render={() => (
                    <Suspense fallback={<Loader />}>
                      <SignupComponent />
                    </Suspense>
                  )}
                />
                <Route
                  path="/skill-view/:id"
                  render={() => (
                    <Suspense fallback={<Loader />}>
                      <ComponentViewComponent />
                    </Suspense>
                  )}
                />
                <Route
                  path="/category/:title"
                  render={() => (
                    <Suspense fallback={<Loader />}>
                      <CategoryViewComponent />
                    </Suspense>
                  )}
                />
                <Redirect from="/" to="/login" />
              </Switch>
            </BrowserRouter>
          </ROOTCONTEXT.Provider>
        </Fragment>
      </StyleRoot>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spinner: state.LoadstateReducer.spinner,
    loginstatus: state.LoginReducer.loginstatus,
    loginusername: state.LoginReducer.username,
    loginError: state.LoginReducer.error,
    loginErrorMessage: state.LoginReducer.errormessage,
    signupstatus: state.SignupReducer.signupstatus,
    signupError: state.SignupReducer.error,
    signupErrorMessage: state.SignupReducer.errormessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginRequest: (data) => dispatch(actionCreator.loginRequest(data)),
    userSignupRequest: (data) => dispatch(actionCreator.signupRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
