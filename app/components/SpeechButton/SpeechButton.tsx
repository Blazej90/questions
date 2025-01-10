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
import axios from "axios";
import "regenerator-runtime/runtime";

interface SpeechButtonProps {
  question: string;
}

const SpeechButton: React.FC<SpeechButtonProps> = ({ question }) => {
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [results, setResults] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<string | null>(null);

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

  useEffect(() => {
    if (!listening && transcript.trim()) {
      setResults((prevResults) => [transcript.trim(), ...prevResults]);
      resetTranscript();
      // Wyślij tekst do AI
      getAIResponse(transcript);
    }
  }, [listening, transcript, resetTranscript]);

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

  const handleClear = () => {
    setResults([]);
    setFeedback(null);
    setEvaluation(null);
    resetTranscript();
  };

  const getAIResponse = async (userInput: string) => {
    if (!userInput.trim()) {
      console.error("User input is empty!");
      setFeedback("Please provide some input.");
      return;
    }

    try {
      const response = await axios.post("/api/openai", {
        userAnswer: userInput,
        question, // Przekazujemy również aktualne pytanie
      });

      const aiAnswer = response.data.aiAnswer;

      if (aiAnswer) {
        setFeedback(aiAnswer);
        evaluateResponse(userInput, aiAnswer);
      } else {
        setFeedback("Brak odpowiedzi od AI.");
      }
    } catch (error) {
      console.error("Error getting response from OpenAI:", error);
      setFeedback("Przepraszamy, wystąpił błąd przy uzyskiwaniu odpowiedzi.");
    }
  };

  const evaluateResponse = async (userInput: string, aiResponse: string) => {
    try {
      const evaluationResponse = await axios.post("/api/evaluate", {
        userAnswer: userInput,
        aiAnswer: aiResponse,
        question, // Przekazujemy również pytanie do oceny
      });

      const evaluation = evaluationResponse.data.evaluation;
      if (evaluation !== undefined) {
        setEvaluation(evaluation);
      } else {
        setEvaluation("Brak oceny.");
      }
    } catch (error) {
      console.error("Error evaluating response:", error);
      setEvaluation("Przepraszamy, wystąpił błąd przy ocenie odpowiedzi.");
    }
  };

  if (!isClient) return null;

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className={styles.error}>
        Your browser does not support speech recognition.
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
      <ResultsList
        results={results}
        interimResult={listening ? transcript : null}
      />
      <ClearButton onClear={handleClear} />

      <div className={styles.question}>
        <strong>Pytanie:</strong> <p>{question}</p>
      </div>

      {feedback && (
        <div className={styles.feedback}>
          <strong>Feedback AI:</strong>
          <p>{feedback}</p>
        </div>
      )}
      {evaluation && (
        <div className={styles.evaluation}>
          <strong>Ocena AI:</strong>
          <p>{evaluation}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechButton;
