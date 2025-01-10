"use client";

import React, { useState } from "react";
import styles from "./Questions.module.css";

const QuestionPicker: React.FC<{
  onQuestionChange: (question: string) => void;
}> = ({ onQuestionChange }) => {
  const questions = [
    "Jak działa useState i kiedy go używamy?",
    "Co to jest virtual DOM i dlaczego jest używany w React?",
    "Jak przekazywać dane między komponentami za pomocą props?",
    "Jak działa mechanizm kluczy (keys) w React i dlaczego są ważne?",
    "How are you?",
    "What is your name?",
    "Where are you from?",
    "What is your favourite car?",
  ];

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    onQuestionChange(question);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Wylosuj pytanie</h2>
      <button className={styles.questionButton} onClick={getRandomQuestion}>
        Losuj pytanie
      </button>
    </div>
  );
};

export default QuestionPicker;
