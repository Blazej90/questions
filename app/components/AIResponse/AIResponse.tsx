import React from "react";
import styles from "./AIResponse.module.css";

interface AIResponseProps {
  feedback: string | null;
}

const AIResponse: React.FC<AIResponseProps> = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className={styles.feedback}>
      <strong>Feedback AI:</strong>
      <p>{feedback}</p>
    </div>
  );
};

export default AIResponse;
