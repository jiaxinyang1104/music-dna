import React, { useEffect } from 'react';
import styles from './Toast.module.scss';

const Toast = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.toast}>{message}</div>
    </div>
  );
};

export default Toast;