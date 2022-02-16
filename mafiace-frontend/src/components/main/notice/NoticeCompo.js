import React, { useEffect, useState } from "react";
import axios from "axios";
import Tr from "./Tr";
import Post from "./Post";
import Modal from "./Modal";
import Detail from "./Detail";
import { Table } from "@mui/material";
import jwt from "jwt-decode";
import Loader from "../../common/Loader";

const NoticeCompo = () => {
  // const [form, setForm] = useState({ title: "", content: "", postNum: "" });
  const [list, setList] = useState([]);
  const [refreshed, setRefreshed] = useState(true);
  const [selected, setSelected] = useState();
  const [admin, setAdmin] = useState("");

  const [modalOn, setModalOn] = useState(false);
  const [postOn, setPostOn] = useState(false);
  const [detailOn, setDetailOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modifyNo, setModifyNo] = useState();
  const nextId = useState(1);

  //더미 데이터 호출
  useEffect(() => {
    const admin_storage = jwt(localStorage.getItem("jwt"));
    setAdmin(admin_storage.sub);
    // console.log(admin);
    axios
      .get("/mafiace/api/notice/")
      .then((res) => {
        // console.log("get data");
        console.log(res.data);
        setLoading(false);
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

  const handleRemove = (postNum) => {
    axios.delete("/mafiace/api/notice/" + postNum).then(() => {
      alert("게시물이 삭제되었습니다!");
      setRefreshed(!refreshed);
    });
  };

  const handleCreate = () => {
    setPostOn(true);
    console.log(list);
  };

  const handleEdit = (data) => {
    setSelected(data);
    setModalOn(true);
    setModifyNo(data.postNum);
    console.log(data);
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

  const handleEditSubmit = (data) => {
    axios
      .patch(`/mafiace/api/notice/` + modifyNo, {
        title: data.title,
        content: data.content,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setModalOn(false);
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <Loader msg="로딩 중..." />
      ) : (
        <div>
          {admin === "sixman" ? (
            <div className="ml-20" style={{}}>
              <button
                onClick={handleCreate}
                className="bg-purple-300 hover:bg-purple-500 px-3 py-1 rounded text-white"
                style={{ border: "none", margin: "3%", float: "right" }}
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
                <br></br>
                <Tr
                  list={list}
                  handleRemove={handleRemove}
                  handleEdit={handleEdit}
                  handleDetail={handleDetail}
                />
              </Table>
              <br></br>

              {postOn && <Post handleCancel2={handleCancel2} />}
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
      )}
    </>
  );
};

export default NoticeCompo;
