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
          width: "45%",
        }}
      >
        <button
          onClick={onCancel}
          className="bg-blue-300 hover:bg-blue-500 px-3 py-1 rounded text-white"
          style={{
            float: "right",
            marginTop: "5%",
            marginRight: "5%",
            border: "none",
          }}
        >
          x
        </button>
        <div>
          <p
            style={{
              textAlign: "center",
              fontSize: "500%",
              marginBottom: "10px",
              paddingLeft: "50px",
            }}
          >
            직업 소개
          </p>
          <hr style={{ marginBottom: "5%", borderColor: "purple" }}></hr>
          <div className="slider">
            <div className="slides">
              <div id="slide-1" className="slide-1">
                <div>
                  <h2 style={{ fontSize: "50px" }}>마피아</h2>
                  <hr style={{ color: "red" }}></hr>
                  <p style={{ fontSize: "30px" }}>
                    밤마다 한 명을 선택해 죽일 수 있습니다.<br></br>
                    동료가 있다면 선택이 같아야 죽일 수 있습니다.<br></br>
                    처리 시도를 하더라도 의사가 살리면 시민은 죽지 않습니다.
                  </p>
                </div>
              </div>
              <div id="slide-2" className="slide-2">
                <div>
                  <h2 style={{ fontSize: "50px" }}>경찰</h2>
                  <hr style={{ color: "red" }}></hr>
                  <p>
                    밤마다 1명을 선택하여 신분을 조사합니다.
                    <br></br>
                    용의자의 특수 직업까지는 알 수 없습니다.
                  </p>
                </div>
              </div>
              <div id="slide-3" className="slide-3">
                <div>
                  <h2 style={{ fontSize: "50px" }}>의사</h2>
                  <hr style={{ color: "red" }}></hr>
                  <p>
                    밤마다 1명을 선택하여 치료합니다.<br></br>
                    처리 시도를 당한 시민을 선택한다면 살릴 수 있습니다.{" "}
                    <br></br>
                    의사는 자기 자신도 살릴 수도 있습니다.
                  </p>
                </div>
              </div>
              {/* <div id="slide-4">
                <p>네번째 규칙</p>
              </div>
              <div id="slide-5">
                <p>다섯번째 규칙</p>
              </div> */}
            </div>

            <a
              href="#slide-1"
              style={{ width: "30px", height: "30px", fontSize: "20px" }}
            >
              1
            </a>
            <a
              href="#slide-2"
              style={{
                marginLeft: "30px",
                width: "30px",
                height: "30px",
                fontSize: "20px",
              }}
            >
              2
            </a>
            <a
              href="#slide-3"
              style={{
                marginLeft: "30px",
                width: "30px",
                height: "30px",
                fontSize: "20px",
              }}
            >
              3
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
