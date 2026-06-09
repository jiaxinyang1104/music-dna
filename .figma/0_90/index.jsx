import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame}>
      <p className={styles.header}>Music Persona</p>
      <div className={styles.content}>
        <p className={styles.title}>
          测测
          <br />
          你的音乐人生
        </p>
        <img src="../image/mq06jh3a-9907xwx.svg" className={styles.glowingHeart} />
      </div>
    </div>
  );
}

export default Component;
