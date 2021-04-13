import React, { Component, Fragment } from "react";
import SpinnerComponent from "../ComponentsUI/Spinner/Spinner";
import ROOTCONTEXT from "../HOC/RootContext";
import Radium from "radium";
import FormElement from "../ComponentsUI/FormElement";
import { UserFormData } from "../HelperFunctions";
import RootPage from "../RootComponent/RootPage";
import { withRouter } from "react-router";
import axios from "../services/axios_setup";
import { STORE } from "../services/store_setup";
import * as actionCreator from "../ReduxStore/action_creators";

class LoginPage extends Component {
  state = {
    loginForm: {
      username: {
        configurations: {
          type: "text",
          placeholder: "enter your username",
        },
        validations: {
          required: true,
        },
        properties: {
          name: "Input",
          label: "Username",
          touched: false,
          valid: true,
          value: "",
          errorMSG: "",
        },
      },
      password: {
        configurations: {
          type: "password",
          placeholder: "enter your password",
        },
        validations: {
          required: true,
        },
        properties: {
          touched: false,
          name: "Input",
          label: "Password",
          valid: true,
          value: "",
          errorMSG: "",
        },
      },
    },
    formValid: false,
  };

  /******************Context values******************/

  static contextType = ROOTCONTEXT;

  /**************************************************/

  userInputData(event, inputKey) {
    let stateCopy = UserFormData(event, inputKey, this.state.loginForm);

    let isFormValid = true; //optimistic approach

    for (let KEY in stateCopy) {
      if (
        isFormValid &&
        stateCopy[KEY].properties.valid &&
        stateCopy[KEY].properties.touched
      )
        isFormValid = true;
      else isFormValid = false;
    }

    this.setState((prevstate, props) => {
      return {
        loginForm: stateCopy,
        formValid: isFormValid,
      };
    });
  }

  submitData = (event) => {
    event.preventDefault();
    const loginData = {
      uniqueID: this.state.loginForm.username.properties.value,
      password: this.state.loginForm.password.properties.value,
    };
    axios
      .post("/authentication/login", loginData)
      .then((responseData) => {
        console.log(responseData);
        this.props.history.replace({
          pathname: "/home",
          search: "?dummyUser",
        });
        STORE.dispatch(
          actionCreator.loginData({ username: "dummy", businessname: "dummy" })
        );
      })
      .catch((errorStatus) => {
        console.log(errorStatus);
        let errorMessage = "";
        if (errorStatus === 400) errorMessage = "invalid username/password";
        else errorMessage = "unknown server error";
        STORE.dispatch(
          actionCreator.loginError({ error: true, errormessage: errorMessage })
        );
      });

    this.context.userLoginRequest(loginData);
  };

  shouldComponentUpdate(nextProps, nextState) {
    // let history = useHistory();
    console.log(nextProps);
    if (nextProps.loginstatus) {
      this.props.history.push("/home");
      return false;
    } else return true;
  }
  componentDidMount() {
    console.log(this.props);
  }
  /**************Styles RADIUM****************/

  formStyle = {
    width: "40%",
    marginLeft: "30%",
    padding: "15px",
    transform: "translateY(10vh)",
    border: "2px solid navy",
    borderRadius: "50px",
    "@media(max-width: 400px)": {
      width: "90%",
      marginLeft: "5%",
    },
    "@media(max-width: 1000px)": {
      width: "50%",
      marginLeft: "25%",
    },
    "@media(max-width: 750px)": {
      width: "60%",
      marginLeft: "20%",
    },
    "@media(max-width: 600px)": {
      width: "70%",
      marginLeft: "15%",
    },
    "@media(max-width: 500px)": {
      width: "80%",
      marginLeft: "10%",
    },
  };
  buttonStyle = {
    textAlign: "center",
    left: "50%",
    color: "white",
    width: "40%",
    transform: "translateX(-50%)",
    padding: "5px",
    position: "relative",
    borderRadius: "20px",
    marginTop: "5%",
    backgroundColor: "#0056b3",
    border: "2px solid #0056b3",
    ":disabled": {
      cursor: "not-allowed",
      opacity: "0.4",
    },
  };
  errorStyle = {
    textAlign: "center",
    color: "red",
    fontWeight: "700",
    paddingTop: "10px",
    fontSize: "14px",
  };
  linkActive = {
    border: "1px navy",
    backgroundColor: "navy",
    color: "white",
    padding: "5px",
    margin: "10px",
    textDecoration: "none",
    ":hover": {
      textDecoration: "none",
    },
  };
  /*******************************************/

  render() {
    let formArray = [];
    let buttonelement = null;
    let errorelement = null;

    for (let KEY in this.state.loginForm) {
      formArray.push({
        id: KEY,
        config: this.state.loginForm[KEY].configurations,
        properties: this.state.loginForm[KEY].properties,
      });
    }

    return (
      <Fragment>
        <div style={{ minHeight: "100vh" }}>
          <form style={this.formStyle} onSubmit={this.submitData}>
            <RootPage />

            {formArray.map((element) => (
              <FormElement
                elementName={element.properties.name}
                key={element.id}
                configProperties={element.config}
                elementValid={element.properties.valid}
                elementValue={element.properties.value}
                errorMSG={element.properties.errorMSG}
                label={element.properties.label}
                UserInputEvent={(event) => {
                  this.userInputData(event, element.id);
                }}
              />
            ))}
            <ROOTCONTEXT.Consumer>
              {(value) => {
                return (buttonelement = value.spinner ? (
                  <button disabled={true} style={this.buttonStyle}>
                    <SpinnerComponent size="sm" />
                  </button>
                ) : (
                  <button
                    disabled={!this.state.formValid}
                    style={this.buttonStyle}
                  >
                    SignIn
                  </button>
                ));
              }}
            </ROOTCONTEXT.Consumer>
            <ROOTCONTEXT.Consumer>
              {(value) => {
                return (errorelement = value.loginError ? (
                  <p style={this.errorStyle}>{value.loginErrorMessage}</p>
                ) : null);
              }}
            </ROOTCONTEXT.Consumer>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Radium(LoginPage));
