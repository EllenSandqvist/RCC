import styles from "./Toast.module.css";

const Toast = ({ onClose }) => {
  return (
    <div className={styles.toast} role="alert">
      <div className={styles.toast_message}>
        <p>Toast</p>
      </div>
      <button className={styles.close_btn} onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Toast;
