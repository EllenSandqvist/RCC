import { IoCloseSharp } from "react-icons/io5";

import styles from "./Toast.module.css";

const Toast = ({ type, onClose, message }) => {
  const typeStyle = type === "error" ? styles.error : styles.success;
  return (
    <div className={`${styles.toast} ${typeStyle}`} role="alert">
      <div className={styles.toast_message}>
        <p>{message}</p>
      </div>
      <button className={styles.close_btn} onClick={onClose}>
        <IoCloseSharp className={styles.close_icon} />
      </button>
    </div>
  );
};

export default Toast;
