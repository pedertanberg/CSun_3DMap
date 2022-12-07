import React from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const Cards = () => {
  const { Meta } = Card;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col span={8} className="gutter-row">
          <Link to={{ pathname: "KartSimulering", mapProp: { city: "Cph" } }}>
            <Card
              onClick={() => console.log("clicked copenhagen")}
              hoverable
              // style={{ width: 240 }}
              cover={
                <img
                  alt="Sunny Copenhagen"
                  src="https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              }
            >
              <Meta title="København" description="Danmark" />
            </Card>
          </Link>
        </Col>
        <Col span={8} className="gutter-row">
          <Link to={{ pathname: "KartSimulering", mapProp: { city: "Stck" } }}>
            <Card
              hoverable
              // style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://images.pexels.com/photos/3030468/pexels-photo-3030468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              }
            >
              <Meta title="Stockholm" description="Sverige" />
            </Card>
          </Link>
        </Col>
        <Col span={8} className="gutter-row">
          <Link to={{ pathname: "KartSimulering", mapProp: { city: "Osl" } }}>
            <Card
              hoverable
              // style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://images.pexels.com/photos/10206140/pexels-photo-10206140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              }
            >
              <Meta title="Oslo" description="Norge" />
            </Card>
          </Link>
        </Col>
        <Col span={8} className="gutter-row">
          <Link to={{ pathname: "KartSimulering", mapProp: { city: "Lund" } }}>
            <Card
              hoverable
              // style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://images.pexels.com/photos/5759484/pexels-photo-5759484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              }
            >
              <Meta title="Lund" description="Sverige" />
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
