import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

function NotAuthenticated() {
  return (
    <Fragment>
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <h4 style={{ textTransform: "uppercase", color: "red" }}>
          your are not authenticated to view this page
        </h4>
        <h3>
          <span>
            <Link
              to={{
                pathname: "/login",
              }}
            >
              Login
            </Link>
          </span>{" "}
          here to view this page
        </h3>
      </div>
    </Fragment>
  );
}

export default NotAuthenticated;
