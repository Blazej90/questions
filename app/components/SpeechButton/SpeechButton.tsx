"use client";

import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "../SpeechButton/SpeechButton.module.css";
import ClearButton from "../ClearButton/ClearButton";
import RecordingTimer from "../RecordingTimer/RecordingTimer";
import MicrophoneButton from "../MicrophoneButton/MicrophoneButton";
import ResultsList from "../ResultList/ResultList";

const SpeechButton: React.FC = () => {
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (listening) {
      timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [listening]);

  const handleStartListening = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleStopListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
  };

  if (!isClient) return null;

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className={styles.error}>
        Your browser doesn't support speech recognition.
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <RecordingTimer isRecording={listening} recordingTime={recordingTime} />
      <MicrophoneButton
        isRecording={listening}
        onClick={listening ? handleStopListening : handleStartListening}
      />
      <ResultsList results={[transcript]} interimResult={null} />
      <ClearButton onClear={resetTranscript} />
    </div>
  );
};

export default SpeechButton;
