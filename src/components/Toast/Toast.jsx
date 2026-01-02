import styles from "./Toast.module.css";
import { IoClose } from "react-icons/io5";

const Toast = ({ type, onClose, message }) => {
  const typeStyle = type === "error" ? styles.error : styles.success;
  return (
    <div className={`${styles.toast} ${typeStyle}`} role="alert">
      <div className={styles.toast_message}>
        <p>{message}</p>
      </div>
      <button className={styles.close_btn} onClick={onClose}>
        <IoClose />
      </button>
    </div>
  );
};

export default Toast;
