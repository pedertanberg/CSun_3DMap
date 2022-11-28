import React from "react";
import { Card, Space } from "antd";
const App = () => (
  <Space
    direction="vertical"
    size="middle"
    style={{
      display: "flex"
    }}
  >
    <Card title="Hva er CSUN?" size="small" headStyle={{ background: "#1890ff", color: "white" }}>
      <p>
        Navnet CSun spiller både på ordet season og 'See Sun'. Skandinavia er et område med varierte solforhold basert
        på årstider, og vi ønsker å hjelpe deg med å finne de beste stedene for å nyte solen.
      </p>
      <p>
        CSun er en app som lar deg finne en stol i solen. Ved å benytte seg av vårt interaktive kart kan du enkelt
        navigere deg rundt i din hjemby og finne den perfekte stol i solen.{" "}
      </p>
      <p>Kartet tillater deg fitere på dato og tid, og solens bane vil kalkulere hvor i byen skyggen vil legge seg.</p>
      <p>Du har også mulighet til å få veibeskrivelse til et sted du ønsker deg. </p>
    </Card>
    <Card title="Status" size="small" headStyle={{ background: "#fab731", color: "white" }}>
      <p>Vi har nå lansert vår BETA-versjon, og er fortsatt i utvikling.</p>
      <p>Vi ønsker derfor dine tilbakemeldinger, og du kan nå oss på support@tast.tech</p>
    </Card>
    {/* <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card> */}
  </Space>
);
export default App;
