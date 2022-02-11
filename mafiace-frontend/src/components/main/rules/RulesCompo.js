import "./style.css";
import { Segment, Header, Divider, Container } from "semantic-ui-react";

const RulesCompo = () => {
  return (
    <>
      {/* <h1>Rules__Compo</h1> */}
      <div
        style={{
          width: "100%",
          height: "50%",
        }}
      >
        <Segment style={{ borderRadius: "10px", width: "97%" }}>
          <Header as="h2">Rules</Header>

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
              <i aria-hidden="true" class="users disabled icon"></i>
              참여할 수 있는 최대 인원은 8명입니다.
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
              <i aria-hidden="true" class="video play disabled icon"></i>
              게임 시작은 방장이 할 수 있습니다.
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
              <i aria-hidden="true" class="user circle disabled icon"></i>
              게임 시작 시 참여하는 인원 수에 따라 마피아 배정 수가 다릅니다.
            </Container>
            {/* 전반적인 게임 룰 설명 쏼라 쏼라<br></br>
            전반적인 게임 룰 설명 쏼라 쏼라<br></br>
            전반적인 게임 룰 설명 쏼라 쏼라<br></br>
            전반적인 게임 룰 설명 쏼라 쏼라<br></br>
            전반적인 게임 룰 설명 쏼라 쏼라<br></br>
            전반적인 게임 룰 설명 쏼라 쏼라<br></br> */}
          </h2>
        </Segment>
      </div>
      <br></br>
      <div style={{ marginTop: "10%" }}>
        <p style={{ textAlign: "center", fontSize: "300%" }}>직업 소개</p>
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
    </>
  );
};
export default RulesCompo;
