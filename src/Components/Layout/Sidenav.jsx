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

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" width={50} height={50} />
        <span>CSun | Solen i Stolen</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/">
            <span
              className="icon"
              style={{
                background: page === "Byer" || page === "KartSimulering" ? color : ""
              }}
            >
              <GlobalOutlined />
            </span>
            <span className="label">Kart</span>
          </NavLink>
        </Menu.Item>
        
      </Menu>
    </>
  );
}

export default Sidenav;
