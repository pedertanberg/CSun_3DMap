//functional component which loads data from ../../assets/lonlat.json and displays in antd table
import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Form, InputNumber, Popconfirm, Typography } from "antd";
import Highlighter from "react-highlight-words";
// import "antd/dist/antd.css";
import lonlatData from "../../assets/lonlat.json";
import { auth, save_Place, getMarker } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Display = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState(lonlatData);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block"
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = lonlatData;
  //     setData(result);
  //   };
  //   fetchData();
  // }, []);

  const handelike = (key) => {
    save_Place(key, user.uid);
    const newData = [...data];
    newData[key].likes = data[key].likes + 1;
    console.log("new likes", newData[key].likes);
    setData(newData);
  };
  const handeDislike = (id) => {
    console.log(id);
    let newArr = [...data];
    newArr[id].dislikes = newArr[id].dislikes + 1;
    console.log(newArr[id].dislikes);
    setData(newArr);
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title")
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "Address"
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "Likes",
      editable: true
    },
    {
      title: "Dislikes",
      dataIndex: "dislikes",
      key: "Dislikes",
      editable: true
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handelike(record.key)}>Lagre</Button>
          {/* <Button onClick={() => handeDislike(record.key)}>Dislike</Button> */}
          {/* <Button onClick={() => handleDelete(record.key)}>Delete</Button> */}
        </Space>
      )
    }
  ];

  useEffect(() => {
    getMarker().then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  return (
    <div className="display">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Display;
