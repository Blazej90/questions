"use client";

import React, { useState } from "react";
import styles from "./Questions.module.css";

const QuestionPicker: React.FC = () => {
  const questions = [
    "Jak działa useState i kiedy go używamy?",
    "Co to jest virtual DOM i dlaczego jest używany w React?",
    "Jak przekazywać dane między komponentami za pomocą props?",
    "Jak działa mechanizm kluczy (keys) w React i dlaczego są ważne?",
    "How are you?",
    "What is your name?",
    "Where are you from?",
  ];

  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Wylosuj pytanie</h2>
      <button className={styles.questionButton} onClick={getRandomQuestion}>
        Losuj pytanie
      </button>
      {currentQuestion && (
        <p className={styles.question}>
          <strong>Pytanie:</strong> {currentQuestion}
        </p>
      )}
    </div>
  );
};

export default QuestionPicker;
