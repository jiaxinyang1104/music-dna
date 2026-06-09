import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCurrentTime } from '../hooks/useCurrentTime';
import LoadingGuard from '../components/LoadingGuard';
import Toast from '../components/Toast';
import styles from './Import.module.scss';

const FORMAT_RE = /歌名:.*歌手:/;

const Import = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || '小蓝';
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const currentTime = useCurrentTime();

  useLayoutEffect(() => {
    if (!location.state?.nickname) {
      navigate('/', { replace: true });
    }
  }, []);

  if (!location.state?.nickname) {
    return <LoadingGuard />;
  }

  const parseSongs = (text) => {
    return text
      .split('\n')
      .filter(line => FORMAT_RE.test(line))
      .map(line => {
        const [, name] = line.match(/歌名:(.*?);/) || [];
        const [, artist] = line.match(/歌手:(.*)/) || [];
        return { name: name?.trim(), artist: artist?.trim() };
      })
      .filter(s => s.name);
  };

  const handleImport = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
      if (FORMAT_RE.test(text)) {
        setIsValid(true);
      } else {
        setIsValid(false);
        setToastMessage('歌单 ID 格式不对，请根据下方操作指引导入哦～');
        setToastVisible(true);
      }
    } catch {
      setToastMessage('读取剪贴板失败，请手动粘贴');
      setToastVisible(true);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setIsValid(FORMAT_RE.test(val));
  };

  const handleAnalyze = useCallback(() => {
    if (!isValid || !inputValue) return;
    const songs = parseSongs(inputValue);
    if (songs.length === 0) {
      setToastMessage('未识别到有效歌单，请检查格式');
      setToastVisible(true);
      return;
    }
    navigate('/quiz', { state: { songs, nickname, playlistText: inputValue } });
  }, [isValid, inputValue, navigate, nickname]);

  return (
    <div className={styles.frame6}>
      <div className={styles.autoWrapper}>
        <div className={styles.container} />
        <div className={styles.container2} />
      </div>
      <div className={styles.autoWrapper8}>
        <div className={styles.frame2}>
          <div className={styles.aStatusBarTime}>
            <p className={styles.aTime}>{currentTime}</p>
          </div>
          <div className={styles.signalWifiBattery}>
            <img src="./assets/mq0689ht-k9djkfs.svg" className={styles.iconMobileSignal} alt="" />
            <img src="./assets/mq0689ht-xwuic2p.svg" className={styles.wifi} alt="" />
            <img src="./assets/mq0689ht-yu3h638.svg" className={styles.aStatusBarBattery} alt="" />
          </div>
          <div className={styles.frame} />
        </div>
        <div className={styles.autoWrapper7}>
          <div className={styles.frame3} />
          <div className={styles.frame4}>
            <div className={styles.buttonMargin}>
              <div
                className={`${styles.button} ${isValid ? styles.buttonEnabled : ''}`}
                onClick={handleAnalyze}
              >
                <p className={styles.text}>开始分析</p>
                <img src="./assets/mq0689ht-xipj7b0.svg" className={styles.icon} alt="" />
              </div>
            </div>
            <div className={styles.container3}>
              <img src="./assets/mq0689ht-ad3j7bc.svg" className={styles.icon2} alt="" />
              <div className={styles.text3}>
                <p className={styles.text2}>歌单仅在本地分析，不上传服务器</p>
              </div>
            </div>
          </div>
          <div className={styles.container17}>
            <div className={styles.autoWrapper4}>
              <div className={styles.button2} onClick={() => navigate('/')}>
                <img src="./assets/mq0689ht-7e6cns9.svg" className={styles.icon3} alt="" />
              </div>
              <div className={styles.container4}>
                <div className={styles.heading1}>
                  <div className={styles.autoWrapper2}>
                    <p className={styles.text4}>欢迎，<span className={styles.text5}>{nickname}</span></p>
                  </div>
                  <div className={styles.text7}>
                    <p className={styles.a}>✨</p>
                  </div>
                </div>
                <p className={styles.text8}>让我们提取你的专属音乐 DNA</p>
              </div>
              <div className={styles.autoWrapper3}>
                <div className={styles.frame5}>
                  <img src="./assets/mq0689ht-ye0nwj7.svg" className={styles.icon4} alt="" />
                  <img src="./assets/mq0689ht-13n1pe7.svg" className={styles.icon5} alt="" />
                  <img src="./assets/mq0689ht-5wc3z99.svg" className={styles.icon6} alt="" />
                </div>
                <div className={styles.containerMargin}>
                  <div className={styles.glassCard}>
                    <div className={styles.app}>
                      <div className={styles.container5}>
                        <img src="./assets/mq0689ht-3todomr.svg" className={styles.icon7} alt="" />
                      </div>
                      <div className={styles.container6}>
                        <p className={styles.text9}>网易云音乐</p>
                        <p className={styles.netEaseCloudMusic}>
                          NetEase Cloud Music
                        </p>
                      </div>
                    </div>
                    <div className={styles.buttonMargin2}>
                      <div className={styles.container7} onClick={handleImport}>
                        <div className={styles.text10}>
                          <p className={styles.a2}>🎵</p>
                        </div>
                        <div className={styles.text12}>
                          <p className={styles.text11}>一键导入歌单</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.app2}>
                      <div className={styles.container8} />
                      <p className={styles.text13}>或手动粘贴链接</p>
                      <div className={styles.container8} />
                    </div>
                    <div className={styles.textInput}>
                      {inputValue ? (
                        <input
                          className={styles.input}
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className={styles.text14}>粘贴网易云分享链接…</p>
                      )}
                    </div>
                    <div className={styles.appMargin}>
                      <div className={styles.app3}>
                        <div className={styles.iconMargin}>
                          <img src="./assets/mq0689ht-sofd202.svg" className={styles.icon8} alt="" />
                        </div>
                        <div className={styles.paragraph}>
                          <p className={styles.text17}>
                            <span className={styles.text15}>
                              👉 操作指引：打开网易云&nbsp;
                            </span>
                            <span className={styles.text16}>红心歌单</span>
                            <span className={styles.text15}>
                              &nbsp;→ 点击右上角&nbsp;
                            </span>
                            <span className={styles.text16}>···</span>
                            <span className={styles.text15}>
                              &nbsp;→ 复制分享链接
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.container16}>
                  <p className={styles.text18}>更多平台 · 即将上线</p>
                  <div className={styles.container15}>
                    <div className={styles.container10}>
                      <div className={styles.containerMargin2}>
                        <div className={styles.container9} />
                      </div>
                      <p className={styles.spotify}>Spotify</p>
                    </div>
                    <div className={styles.container12}>
                      <div className={styles.containerMargin3}>
                        <div className={styles.container11} />
                      </div>
                      <p className={styles.spotify}>Apple Music</p>
                    </div>
                    <div className={styles.container14}>
                      <div className={styles.containerMargin4}>
                        <div className={styles.container13} />
                      </div>
                      <p className={styles.spotify}>QQ 音乐</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.autoWrapper5}>
            <img src="./assets/mq0689ht-sko6d2c.svg" className={styles.icon9} alt="" />
            <img src="./assets/mq0689ht-mpbwdup.svg" className={styles.icon10} alt="" />
          </div>
          <img src="./assets/mq0689ht-u70nx4s.svg" className={styles.icon11} alt="" />
          <div className={styles.autoWrapper6}>
            <img src="./assets/mq0689ht-g8fpz2r.svg" className={styles.icon9} alt="" />
            <img src="./assets/mq0689ht-2pravoy.svg" className={styles.icon12} alt="" />
          </div>
        </div>
      </div>
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};

export default Import;