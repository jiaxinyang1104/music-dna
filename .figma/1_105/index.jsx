import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.buttonMargin}>
      <div className={styles.container}>
        <div className={styles.text}>
          <p className={styles.a}>🎵</p>
        </div>
        <div className={styles.text3}>
          <p className={styles.text2}>一键导入歌单</p>
        </div>
      </div>
    </div>
  );
}

export default Component;
