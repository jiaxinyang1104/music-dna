import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading1}>
        <div className={styles.autoWrapper}>
          <p className={styles.text}>欢迎，</p>
          <div className={styles.text3}>
            <p className={styles.text2}>小蓝</p>
          </div>
        </div>
        <div className={styles.text4}>
          <p className={styles.a}>✨</p>
        </div>
      </div>
      <p className={styles.text5}>让我们提取你的专属音乐 DNA</p>
    </div>
  );
}

export default Component;
