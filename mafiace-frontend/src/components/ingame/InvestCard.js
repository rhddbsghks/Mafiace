import React from "react";
import { Card, Modal } from "semantic-ui-react";
import styles from "./job-card.module.css";
import "../../style.css";

const InvestCard = ({ openInvestCard, setopenInvestCard, myVote, isMafia }) => {
  return (
    <Modal
      open={openInvestCard}
      className={styles["job-card-modal"]}
      onClose={() => setopenInvestCard(false)}
      onOpen={() => setopenInvestCard(true)}
    >
      <Card className={styles["job-card"]}>
        <img
          src={`./img/${isMafia ? `Mafia` : `Citizen`}.png`}
          alt=""
          className={styles["job-card-image"]}
        />
        <Card.Content>
          <Card.Header style={{ fontSize: "2em" }}>
            {isMafia ? `마피아` : `시민`}
          </Card.Header>
          <Card.Description style={{ margin: 0 }}>
            {isMafia ? (
              <>
                <p>마피아 검거 완료🧐!</p>
                <p>{myVote}님은 마피아입니다. </p>
              </>
            ) : (
              <>
                <p>헛다리 짚으셨네요🤣</p>
                <p>{myVote}님은 시민입니다. </p>
              </>
            )}
          </Card.Description>
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default InvestCard;
