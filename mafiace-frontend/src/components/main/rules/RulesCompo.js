import "./style.css";
<<<<<<< HEAD

const RulesCompo = () => {
  return (
    <>
      {/* <h1>Rules__Compo</h1> */}
      <div className="slider">
        <div className="slides">
          <div id="slide-1">
            <div>
              <h2 style={{}}>마피아</h2>
              <hr style={{ color: "red" }}></hr>
              <p>
                마피아 조직원이 0명이면 시민팀에서 1명 포섭이 가능하다.<br></br>
                밤마다 한 명을 선택해 죽일 수 있다.<br></br> 플레이어 1명의 입을
                꿰매서 1턴동안 대화를 못하게 만든다.
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
            <p>세번째 규칙</p>
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
=======
import { Segment, Header, Divider, Container } from "semantic-ui-react";
import React, { useState } from "react";
import RulesModal from "./RulesModal";

const RulesCompo = () => {
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(true);
  };

  const handleCancel = () => {
    setModalOn(false);
  };

  return (
    <>
      {/* <h1>Rules__Compo</h1> */}
      <div style={{ margin: "5%" }}>
        <div
          style={{
            width: "100%",
            height: "50%",
          }}
        >
          <Segment
            style={{
              borderRadius: "30px",
              width: "97%",
              backgroundColor: "#D5C2EE",
              border: "none",
            }}
          >
            <Header
              as="h1"
              style={{
                marginBottom: "0",
                fontSize: "500%",
                marginLeft: "3%",
                marginTop: "2%",
              }}
            >
              Rules
              <button
                className="text-purple-500 hover:text-purple-700 cursor-pointer"
                onClick={handleModal}
                style={{
                  fontSize: "50%",
                  border: "none",
                  background: "none",
                  float: "right",
                  marginRight: "5%",
                  marginTop: "2%",
                  fontWeight: "700",
                }}
              >
                직업 모두 보기
              </button>
            </Header>

            <Divider clearing />
            <h2
              style={{ textAlign: "left", marginLeft: "5%", marginRight: "5%" }}
            >
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  padding: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div>
                  <i
                    aria-hidden="true"
                    class="users disabled icon"
                    style={{ float: "left" }}
                  ></i>
                  <p style={{ float: "left", marginLeft: "10px" }}>
                    참여할 수 있는 최대 인원은 8명입니다.
                  </p>
                </div>
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  paddingBottom: "0",
                  paddingTop: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div style={{ height: "50px" }}>
                  <i
                    aria-hidden="true"
                    class="video play disabled icon"
                    style={{ float: "left" }}
                  ></i>
                  <p style={{ float: "left", marginLeft: "10px" }}>
                    직업의 종류는 총 3개입니다.
                  </p>
                </div>
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  padding: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div>
                  <i
                    aria-hidden="true"
                    class="user circle disabled icon"
                    style={{ float: "left" }}
                  ></i>
                  게임 시작 시 참여하는 인원 수에 따라 마피아 배정 수가
                  다릅니다.
                </div>
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  padding: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div>
                  <i
                    aria-hidden="true"
                    class="sun disabled icon"
                    style={{ float: "left", zIndex: "0" }}
                  ></i>
                  게임은 '낮'부터 시작합니다.
                </div>
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  padding: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div>
                  <i
                    aria-hidden="true"
                    class="spy disabled icon"
                    style={{ float: "left" }}
                  ></i>
                  게임이 시작되면 임의의 직업을 배정받습니다.
                </div>
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  padding: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div>
                  <i
                    aria-hidden="true"
                    class="talk disabled icon"
                    style={{ float: "left" }}
                  ></i>
                  낮에는 플레이어끼리 마피아가 누구인지 토론합니다.
                </div>
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  padding: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div>
                  <i
                    aria-hidden="true"
                    class="question circle disabled icon"
                    style={{ float: "left" }}
                  ></i>
                  표정 변화에 따라 마피아가 누군지 유추할 수 있습니다.
                </div>
              </Container>
            </h2>
          </Segment>
        </div>
      </div>
      {modalOn && (
        <RulesModal handleCancel={handleCancel} handleModal={handleModal} />
      )}
>>>>>>> 72ff2927f67baf85d940564a5fd5d2690f6f1598
    </>
  );
};
export default RulesCompo;
