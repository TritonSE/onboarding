import React from "react";
import styles from "src/components/HeaderBar.module.css";

export const HeaderBar = () => {
  return (
    <div className={styles.headerBar}>
      <img width={28.25} height={40} src="/logo.svg" />
      <span className={styles.title}>Triton Software Engineering Todos</span>
    </div>
  );
};
