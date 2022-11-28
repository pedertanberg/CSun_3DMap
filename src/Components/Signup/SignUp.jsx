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
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            <h5 style={{ color: "black" }}>CSun | Stolen i solen</h5>
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
            <div className="sign-up-gateways">
              <GoogleOutlined onClick={signInWithGoogle} style={{ fontSize: "50px", color: "#FF3D00" }} type="primary">
                Sign up with Google
              </GoogleOutlined>
              <Button type="false">{/* <img src={logo1} alt="logo 1" /> */}</Button>
              <Button type="false">{/* <img src={logo2} alt="logo 2" /> */}</Button>
              <Button type="false">{/* <img src={logo3} alt="logo 3" /> */}</Button>
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
                  <a href="#pablo" className="font-bold text-dark">
                    Terms and Conditions
                  </a>
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
      </div>
    </>
  );
};
export default SignUp;
