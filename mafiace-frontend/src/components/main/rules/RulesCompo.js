import "./style.css";

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
    </>
  );
};
export default RulesCompo;
