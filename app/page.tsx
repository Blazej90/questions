import React from "react";
import SpeechButton from "./components/SpeechButton/SpeechButton";
import Questions from "./components/Questions/Questions";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Questions and Answers</h1>
      <Questions />
      <SpeechButton />
    </div>
  );
}
