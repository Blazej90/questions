import React from "react";
import SpeechButton from "./components/SpeechButton/SpeechButton";
import Questions from "./components/Questions/Questions";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Questions and Answers</h1>
      <Questions />
      <SpeechButton />
    </div>
  );
}
