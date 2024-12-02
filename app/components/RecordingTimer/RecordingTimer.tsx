import styles from "./RecordingTimer.module.css";

const RecordingTimer: React.FC<{
  isRecording: boolean;
  recordingTime: number;
}> = ({ isRecording, recordingTime }) => {
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return [hours, minutes, seconds]
      .map((unit) => unit.toString().padStart(2, "0"))
      .join(":");
  };

  return (
    <h1
      className={`${styles.heading} ${
        isRecording ? styles.recording : styles.notRecording
      }`}
    >
      Recording: {isRecording ? formatTime(recordingTime) : ""}
    </h1>
  );
};

export default RecordingTimer;
