import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <img src="../image/mq0yghvl-1f6gy0z.svg" className={styles.icon} />
        <p className={styles.text}>上一题</p>
      </div>
      <div className={styles.button2}>
        <p className={styles.text2}>下一题</p>
        <img src="../image/mq0yghvl-y803iwc.svg" className={styles.icon} />
      </div>
    </div>
  );
}

export default Component;
