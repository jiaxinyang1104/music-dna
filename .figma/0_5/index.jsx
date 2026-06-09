import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame8}>
      <div className={styles.autoWrapper}>
        <div className={styles.container} />
        <div className={styles.frame}>
          <p className={styles.note}>♪</p>
          <p className={styles.note2}>♬</p>
          <p className={styles.note3}>♩</p>
          <p className={styles.note4}>♫</p>
          <p className={styles.note5}>♪</p>
        </div>
        <div className={styles.frame2}>
          <div className={styles.container2}>
            <img src="../image/mq0cinix-h7vmnsi.png" className={styles.icon} />
          </div>
          <div className={styles.icon2}>
            <div className={styles.vector} />
          </div>
          <div className={styles.icon3}>
            <div className={styles.vector2} />
          </div>
          <img src="../image/mq0cinix-h184cck.png" className={styles.icon4} />
          <img src="../image/mq0cinix-wes7jpf.png" className={styles.icon5} />
          <img src="../image/mq0cinix-aszk4gp.png" className={styles.icon6} />
          <div className={styles.vector5}>
            <div className={styles.vector3} />
            <div className={styles.vector4} />
          </div>
          <div className={styles.icon7}>
            <div className={styles.vector6} />
          </div>
          <img src="../image/mq0cinix-uaimbhq.png" className={styles.icon8} />
          <img src="../image/mq0cinix-mnza8gt.png" className={styles.icon9} />
        </div>
      </div>
      <div className={styles.autoWrapper3}>
        <div className={styles.frame4}>
          <div className={styles.autoWrapper2}>
            <div className={styles.aStatusBarTime}>
              <p className={styles.aTime}>9:41</p>
            </div>
            <div className={styles.frame3} />
          </div>
          <div className={styles.signalWifiBattery}>
            <img
              src="../image/mq0cinix-r9lmxts.svg"
              className={styles.iconMobileSignal}
            />
            <img src="../image/mq0cinix-8yumllt.svg" className={styles.wifi} />
            <img
              src="../image/mq0cinix-5j0lcvw.svg"
              className={styles.aStatusBarBattery}
            />
          </div>
        </div>
        <div className={styles.frame5}>
          <p className={styles.header}>Music Persona</p>
          <div className={styles.content}>
            <p className={styles.title}>
              测测
              <br />
              你的音乐人生
            </p>
            <img
              src="../image/mq0ciniy-nsz9ia9.svg"
              className={styles.glowingHeart}
            />
          </div>
        </div>
        <div className={styles.container5}>
          <div className={styles.containerMargin}>
            <div className={styles.container4}>
              <div className={styles.container3}>
                <img
                  src="../image/mq0cinix-ark0s0y.svg"
                  className={styles.icon10}
                />
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
        <img src="../image/mq0ciniy-fe54xqn.svg" className={styles.musicalStaff} />
        <div className={styles.frame6}>
          <img src="../image/mq0cinix-ncnfmne.svg" className={styles.icon11} />
          <div className={styles.text4}>
            <p className={styles.privacyNote}>歌单仅在本地分析，不上传服务器</p>
          </div>
        </div>
        <div className={styles.frame7} />
      </div>
    </div>
  );
}

export default Component;
