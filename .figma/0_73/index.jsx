import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.container3}>
      <div className={styles.containerMargin}>
        <div className={styles.container2}>
          <div className={styles.container}>
            <img src="../image/mq06jh3t-lex6exw.svg" className={styles.icon} />
          </div>
          <div className={styles.textInput}>
            <p className={styles.text}>hi 请输入你的昵称</p>
          </div>
        </div>
      </div>
      <div className={styles.buttonMargin}>
        <div className={styles.button}>
          <div className={styles.text2}>
            <p className={styles.importPlaylistButton}>去导入歌单</p>
          </div>
          <div className={styles.text3}>
            <p className={styles.rightArrowIcon}>→</p>
          </div>
        </div>
      </div>
      <p className={styles.description3}>
        <span className={styles.description}>已有&nbsp;</span>
        <span className={styles.description2}>1,234</span>
        <span className={styles.description}>&nbsp;人测试过 ✨</span>
      </p>
    </div>
  );
}

export default Component;
