import React, { Fragment, useState, useEffect } from "react";
import Radium from "radium";
import classes from "./FormElement.module.css";
import Alert from "react-bootstrap/Alert";

const FormElement = (props) => {
  let errorElement = null;
  const [stateValue, setStateValue] = useState({
    isInvalid: false,
  });

  /**************Styles RADIUM****************/

  let labelStyle = {
    fontWeight: "500",
    color: "#0056b3",
  };

  let alertSyle = {
    padding: "0",
    textAlign: "center",
    fontSize: "14px",
  };

  /*******************************************/

  let HTMLElement = null;
  let defaultStyle = [];
  props.elementValid
    ? defaultStyle.push(classes.elementDefaultStyle)
    : defaultStyle.push(classes.elementErrorStyle);

  useEffect(() => {
    if (!(stateValue.isInvalid === props.elementValid))
      setStateValue((prevState, currentProps) => ({
        isInvalid: props.elementValid,
      }));
  }, [props.elementValid]);

  switch (props.elementName) {
    case "Input":
      HTMLElement = (
        <Fragment>
          <label style={labelStyle}>{props.label}</label>
          <input
            onChange={props.UserInputEvent}
            {...props.configProperties}
            value={props.elementValue}
            className={defaultStyle.join()}
          />
          {
            (errorElement = !stateValue.isInvalid ? (
              <Alert variant="danger" style={alertSyle}>
                {props.errorMSG}
              </Alert>
            ) : null)
          }
        </Fragment>
      );
      break;
    default:
      HTMLElement = alert(`No Handler for type "${props.elementName}"`);
  }

  return <Fragment>{HTMLElement}</Fragment>;
};

export default React.memo(Radium(FormElement));
