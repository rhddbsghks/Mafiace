import React from "react";
import styles from "./loader.module.css";

const Loader = ({ msg }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.Loader__overlay}></div>
      <div className={styles.Loader__content}>
        <svg className={styles.Loader__svg} viewBox="0 0 50 50">
          <circle
            className={styles.Loader__path}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="10"
          ></circle>
        </svg>
        <div className={styles.Loader__messege}>{msg}</div>
      </div>
    </div>
  );
};

export default Loader;
