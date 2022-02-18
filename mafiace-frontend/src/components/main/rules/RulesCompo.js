import "./style.css";
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
              height: "80%",
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
                  borderRadius: "10px",
                  marginBottom: "1%",
                  padding: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div className="rule-box ">
                  <i
                    aria-hidden="true"
                    class="users disabled icon"
                    style={{ margin: "auto" }}
                  ></i>
                  <p
                    style={{
                      marginLeft: "10px",
                      width: "90%",
                    }}
                  >
                    참여할 수 있는 최대 인원은 8명입니다.
                  </p>
                </div>
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  padding: "2%",
                  paddingLeft: "5%",
                }}
              >
                <div className="rule-box">
                  <i
                    aria-hidden="true"
                    class="video play disabled icon"
                    style={{ margin: "auto" }}
                  ></i>
                  <p
                    style={{
                      marginLeft: "10px",
                      width: "90%",
                    }}
                  >
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
                <div className="rule-box ">
                  <i
                    aria-hidden="true"
                    class="user circle disabled icon"
                    style={{ margin: "auto" }}
                  ></i>
                  <p
                    style={{
                      marginLeft: "10px",
                      width: "90%",
                    }}
                  >
                    게임 시작 시 참여하는 인원 수에 따라 마피아 배정 수가
                    다릅니다.
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
                <div className="rule-box ">
                  <i
                    aria-hidden="true"
                    class="sun disabled icon"
                    style={{ margin: "auto" }}
                  ></i>
                  <p
                    style={{
                      marginLeft: "10px",
                      width: "90%",
                    }}
                  >
                    {" "}
                    게임은 '낮'부터 시작합니다.
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
                <div className="rule-box ">
                  <i
                    aria-hidden="true"
                    class="spy disabled icon"
                    style={{ margin: "auto" }}
                  ></i>
                  <p
                    style={{
                      marginLeft: "10px",
                      width: "90%",
                    }}
                  >
                    {" "}
                    게임이 시작되면 임의의 직업을 배정받습니다.
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
                <div className="rule-box ">
                  <i
                    aria-hidden="true"
                    class="talk disabled icon"
                    style={{ margin: "auto" }}
                  ></i>
                  <p
                    style={{
                      marginLeft: "10px",
                      width: "90%",
                    }}
                  >
                    {" "}
                    낮에는 플레이어끼리 마피아가 누구인지 토론합니다.
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
                <div className="rule-box ">
                  <i
                    aria-hidden="true"
                    class="question circle disabled icon"
                    style={{ margin: "auto" }}
                  ></i>
                  <p
                    style={{
                      marginLeft: "10px",
                      width: "90%",
                    }}
                  >
                    {" "}
                    표정 변화에 따라 마피아가 누군지 유추할 수 있습니다.
                  </p>
                </div>
              </Container>
            </h2>
          </Segment>
        </div>
      </div>
      {modalOn && (
        <RulesModal handleCancel={handleCancel} handleModal={handleModal} />
      )}
    </>
  );
};
export default RulesCompo;
