import React, { Fragment, useContext } from "react";
import { useParams } from "react-router";
import { allSkills } from "../../services/dummy_backend";
import { Card, ListGroup } from "react-bootstrap";
import classes from "./ComponentView.module.css";

import ROOTCONTEXT from "../../HOC/RootContext";
import { Link } from "react-router-dom";
import NotAuthenticated from "../../NotAuthenticated/NotAuthenticated";

function ComponentView() {
  let params = useParams();
  let [filterData] = allSkills.filter((e) => e.id == params.id);

  let context = useContext(ROOTCONTEXT);
  if (!context.loginstatus) return <NotAuthenticated />;

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
        {filterData.title}
      </h3>
      <Card className={classes.cardStyle}>
        <Card.Img
          src={filterData.image}
          style={{ width: "100%", height: "250px", objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Title>{filterData.title}</Card.Title>
          <Card.Text>
            {filterData.title} is top rated on demand skills in the current
            market. It's ranked on the top list in the survey taken from
            thousands of developers across world.
          </Card.Text>
          <Card.Title>Key Highlights</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Available open source community support
            </ListGroup.Item>
            <ListGroup.Item>Clear documentation</ListGroup.Item>
            <ListGroup.Item>Used in top industries</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ComponentView;
