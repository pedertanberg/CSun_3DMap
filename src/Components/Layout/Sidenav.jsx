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

// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import logo from "../../assets/Terra.svg";
import {
  HomeOutlined,
  UnorderedListOutlined,
  SettingFilled,
  GlobalOutlined,
  InfoCircleOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { auth, logout } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidenav({ color }) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useHistory();
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const profile = [
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>
  ];

  const signin = [
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>
  ];

  const signup = [
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" key={0}>
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z" fill={color} />
    </svg>
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" width={50} height={50} />
        <span>CSun | Solen i Stolen</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/Home">
            <span
              className="icon"
              style={{
                background: page === "Home" ? color : ""
              }}
            >
              <HomeOutlined />
            </span>
            <span className="label">Hjem</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/Map">
            <span
              className="icon"
              style={{
                background: page === "Map" ? color : ""
              }}
            >
              <GlobalOutlined />
            </span>
            <span className="label">Kart</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/Table">
            <span
              className="icon"
              style={{
                background: page === "Table" ? color : ""
              }}
            >
              <UnorderedListOutlined />
            </span>
            <span className="label">Utforsk</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/About">
            <span
              className="icon"
              style={{
                background: page === "About" ? color : ""
              }}
            >
              <InfoCircleOutlined />
            </span>
            <span className="label">Om CSun</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/Profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : ""
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7" onClick={logout}>
          <NavLink to="/hello">
            <span
              className="icon"
              style={{
                background: page === "logout" ? color : ""
              }}
            >
              <LogoutOutlined />
            </span>
            <span className="label">Logg ut</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
