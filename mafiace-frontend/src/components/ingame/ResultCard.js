import React, { useState, useEffect } from "react";
import { Card, Modal } from "semantic-ui-react";
import styles from "./job-card.module.css";
import "../../style.css";
import axios from "axios";
import jwt from "jwt-decode";

const ResultCard = ({
  openResultCard,
  setopenResultCard,
  whoIsMafia,
  isWin,
  myRole,
}) => {
  const [newRate, setNewRate] = useState(0);

  useEffect(() => {
    axios
      .get("/mafiace/api/user/rating", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { userId: jwt(localStorage.getItem("jwt")).sub },
      })
      .then(({ data }) => {
        setNewRate(data.message);
      });
  });

  return (
    <Modal
      open={openResultCard}
      className={styles["job-card-modal"]}
      onClose={() => setopenResultCard(false)}
      onOpen={() => setopenResultCard(true)}
    >
      <Card className={styles["job-card"]}>
        <Card.Content>
          <Card.Header style={{ fontSize: "3.5em", textAlign: "center" }}>
            You{" "}
            {isWin ? (
              <span style={{ color: "#b465fdd8" }}>Win</span>
            ) : (
              <span style={{ color: "#d36d97d8" }}>Lose</span>
            )}
          </Card.Header>
          <Card.Description
            style={{ margin: 0, fontSize: "1em", textAlign: "center" }}
          >
            <div>
              내 점수: <span style={{ fontSize: "1.5em" }}>{newRate}</span>
              {isWin && myRole === "Mafia" ? (
                <span style={{ color: "#2c41ff", fontSize: "1.5em" }}>
                  (+39){" "}
                </span>
              ) : null}
              {isWin && myRole !== "Mafia" ? (
                <span style={{ color: "#2c41ff", fontSize: "1.5em" }}>
                  (+23){" "}
                </span>
              ) : null}
              {!isWin ? (
                <span style={{ color: "#c0261b", fontSize: "1.5em" }}>
                  (-10){" "}
                </span>
              ) : null}
            </div>
          </Card.Description>
          <br></br>
          <Card.Description
            style={{ margin: 0, fontSize: "1em", textAlign: "center" }}
          >
            마피아는 <div>{whoIsMafia} </div>였습니다.
          </Card.Description>
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default ResultCard;
