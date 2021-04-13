import React from "react";
import { NavLink } from "react-router-dom";
import Radium from "radium";

function RootPage() {
  const linkActive = {
    border: "1px navy",
    backgroundColor: "navy",
    color: "white",
    padding: "10px",
    margin: "10px",
    textDecoration: "none",
    ":hover": {
      textDecoration: "none",
    },
  };

  return (
    <div
      style={{
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "500",
        fontSize: "20px",
        marginBottom: "15px",
      }}
    >
      <NavLink
        to={{
          pathname: "/login",
        }}
        activeClassName="linkActive"
        activeStyle={linkActive}
      >
        Log-In
      </NavLink>
      <NavLink
        to={{
          pathname: "/signup",
        }}
        activeClassName="linkActive"
        activeStyle={linkActive}
      >
        Sign-Up
      </NavLink>
    </div>
  );
}

export default Radium(RootPage);
