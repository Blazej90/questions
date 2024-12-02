import styles from "./ResultList.module.css";

const ResultsList: React.FC<{
  results: string[];
  interimResult: string | null;
}> = ({ results, interimResult }) => {
  return (
    <ul className={styles.list}>
      {results.map((result, index) => (
        <li key={index} className={styles.resultItem}>
          {result}
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

export default ResultsList;
