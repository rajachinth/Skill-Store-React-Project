import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import ROOTCONTEXT from "../HOC/RootContext";

import CategoryComponent from "./CategoryComponent/CategoryComponent";
import CardListComponent from "./CardListComponent/CardListComponent";
import {
  categoryDetails,
  TopSkills,
  LatestSkills,
} from "../services/dummy_backend";
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated";

import Radium from "radium";

function HomePage() {
  const cardStyle = {
    display: "flex",
    "@media(max-width:500px)": {
      display: "block",
      textAlign: "center",
    },
  };

  let context = useContext(ROOTCONTEXT);
  if (context.loginstatus)
    return (
      <Fragment>
        <h1
          style={{
            textTransform: "uppercase",
            color: "navy",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Welcome! {context.loginusername}
        </h1>
        <div style={{ margin: "10px 0" }}>
          <h5 style={{ textTransform: "uppercase", color: "navy" }}>
            Skill Category
          </h5>
          <div style={cardStyle}>
            {categoryDetails.map((e) => (
              <CategoryComponent
                type="category"
                key={e.id}
                image={e.image}
                title={e.title}
                id={e.id}
              />
            ))}
          </div>
        </div>
        <div style={{ margin: "10px 0" }}>
          <h5 style={{ textTransform: "uppercase", color: "navy" }}>
            Top Skills
          </h5>
          <div style={cardStyle}>
            {TopSkills.map((e) => (
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
        <div style={{ margin: "10px 0" }}>
          <h5 style={{ textTransform: "uppercase", color: "navy" }}>
            Latest Skills
          </h5>
          <div style={cardStyle}>
            {LatestSkills.map((e) => (
              <CardListComponent
                type="latestskills"
                image={e.image}
                key={e.id}
                id={e.id}
                title={e.title}
                desc={e.description}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  else return <NotAuthenticated />;
}

export default Radium(HomePage);
