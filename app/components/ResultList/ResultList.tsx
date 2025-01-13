import React, { useEffect } from "react";
import styles from "./ResultList.module.css";

const ResultsList: React.FC<{
  results: { text: string; time: number }[];
  interimResult: string | null;
}> = ({ results, interimResult }) => {
  const uniqueResults = results.filter(
    (result, index, self) =>
      index ===
      self.findIndex((r) => r.text === result.text && r.time === result.time)
  );

  return (
    <ul className={styles.list}>
      {uniqueResults.map((result, index) => (
        <li key={index} className={styles.resultItem}>
          <div>{result.text}</div>
          <div className={styles.time}>
            Czas odpowiedzi: {formatTime(result.time)}
          </div>
        </li>
      ))}
      {interimResult && (
        <li className={`${styles.resultItem} ${styles.interim}`}>
          {interimResult}
        </li>
      )}
    </ul>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default ResultsList;
