import { Fragment } from "react";

function WrapperComponent(props) {
  return <Fragment>{props.children}</Fragment>;
}

export default WrapperComponent;
