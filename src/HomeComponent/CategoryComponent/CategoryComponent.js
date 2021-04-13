import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import ROOTCONTEXT from "../../HOC/RootContext";
import NotAuthenticated from "../../NotAuthenticated/NotAuthenticated";

function CategoryComponent(props) {
  let context = useContext(ROOTCONTEXT);
  if (!context.loginstatus) return <NotAuthenticated />;

  return (
    <div style={{ margin: "0 40px" }}>
      <Link
        to={{
          pathname: `/${props.type}/${props.title}`,
        }}
      >
        <img
          id={props.id}
          src={props.image}
          style={{ height: "200px", width: "200px" }}
        />
        <h6 style={{ textAlign: "center" }}>{props.title}</h6>
      </Link>
    </div>
  );
}

export default CategoryComponent;
