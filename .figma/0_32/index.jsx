import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame}>
      <p className={styles.note}>♪</p>
      <p className={styles.note2}>♬</p>
      <p className={styles.note3}>♩</p>
      <p className={styles.note4}>♫</p>
      <p className={styles.note5}>♪</p>
    </div>
  );
}

export default Component;
