import "./style.css";
import React from "react";

const RulesModal = ({ handleCancel }) => {
  const onCancel = () => {
    console.log("없어져라");
    handleCancel();
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <div
        className="rouded shadow-lg w-20"
        style={{
          backgroundColor: "#BECDFF",
          borderRadius: "50px",
          width: "65%",
        }}
      >
        <button
          onClick={onCancel}
          style={{ float: "right", marginTop: "5%", marginRight: "5%" }}
        >
          x
        </button>
        <div>
          <p
            style={{
              textAlign: "center",
              fontSize: "300%",
              marginBottom: "10px",
            }}
          >
            직업 소개
          </p>
          <div className="slider">
            <div className="slides">
              <div id="slide-1">
                <div>
                  <h2 style={{}}>마피아</h2>
                  <hr style={{ color: "red" }}></hr>
                  <p>
                    마피아 조직원이 0명이면 시민팀에서 1명 포섭이 가능하다.
                    <br></br>
                    밤마다 한 명을 선택해 죽일 수 있다.<br></br> 플레이어 1명의
                    입을 꿰매서 1턴동안 대화를 못하게 만든다.
                  </p>
                </div>
              </div>
              <div id="slide-2">
                <div>
                  <h2 style={{}}>경찰</h2>
                  <hr style={{ color: "red" }}></hr>
                  <p>밤마다 1명을 선택하여 마피아인지 아닌지 확인할 수 있다.</p>
                </div>
              </div>
              <div id="slide-3">
                <div>
                  <h2 style={{}}>의사</h2>
                  <hr style={{ color: "red" }}></hr>
                  <p>밤마다 1명을 선택하여 마피아인지 아닌지 확인할 수 있다.</p>
                </div>
              </div>
              <div id="slide-4">
                <p>네번째 규칙</p>
              </div>
              <div id="slide-5">
                <p>다섯번째 규칙</p>
              </div>
            </div>

            <a href="#slide-1">1</a>
            <a href="#slide-2">2</a>
            <a href="#slide-3">3</a>
            <a href="#slide-4">4</a>
            <a href="#slide-5">5</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
