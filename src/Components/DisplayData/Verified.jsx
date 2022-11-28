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

  const handelike = (key, value) => {
    save_Place(key, user.uid, "verified", value);
    if (!value) {
      const temp_data = [...data];
      const index = temp_data.findIndex((item) => item.key === key);
      temp_data[index].saved = true;
      setData(temp_data);
    } else {
      const temp_data = [...data];
      const index = temp_data.findIndex((item) => item.key === key);
      temp_data[index].saved = false;
      setData(temp_data);
    }
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Display;
