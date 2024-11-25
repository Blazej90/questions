"use client";

import React from "react";
import styles from "./ClearButton.module.css";

interface ClearButtonProps {
  onClear: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => {
  return (
    <button className={styles.clearButton} onClick={onClear}>
      Wyczyść odpowiedź
    </button>
  );
};

export default ClearButton;
