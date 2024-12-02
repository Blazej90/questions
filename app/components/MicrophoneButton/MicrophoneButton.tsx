import Image from "next/image";
import styles from "./MicrophoneButton.module.css";

const MicrophoneButton: React.FC<{
  isRecording: boolean;
  onClick: () => void;
}> = ({ isRecording, onClick }) => {
  return (
    <button
      onClick={onClick}
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
  );
};

export default MicrophoneButton;
