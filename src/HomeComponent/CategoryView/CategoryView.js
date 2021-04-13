import React, { Fragment, useContext } from "react";
import { useParams, useLocation } from "react-router";
import CardListComponent from "../CardListComponent/CardListComponent";
import { categoryDetails } from "../../services/dummy_backend";
import ROOTCONTEXT from "../../HOC/RootContext";
import { Link } from "react-router-dom";
import NotAuthenticated from "../../NotAuthenticated/NotAuthenticated";
import classes from "./CategoryView.module.css";

function CategoryView() {
  let params = useParams();
  let location = useLocation();
  console.log(params, location);

  let context = useContext(ROOTCONTEXT);
  if (!context.loginstatus) return <NotAuthenticated />;

  let filterData = categoryDetails.filter((e) => e.title == params.title);
  console.log(filterData);

  return (
    <div>
      <h3
        style={{
          textTransform: "uppercase",
          textAlign: "center",
          color: "navy",
          marginBottom: "25px",
        }}
      >
        {params.title}
      </h3>
      <div className={classes.cardStyle}>
        {filterData[0].technologies.map((e) => (
          <CardListComponent
            type="topskills"
            image={e.image}
            key={e.id}
            id={e.id}
            title={e.title}
            desc={e.description}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryView;
