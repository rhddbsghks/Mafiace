import "./honor.css";
import { useState } from "react";

const Honor = ({ honorName, get }) => {
  const honorTitle = {
    citizen3Play: "시민권 취득",
    citizen10Play: "모범시민",
    doctor3Play: "레지던트",
    doctor10Play: "전문의",
    police3Play: "순경",
    police10Play: "지구대장",
    mafia3Play: "조직원",
    mafia10Play: "큰형님",
    firstWin: "첫 승",
    investigate10: "식스센스",
    kill10: "냉혹한 마피아",
    save10: "백의의 천사",
  };
  const honorDesc = {
    citizen3Play: "시민으로 3승 하기",
    citizen10Play: "시민으로 10승 하기",
    doctor3Play: "의사로 3승 하기",
    doctor10Play: "의사로 10승 하기",
    police3Play: "경찰로 3승 하기",
    police10Play: "경찰로 10승 하기",
    mafia3Play: "마피아로 3승 하기",
    mafia10Play: "마피아로 10승 하기",
    firstWin: "마피아스에 오신 것을 환영합니다.",
    investigate10: "마피아 수사 10건 성공",
    kill10: "시민 제거 10번 성공",
    save10: "시민 진료 10번 성공",
  };

  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        style={{
          width: "24%",
          height: "32%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className={`badge ${get ? "get" : "not-yet"}`}>
          <img
            src={`./img/honor/${honorName}.png`}
            alt=""
            height="70%"
            style={{ margin: "auto" }}
          />
        </div>

        <div style={{ textAlign: "center", fontSize: "2.5em" }}>
          {honorTitle[honorName]}
        </div>
        {hover ? (
          <div className="honor-desc">
            <div style={{ marginTop: "10%", textAlign: "center" }}>
              {" "}
              {honorDesc[honorName]}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Honor;
