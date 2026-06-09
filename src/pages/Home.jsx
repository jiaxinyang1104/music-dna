import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const isValid = nickname.trim().length > 0;

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
            <img src="./assets/mq06jgv4-ceh9wot.png" className={styles.icon} alt="" />
          </div>
          <div className={styles.icon2}>
            <div className={styles.vector} />
          </div>
          <div className={styles.icon3}>
            <div className={styles.vector2} />
          </div>
          <img src="./assets/mq06jgv4-4q7jtpi.png" className={styles.icon4} alt="" />
          <img src="./assets/mq06jgv4-asxn2v6.png" className={styles.icon5} alt="" />
          <img src="./assets/mq06jgv4-vrxwff1.png" className={styles.icon6} alt="" />
          <div className={styles.vector5}>
            <div className={styles.vector3} />
            <div className={styles.vector4} />
          </div>
          <div className={styles.icon7}>
            <div className={styles.vector6} />
          </div>
          <img src="./assets/mq06jgv4-w2akpic.png" className={styles.icon8} alt="" />
          <img src="./assets/mq06jgv4-x7quzac.png" className={styles.icon9} alt="" />
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
            <img src="./assets/mq06jguv-yyds98h.svg" className={styles.iconMobileSignal} alt="" />
            <img src="./assets/mq06jguv-dg1lrsc.svg" className={styles.wifi} alt="" />
            <img src="./assets/mq06jguv-2axtvnx.svg" className={styles.aStatusBarBattery} alt="" />
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
            <img src="./assets/mq06jh3a-9907xwx.svg" className={styles.glowingHeart} alt="" />
          </div>
        </div>
        <div className={styles.container5}>
          <div className={styles.containerMargin}>
            <div className={styles.container4}>
              <div className={styles.container3}>
                <img src="./assets/mq06jh3t-lex6exw.svg" className={styles.icon10} alt="" />
              </div>
              <div className={styles.textInput}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="hi 请输入你的昵称"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonMargin}>
            <div
              className={`${styles.button} ${!isValid ? styles.buttonDisabled : ''}`}
              onClick={() => isValid && navigate('/import', { state: { nickname } })}
              style={{ cursor: isValid ? 'pointer' : 'not-allowed', opacity: isValid ? 1 : 0.5 }}
            >
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
        <img src="./assets/mq06jh3j-qdyvmdd.svg" className={styles.musicalStaff} alt="" />
        <div className={styles.frame6}>
          <img src="./assets/mq0689gy-x6lmu2w.svg" className={styles.icon11} alt="" />
          <div className={styles.text4}>
            <p className={styles.privacyNote}>歌单仅在本地分析，不上传服务器</p>
          </div>
        </div>
        <div className={styles.frame7} />
      </div>
    </div>
  );
};

export default Home;
