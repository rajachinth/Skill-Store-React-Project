import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./CardListComponent.module.css";

function CardListComponent(props) {
  return (
    <div style={{ margin: "20px 0" }}>
      <Link
        to={{
          pathname: `/skill-view/${props.id}`,
          search: `${props.type}`,
        }}
      >
        <Card className={classes.cardStyle}>
          <Card.Img
            variant="top"
            src={props.image}
            style={{ with: "100%", height: "150px" }}
          />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.desc}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default CardListComponent;
