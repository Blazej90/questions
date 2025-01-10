"use client";

import React, { useState } from "react";
import QuestionPicker from "../components/Questions/Questions";
import SpeechButton from "../components/SpeechButton/SpeechButton";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <QuestionPicker onQuestionChange={setCurrentQuestion} />
      {currentQuestion && (
        <div>
          <h3>Aktualne pytanie: {currentQuestion}</h3>
          <SpeechButton question={currentQuestion} />
        </div>
      )}
    </div>
  );
};

export default App;
