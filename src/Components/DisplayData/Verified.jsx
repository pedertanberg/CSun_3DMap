import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined, HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Button, Input, Space, Table, Form, InputNumber, Popconfirm, Checkbox } from "antd";
import Highlighter from "react-highlight-words";
import lonlatData from "../../assets/lonlat.json";
import { auth, save_Place, getMarker } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Display = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState(lonlatData);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handelike = (key, value) => {
    save_Place(key, user.uid, "verified", value);
    if (!value) {
      const temp_data = [...data];
      const index = temp_data.findIndex((item) => item.key === key);
      temp_data[index].saved = true;
      temp_data[index].likes += 1;
      setData(temp_data);
    } else {
      const temp_data = [...data];
      const index = temp_data.findIndex((item) => item.key === key);
      temp_data[index].saved = false;
      temp_data[index].likes -= 1;
      setData(temp_data);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => (record.title ? record.title.toLowerCase().includes(value) : null)
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record) => (
        <a href={record.address} target="_blank" rel="noreferrer">
          Finn Adresse
        </a>
      )
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "Likes",
      editable: true
    },

    {
      title: "Lagret",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Checkbox checked={record.saved} onClick={() => handelike(record.key, record.saved)} /> */}
          <HeartTwoTone
            onClick={() => handelike(record.key, record.saved)}
            twoToneColor={record.saved ? "#eb2f96" : "#e2e2e2 "}
          />
        </Space>
      )
    }
  ];

  useEffect(() => {
    getMarker().then((res) => {
      // console.log(res);
      setData(res);
    });
  }, []);

  return (
    <div className="display">
      <Input
        placeholder="Search by title"
        allowClear
        onChange={(value) => setSearchText(value.target.value.toLowerCase())}
      />
      <Table columns={columns} dataSource={[...data]} />
    </div>
  );
};

export default Display;
