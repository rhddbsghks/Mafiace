import React from "react";
import styles from "./count.module.css";

const Count321 = () => {
  return (
    <div className={styles["cd-number-wrapper"]}>
      <audio src="/audio/count321.wav" autoPlay></audio>
      <div className={styles["cd-number-three"]}>3</div>
      <div className={styles["cd-number-two"]}>2</div>
      <div className={styles["cd-number-one"]}>1</div>
      <div className={styles["cd-start"]}>Start!</div>
    </div>
  );
};

export default Count321;
