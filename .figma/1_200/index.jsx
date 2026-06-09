import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.container8}>
      <div className={styles.button}>
        <img src="../image/mq0y3fg7-lcectey.svg" className={styles.icon} />
      </div>
      <div className={styles.progressBar}>
        <div className={styles.container}>
          <div className={styles.text}>
            <p className={styles.questionnaire}>Questionnaire</p>
          </div>
          <div className={styles.text5}>
            <p className={styles.text4}>
              <span className={styles.text2}>第&nbsp;</span>
              <span className={styles.text3}>1</span>
              <span className={styles.text2}>&nbsp;/ 5 题</span>
            </p>
          </div>
        </div>
        <div className={styles.containerMargin}>
          <div className={styles.container3}>
            <div className={styles.container2} />
          </div>
        </div>
      </div>
      <div className={styles.container7}>
        <div className={styles.container6}>
          <div className={styles.inlineContent}>
            <div className={styles.container5}>
              <div className={styles.container4} />
              <div className={styles.text6}>
                <p className={styles.q1}>Q1</p>
              </div>
            </div>
          </div>
          <p className={styles.text7}>近一年更倾向的 音乐风格？</p>
          <p className={styles.text8}>可多选，选出你的心头好</p>
          <div className={styles.chipOptions}>
            <div className={styles.autoWrapper}>
              <div className={styles.button2}>
                <p className={styles.text9}>流行 Pop</p>
              </div>
              <div className={styles.button3}>
                <p className={styles.text9}>R&B</p>
              </div>
              <div className={styles.button2}>
                <p className={styles.text9}>电子 EDM</p>
              </div>
            </div>
            <div className={styles.autoWrapper2}>
              <div className={styles.button3}>
                <p className={styles.text9}>说唱 Rap</p>
              </div>
              <div className={styles.button3}>
                <p className={styles.text9}>摇滚 Rock</p>
              </div>
              <div className={styles.button3}>
                <p className={styles.text9}>民谣</p>
              </div>
            </div>
            <div className={styles.autoWrapper3}>
              <div className={styles.button3}>
                <p className={styles.text9}>古典</p>
              </div>
              <div className={styles.button3}>
                <p className={styles.text9}>爵士 Jazz</p>
              </div>
              <div className={styles.button3}>
                <p className={styles.text9}>K-Pop</p>
              </div>
            </div>
            <div className={styles.button4}>
              <p className={styles.text9}>独立 Indie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
