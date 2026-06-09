import React from 'react';
import styles from './LoadingGuard.module.scss';

const LoadingGuard = () => {
  return (
    <div className={styles.guard}>
      <div className={styles.card}>
        <div className={styles.notes}>
          <span className={styles.note1}>♪</span>
          <span className={styles.note2}>♬</span>
          <span className={styles.note3}>♩</span>
        </div>
        <p className={styles.title}>Music Persona</p>
        <p className={styles.subtitle}>加载中…</p>
      </div>
    </div>
  );
};

export default LoadingGuard;