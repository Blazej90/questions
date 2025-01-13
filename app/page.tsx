"use client";

import React, { useState } from "react";
import SpeechButton from "./components/SpeechButton/SpeechButton";
import Questions from "./components/Questions/Questions";
import styles from "./page.module.css";
import "regenerator-runtime/runtime";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nauka React.js</h1>
      <Questions onQuestionChange={setCurrentQuestion} />
      {currentQuestion && (
        <div className={styles.questionSection}>
          <h3 className={styles.questionText}>Pytanie: {currentQuestion}</h3>
          <SpeechButton question={currentQuestion} />
        </div>
      )}
    </div>
  );
}
