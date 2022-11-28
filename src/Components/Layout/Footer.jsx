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

import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            CSun | Solen i Stolen © 2022, by
            <a href="https://www.tast.tech" className="font-weight-bold" target="_blank">
              Tast Consulting
            </a>
            Finn din solstol
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
              <li className="nav-item">
                <a href="https://www.tast.tech" className="nav-link text-muted" target="_blank">
                  Tast Consulting
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link text-muted" target="_blank">
                  Om Oss
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="#pablo" className="nav-link text-muted" target="_blank">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="#pablo" className="nav-link pe-0 text-muted" target="_blank">
                  License
                </a>
              </li> */}
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
