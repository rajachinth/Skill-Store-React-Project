import React, { Component, Fragment } from "react";
import SpinnerComponent from "../ComponentsUI/Spinner/Spinner";
import ROOTCONTEXT from "../HOC/RootContext";
import Radium from "radium";
import FormElement from "../ComponentsUI/FormElement";
import { UserFormData } from "../HelperFunctions";
import RootPage from "../RootComponent/RootPage";

class SignUpPage extends Component {
  state = {
    SignUpForm: {
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
      email: {
        configurations: {
          type: "email",
          placeholder: "enter your email",
        },
        validations: {
          required: true,
        },
        properties: {
          touched: false,
          name: "Input",
          label: "email",
          valid: true,
          value: "",
          errorMSG: "",
        },
      },
      mobile: {
        configurations: {
          type: "number",
          placeholder: "enter your mobile number",
        },
        validations: {
          required: true,
        },
        properties: {
          touched: false,
          name: "Input",
          label: "mobile number",
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
    let stateCopy = UserFormData(event, inputKey, this.state.SignUpForm);

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
        SignUpForm: stateCopy,
        formValid: isFormValid,
      };
    });
  }

  submitData = (event) => {
    event.preventDefault();
    const signupData = {
      username: this.state.SignUpForm.username.properties.value,
      email: this.state.SignUpForm.email.properties.value,
      mobile: this.state.SignUpForm.mobile.properties.value,
      password: this.state.SignUpForm.password.properties.value,
    };

    console.log(signupData);

    this.context.userSignupRequest(signupData);
  };

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

    for (let KEY in this.state.SignUpForm) {
      formArray.push({
        id: KEY,
        config: this.state.SignUpForm[KEY].configurations,
        properties: this.state.SignUpForm[KEY].properties,
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
                    Register
                  </button>
                ));
              }}
            </ROOTCONTEXT.Consumer>
            <ROOTCONTEXT.Consumer>
              {(value) => {
                return (errorelement = value.signupError ? (
                  <p style={this.errorStyle}>{value.signupErrorMessage}</p>
                ) : null);
              }}
            </ROOTCONTEXT.Consumer>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Radium(SignUpPage);
