import React, { useState, useEffect } from "react";
import { Layout, Card, Col, Row, Divider, Collapse, Button } from "antd";
import "./Profile.css";
const { Header, Content, Footer, Sider } = Layout;
const { Panel } = Collapse;
import { auth, getSavedPlaces, unsave_place } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { HeartTwoTone } from "@ant-design/icons";

let i;
const saved_places = [];
for (i = 0; i < 20; i++) {
  const title = "Place " + i;
  const hey = (
    <Col span={6}>
      <Card title={title} bordered={false}>
        Card content {i}
      </Card>
    </Col>
  );
  saved_places.push(hey);
}

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [saved_places, setSavedPlaces] = useState([]);

  const getSavedPlacesFunction = async () => {
    getSavedPlaces(user.uid).then((res) => {
      const places = [];
      for (let i in res) {
        const title = res[i].title;
        const hey = (
          <Col span={6} key={i}>
            <Card title={title} bordered={false}>
              <p>{res[i].address ? res[i].address : "No address"}</p>
              <HeartTwoTone
                onClick={() => {
                  unsave_place(res[i].key, user.uid, res[i].type);
                  removeItem(i);
                }}
                twoToneColor={"#eb2f96"}
              />
              {/* <Button
                onClick={() => {
                  unsave_place(res[i].key, user.uid, res[i].type);
                  removeItem(i);
                }}
              >
                Unsave
              </Button> */}
            </Card>
          </Col>
        );
        places.push(hey);
      }
      setSavedPlaces(places);
    });
  };

  useEffect(() => {
    getSavedPlacesFunction();
  }, []);

  const removeItem = (id) => {
    setTimeout(() => {
      getSavedPlacesFunction();
    }, 2500);
  };

  return (
    <>
      <Header className="Profile_Header">
        <h1>Peder Tanberg Hansen</h1>
      </Header>
      <Content>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header={<Divider orientation="left">Lagrede Steder</Divider>} key="1">
            <div className="site-card-wrapper">
              <Row gutter={[16, 16]}>{saved_places}</Row>
            </div>
          </Panel>
        </Collapse>
      </Content>
      {/* <Footer>Footer</Footer> */}
    </>
  );
};
export default Profile;
