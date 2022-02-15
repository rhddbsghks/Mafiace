import React from "react";
import { Card, Modal } from "semantic-ui-react";
import styles from "./job-card.module.css";
import "../../style.css";
import { useEffect } from "react";

const JobCard = ({ openJobCard, setopenJobCard, myRole, mafiaTeam }) => {
  const korJobName = {
    Police: "경찰",
    Doctor: "의사",
    Citizen: "시민",
    Mafia: "마피아",
  };

  const jobDesc = {
    Police:
      "매일 밤 용의자 한 명을 수사해 신분을 파악할 수 있습니다. 섣불리 나섰다간 1순위 제거 대상!",
    Doctor:
      "매일 밤 위급한 환자 한 명을 살릴 수 있습니다. 물론 셀프 치료도 가능합니다.",
    Citizen:
      "순진무구한 여러분 동네에 마피아가 잠입하였습니다. 다른 시민들과 힘을 합쳐 마을을 구해주세요!",
    Mafia:
      "매일 밤 무고한 시민 한 명을 제거할 수 있습니다. 시민들을 속여 마을을 장악하세요!",
  };

  useEffect(() => {
    console.log(myRole);
  }, [myRole]);

  return (
    <Modal
      open={openJobCard}
      className={styles["job-card-modal"]}
      onClose={() => setopenJobCard(false)}
      onOpen={() => setopenJobCard(true)}
    >
      <Card className={styles["job-card"]}>
        <img
          src={`./img/${myRole}.png`}
          alt=""
          className={styles["job-card-image"]}
        />
        <Card.Content>
          <Card.Header style={{ fontSize: "2em" }}>
            {korJobName[myRole]}{" "}
          </Card.Header>
          <Card.Description style={{ margin: 0 }}>
            <p>{jobDesc[myRole]}</p>
            <p>{myRole === "Mafia" ? "마피아 : " + mafiaTeam : null}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default JobCard;
