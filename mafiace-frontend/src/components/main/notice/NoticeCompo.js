import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Tr from "./Tr";
import Post from "./Post";
import Modal from "./Modal";
import Detail from "./Detail";
import "./notice.css";
import { Table } from "@mui/material";
import jwt from "jwt-decode";

const Board = () => {
  // const [form, setForm] = useState({ title: "", content: "", postNum: "" });
  const [list, setList] = useState([]);
  const [refreshed, setRefreshed] = useState(true);
  const [selected, setSelected] = useState("");
  const [admin, setAdmin] = useState();

  const [modalOn, setModalOn] = useState(false);
  const [postOn, setPostOn] = useState(false);
  const [detailOn, setDetailOn] = useState(false);

  const NOTICE_API_URL = "http://localhost:8080/api/notice/";

  const nextId = useRef(1);

  //더미 데이터 호출
  useEffect(() => {
    const admin = jwt(localStorage.getItem("jwt"));
    console.log(admin.sub);
    setAdmin(admin.sub);
    axios
      .get(NOTICE_API_URL)
      .then((res) => {
        console.log("get data");
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, [refreshed]);

  //디테일 열기
  const handleDetail = (item) => {
    setDetailOn(true);
    const selectedData = {
      title: item.title,
      content: item.content,
      postTime: item.postTime,
    };
    console.log(selectedData);
    setSelected(selectedData);
  };

  const handleSave = (data) => {
    console.log(data);
    //데이터 수정하기
    if (data.postNum) {
      setList(
        list.map((row) =>
          data.postNum === row.postNum
            ? {
                title: data.title,
                content: data.content,
                postNum: data.current,
              }
            : row
        )
      );
    } else {
      setList((list) =>
        list.concat({
          title: data.title,
          content: data.content,
          postNum: nextId.current,
        })
      );
      nextId.current += 1;
    }
  };

  const handleRemove = (postNum) => {
    axios.delete(NOTICE_API_URL + postNum).then(() => {
      alert("게시물이 삭제되었습니다!");
      setRefreshed(!refreshed);
    });
    nextId.current -= 1;
  };

  const handleCreate = () => {
    setPostOn(true);
    console.log(list);
  };

  const handleEdit = (item) => {
    setModalOn(true);
    const selectedData = {
      title: item.title,
      content: item.content,
    };
    console.log(selectedData);
    setSelected(selectedData);
  };

  const handleCancel = () => {
    setModalOn(false);
  };

  const handleCancel2 = () => {
    setPostOn(false);
  };

  const handleCancel3 = () => {
    setDetailOn(false);
  };

  const handleEditSubmit = (item) => {
    console.log(item);
    handleSave(item);
    setModalOn(false);
  };

  return (
    <>
      {admin === "sixman" ? (
        <div className="ml-20" style={{ marginTop: "5%" }}>
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Time</th>

                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <Tr
              list={list}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </Table>
          <br></br>
          <button
            onClick={handleCreate}
            className="bg-purple-300 hover:bg-purple-500 px-3 py-1 rounded text-white"
          >
            생성
          </button>
          {postOn && (
            <Post handleSave={handleSave} handleCancel2={handleCancel2} />
          )}
          {detailOn && (
            <Detail
              selectedData={selected}
              handleCancel3={handleCancel3}
            ></Detail>
          )}
          {modalOn && (
            <Modal
              selectedData={selected}
              handleCancel={handleCancel}
              handleEditSubmit={handleEditSubmit}
            />
          )}
          ) : (
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Time</th>
              </tr>
            </thead>
            <Tr list={list} handleDetail={handleDetail} />
          </Table>
          )
        </div>
      ) : (
        <div className="ml-50" style={{ marginTop: "5%" }}>
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Time</th>
              </tr>
            </thead>
            <Tr list={list} handleDetail={handleDetail} />
          </Table>
        </div>
      )}
    </>
  );
};

export default Board;
