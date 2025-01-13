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
  const [results, setResults] = useState<{ text: string; time: number }[]>([]); 
  const [isClient, setIsClient] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

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
      const timeSpent = recordingTime;
      setResults((prevResults) => [
        { text: transcript.trim(), time: timeSpent }, 
        ...prevResults,
      ]);
      resetTranscript();
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
        question,
      });

      const aiAnswer = response.data.aiAnswer;

      if (aiAnswer) {
        setFeedback(aiAnswer);
      } else {
        setFeedback("Brak odpowiedzi od AI.");
      }
    } catch (error) {
      console.error("Error getting response from OpenAI:", error);
      setFeedback("Przepraszamy, wystąpił błąd przy uzyskiwaniu odpowiedzi.");
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

      {feedback && (
        <div className={styles.feedback}>
          <strong>Feedback AI:</strong>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechButton;
