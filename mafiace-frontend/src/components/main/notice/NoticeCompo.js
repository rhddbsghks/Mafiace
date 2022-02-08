import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Tr from "./Tr";
import Post from "./Post";
import Modal from "./Modal";
import Detail from "./Detail";
import { Table } from "@mui/material";
import jwt from "jwt-decode";

const NoticeCompo = () => {
  // const [form, setForm] = useState({ title: "", content: "", postNum: "" });
  const [list, setList] = useState([]);
  const [refreshed, setRefreshed] = useState(true);
  const [selected, setSelected] = useState();
  const [admin, setAdmin] = useState("");

  const [modalOn, setModalOn] = useState(false);
  const [postOn, setPostOn] = useState(false);
  const [detailOn, setDetailOn] = useState(false);

  const nextId = useRef(1);

  //더미 데이터 호출
  useEffect(() => {
    const admin_storage = jwt(localStorage.getItem("jwt"));
    setAdmin(admin_storage.sub);
    // console.log(admin);
    axios
      .get("/mafiace/api/notice/")
      .then((res) => {
        // console.log("get data");
        // console.log(res.data);
        setList(res.data);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 403) {
          localStorage.removeItem("jwt");
          window.location.reload();
          alert("요청 권한이 없습니다");
        }
      });
  }, [refreshed]);

  //디테일 열기
  const handleDetail = (item) => {
    setDetailOn(true);
    const selectedData = {
      title: item.title,
      content: item.content,
      postTime: item.postTime,
    };
    // console.log(selectedData);
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
    axios.delete("/mafiace/api/notice/" + postNum).then(() => {
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
    <div>
      {admin === "sixman" ? (
        <div className="ml-20" style={{ marginTop: "5%" }}>
          <button
            onClick={handleCreate}
            className="bg-purple-300 hover:bg-purple-500 px-3 py-1 rounded text-white"
          >
            생성
          </button>
          <Table>
            <thead>
              <tr>
                <th style={{ fontSize: "2rem" }}>No.</th>
                <th style={{ fontSize: "2rem" }}>Title</th>
                <th style={{ fontSize: "2rem" }}>Time</th>
                <th style={{ fontSize: "2rem" }}>Edit</th>
                <th style={{ fontSize: "2rem" }}>Delete</th>
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
        </div>
      ) : (
        <div className="ml-50" style={{ marginTop: "5%" }}>
          <Table>
            <thead>
              <tr>
                <th style={{ fontSize: "2rem" }}>No.</th>
                <th style={{ fontSize: "2rem" }}>Title</th>
                <th style={{ fontSize: "2rem" }}>Time</th>
              </tr>
            </thead>
            <Tr list={list} handleDetail={handleDetail} />
          </Table>

          {detailOn && (
            <Detail
              selectedData={selected}
              handleCancel3={handleCancel3}
            ></Detail>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeCompo;
