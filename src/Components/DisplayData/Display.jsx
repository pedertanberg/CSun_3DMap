import React from "react";
import { Tabs } from "antd";
import Verified from "./Verified";
import Unverified from "./Unverified";

const items = [
  { label: "Verifiserte steder", key: "item-1", children: <Verified /> }, // remember to pass the key prop
  { label: "Uverifiserte steder", key: "item-2", children: <Unverified /> }
];

const App = () => {
  return <Tabs items={items} />;
};
export default App;
