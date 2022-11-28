import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Space } from "antd";
import "./Home.css";
import { Link } from "react-router-dom";

const App = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    {/* <div class="blob white"></div> */}
    <Link to="/Map">
      <div href="http://example.com" className="pulsingButton">
        Finn din solstol
      </div>
    </Link>
  </div>
);

export default App;
