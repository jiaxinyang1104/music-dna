import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.autoWrapper}>
        <div className={styles.container}>
          <p className={styles.musicDnaAnalysis}>Music DNA Analysis</p>
          <p className={styles.text}>音乐 DNA 分析</p>
        </div>
        <div className={styles.container3}>
          <div className={styles.component2}>
            <div className={styles.leftSide}>
              <p className={styles.aTime}>9:41</p>
            </div>
            <div className={styles.container2}>
              <div className={styles.component} />
            </div>
            <div className={styles.signalWifiBattery}>
              <img src="../image/mq0689hj-g266g3n.svg" className={styles.icon} />
            </div>
          </div>
          <img src="../image/mq0689hj-x7abul2.svg" className={styles.icon2} />
        </div>
        <div className={styles.container4} />
        <div className={styles.container5}>
          <img src="../image/mq0689hj-ky3rdn6.svg" className={styles.icon3} />
        </div>
        <div className={styles.container8}>
          <img src="../image/mq0689hj-otlmiw6.svg" className={styles.icon4} />
          <img src="../image/mq0689hj-qjkz9ld.svg" className={styles.icon5} />
          <div className={styles.container7}>
            <div className={styles.container6}>
              <img
                src="../image/mq0689hj-56cv034.svg"
                className={styles.doneState}
              />
            </div>
            <div className={styles.doneState2}>
              <p className={styles.text2}>分析完成！</p>
              <p className={styles.text3}>正在跳转至你的音乐人格…</p>
            </div>
          </div>
        </div>
      </div>
      <img src="../image/mq0689hj-lt9bjsq.svg" className={styles.icon6} />
      <div className={styles.container9}>
        <img src="../image/mq0689hj-f2x1dt5.svg" className={styles.icon7} />
        <div className={styles.text5}>
          <p className={styles.text4}>歌单仅在本地分析，不上传服务器</p>
        </div>
      </div>
      <div className={styles.container10} />
    </div>
  );
}

export default Component;
