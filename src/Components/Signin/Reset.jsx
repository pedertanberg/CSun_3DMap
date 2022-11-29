/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component, useState, useEffect } from "react";
import { Layout, Menu, Button, Row, Col, Typography, Form, Input, Switch } from "antd";
import sunimg from "../../assets/Spline_Signin.png";
import { Link, useHistory } from "react-router-dom";
import { auth, sendPasswordReset } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../../assets/Terra.svg";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate.push("/Home");
  }, [user, loading]);

  const onFinish = (values) => {
    console.log("Success:", values);
    sendPasswordReset(values.email);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <img src={logo} alt="" width={60} height={60} />

          <div className="header-col header-brand">
            <h5>CSun</h5>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
              <Title className="mb-15">Reset Password</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email to reset password
              </Title>
              <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="row-col">
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!"
                    }
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                    Send Password-Reset link
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
              <img src={sunimg} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
export default SignIn;
