import React from "react";
import { Card, Space, Divider } from "antd";
const App = () => (
  <Space
    direction="vertical"
    size="middle"
    style={{
      display: "flex"
    }}
  >
    <Card
      title={<Divider orientation="left">Hva er CSun?</Divider>}
      size="small"
      headStyle={{ background: "#8ecae6", color: "white" }}
    >
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
    <Card title={<Divider orientation="left">Status</Divider>} size="small" headStyle={{ background: "#ffd6ba" }}>
      <p>Vi har nå lansert vår BETA-versjon, og er fortsatt i utvikling.</p>
      <p>Vi ønsker derfor dine tilbakemeldinger, og du kan nå oss på support@tast.tech</p>
    </Card>
    <Card
      title={<Divider orientation="left">Verifiserte Steder</Divider>}
      size="small"
      headStyle={{ background: "#b5e48c", color: "white" }}
    >
      <p>
        Verifiserte steder er restauranter, barer og cafeer CSun selv har verifisert at har både uteservering og
        soltimer (på sommer)
      </p>
    </Card>
  </Space>
);
export default App;
