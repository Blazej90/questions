"use client";

import React, { useState, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import styles from "../SpeechButton/SpeechButton.module.css";
import ClearButton from "../ClearButton/ClearButton";
import RecordingTimer from "../RecordingTimer/RecordingTimer";
import MicrophoneButton from "../MicrophoneButton/MicrophoneButton";
import ResultsList from "../ResultList/ResultList";

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

  if (error) {
    return (
      <p className={styles.error}>
        Web Speech API is not available in this browser 🤷‍
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <RecordingTimer isRecording={isRecording} recordingTime={recordingTime} />
      <MicrophoneButton
        isRecording={isRecording}
        onClick={isRecording ? stopSpeechToText : handleStartSpeechToText}
      />
      <ResultsList
        results={localResults}
        interimResult={interimResult ?? null}
      />
      <ClearButton onClear={clearResults} />
    </div>
  );
};

export default SpeechButton;
