"use client";

import React, { useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import styles from "./SpeechButton.module.css";
import ClearButton from "../ClearButton/ClearButton";

const SpeechButtonClient: React.FC = () => {
  const [localResults, setLocalResults] = useState<string[]>([]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  React.useEffect(() => {
    const processedResults = results.map((result) =>
      typeof result === "string" ? result : result.transcript
    );
    setLocalResults(processedResults);
  }, [results]);

  const clearResults = () => {
    setLocalResults([]);
  };

  if (error) {
    return (
      <p className={styles.error}>
        Web Speech API is not available in this browser 🤷‍
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <h1
        className={`${styles.heading} ${
          isRecording ? styles.recording : styles.notRecording
        }`}
      >
        Recording: {isRecording.toString()}
      </h1>
      <button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        className={`${styles.button} ${isRecording ? styles.recording : ""}`}
      >
        <img
          src="/icons/microphone.svg"
          alt="Microphone"
          className={styles.microphone}
        />
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <ul className={styles.list}>
        {localResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
      <ClearButton onClear={clearResults} />
    </div>
  );
};

export default SpeechButtonClient;
