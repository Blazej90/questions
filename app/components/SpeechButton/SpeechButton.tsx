"use client";

import React, { useState, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Image from "next/image";
import styles from "./SpeechButton.module.css";
import ClearButton from "../ClearButton/ClearButton";

const SpeechButton: React.FC = () => {
  const [localResults, setLocalResults] = useState<string[]>([]);
  const [recordingTime, setRecordingTime] = useState<number>(0);

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
    timeout: Infinity,
  });
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRecording) {
      const start = Date.now() - recordingTime * 1000;
      interval = setInterval(() => {
        setRecordingTime(Math.floor((Date.now() - start) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    const processedResults = results.map((result) =>
      typeof result === "string" ? result : result.transcript
    );
    setLocalResults(processedResults);
  }, [results]);

  const clearResults = () => {
    setLocalResults([]);
    setRecordingTime(0);
  };

  const handleStartSpeechToText = async () => {
    clearResults();
    await stopSpeechToText();
    await startSpeechToText();
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map((unit) => unit.toString().padStart(2, "0"))
      .join(":");
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
        Recording: {isRecording ? formatTime(recordingTime) : ""}
      </h1>
      <button
        onClick={isRecording ? stopSpeechToText : handleStartSpeechToText}
        className={`${styles.speechButton} ${
          isRecording ? styles.recording : ""
        }`}
      >
        <Image
          src="/icons/microphone.svg"
          alt="Microphone"
          className={`${styles.microphone} ${
            isRecording ? styles.recording : ""
          }`}
          width={24}
          height={24}
        />
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <ul className={styles.list}>
        {localResults.map((result, index) => (
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
      <ClearButton onClear={clearResults} />
    </div>
  );
};

export default SpeechButton;
