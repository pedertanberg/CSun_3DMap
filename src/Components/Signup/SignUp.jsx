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
import { Layout, Button, Typography, Card, Form, Input, Checkbox } from "antd";
import { Link, useHistory } from "react-router-dom";
import Iubenda from "react-iubenda-policy";

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
  signInWithMicrosoft
} from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Icon, { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import logo from "../../assets/Terra.svg";
import MicrosoftLogo from "../../assets/microsoft.svg";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignUp = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
    registerWithEmailAndPassword(values.name, values.email, values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate.push("/Home");
  }, [user, loading]);

  return (
    <>
      <div className="layout-default layout-signin">
        <Header>
          <img src={logo} alt="" width={60} height={60} />
          <div className="header-col header-brand">
            <h5>CSun | Stolen i solen</h5>
          </div>
          {/*  */}
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title color="black" style={{ color: "black" }}>
                Sign Up
              </Title>
              <p className="text-lg" style={{ color: "black" }}></p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Register With</h5>}
            bordered="false"
          >
            <div className="sign-up-gateways" style={{ display: "flex", justifyContent: "center" }}>
              <Button type="false">
                <GoogleOutlined
                  onClick={signInWithGoogle}
                  style={{ fontSize: "50px", color: "#FF3D00" }}
                  type="primary"
                />
              </Button>
              <Button type="false">
                <GithubOutlined
                  onClick={signInWithGithub}
                  style={{ fontSize: "50px", color: "#0d1117" }}
                  type="primary"
                />
              </Button>
              <Button type="false">
                <img
                  onClick={signInWithMicrosoft}
                  style={{ fontSize: "50px", color: "#0d1117" }}
                  src={MicrosoftLogo}
                  alt="logo 1"
                  width={100}
                  height={100}
                />
              </Button>
            </div>
            <p className="text-center my-25 font-semibold text-muted">Or</p>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item name="name" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input placeholder="Password" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  I agree the{" "}
                  <Iubenda id={63072729} type="terms-and-conditions" styling="nostyle">
                    Terms and conditions
                  </Iubenda>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>

            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
        <Footer className="footer-signup">
          <Iubenda id={63072729} />
          <Iubenda id={63072729} type="terms-and-conditions" styling="nostyle">
            Terms and conditions
          </Iubenda>
        </Footer>
      </div>
    </>
  );
};
export default SignUp;
