import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ShareModal from '../components/ShareModal';
import styles from './Report.module.scss';

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { incomeText = '', crashText = '', loveText = '', incomeDesc = '', crashDesc = '', loveDesc = '', finalQuote = '', nickname = '小蓝', songs = [] } = location.state || {};

  const randomSong = useMemo(() => {
    if (songs.length > 0) {
      const pick = songs[Math.floor(Math.random() * songs.length)];
      return pick.name || '';
    }
    return '你要跳舞吗';
  }, [songs]);

  const descWithSongs = useMemo(() => {
    if (songs.length === 0) {
      return { filledIncomeDesc: incomeDesc, filledCrashDesc: crashDesc, filledLoveDesc: loveDesc };
    }

    const pick = () => {
      const s = songs[Math.floor(Math.random() * songs.length)];
      return s.name || '未知歌曲';
    };

    const fill = (text) => {
      if (!text) return text;
      return text.replace(/《[^》]+》/g, () => `《${pick()}》`);
    };

    return {
      filledIncomeDesc: fill(incomeDesc),
      filledCrashDesc: fill(crashDesc),
      filledLoveDesc: fill(loveDesc),
    };
  }, [incomeDesc, crashDesc, loveDesc, songs]);

  const [expandedWealth, setExpandedWealth] = useState(false);
  const [expandedCrash, setExpandedCrash] = useState(false);
  const [expandedLove, setExpandedLove] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <div className={styles.frame}>
      <div className={styles.autoWrapper2}>
        <div className={styles.container10}>
          <img src="/assets/mq0689ib-5nftwkj.svg" className={styles.icon} alt="" />
          <div className={styles.autoWrapper}>
            <div className={styles.container} />
            <div className={styles.container4}>
              <div className={styles.text}>
                <p className={styles.a941}>9:41</p>
              </div>
              <div className={styles.container2} />
              <div className={styles.container3}>
                <div className={styles.icon2}>
                  <div className={styles.vector} />
                  <div className={styles.vector2} />
                  <div className={styles.vector3} />
                  <div className={styles.vector4} />
                </div>
                <img src="/assets/mq0689ib-akxbqfc.svg" className={styles.icon3} alt="" />
              </div>
            </div>
            <div className={styles.container9}>
              <div className={styles.container6}>
                <p className={styles.musicDnaReport}>Music DNA Report</p>
                <div className={styles.container5}>
                  <p className={styles.text2}>
                    {nickname} 的<br />
                    音乐基因检测报告
                  </p>
                </div>
              </div>
              <div className={styles.containerTransform}>
                <div className={styles.container8}>
                  <div className={styles.container7}>
                    <div className={styles.vector5} />
                  </div>
                  <div className={styles.icon4}>
                    <div className={styles.vector6} />
                  </div>
                  <div className={styles.icon5}>
                    <div className={styles.vector7} />
                  </div>
                  <div className={styles.icon6}>
                    <div className={styles.vector8} />
                  </div>
                  <div className={styles.icon7}>
                    <div className={styles.vector9} />
                  </div>
                  <div className={styles.icon8}>
                    <div className={styles.vector11}>
                      <div className={styles.vector10} />
                    </div>
                  </div>
                  <div className={styles.vector14}>
                    <div className={styles.vector12} />
                    <div className={styles.vector13} />
                  </div>
                  <div className={styles.icon9}>
                    <div className={styles.vector15} />
                  </div>
                  <img src="/assets/mq0689ib-dircsvh.png" className={styles.icon10} alt="" />
                  <img src="/assets/mq0689ib-cuidblc.png" className={styles.icon11} alt="" />
                  <img src="/assets/mq0689ib-39eg8c0.png" className={styles.icon12} alt="" />
                  <img src="/assets/mq0689ib-xtxokq1.png" className={styles.icon13} alt="" />
                  <div className={styles.paragraph}>
                    <p className={styles.a}>♪</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container11}>
          <img src="/assets/mq0689ib-a5bhxnk.svg" className={styles.icon14} alt="" />
        </div>
        <div className={styles.container12}>
          <img src="/assets/mq0689ib-5bh31ao.svg" className={styles.icon15} alt="" />
        </div>
        <img src="/assets/mq0689ib-i3qq39i.svg" className={styles.icon16} alt="" />
      </div>
      <div className={styles.headerOverlay}>
        <div className={styles.statusBar}>
          <div className={styles.timeArea}>
            <p className={styles.timeText}>9:41</p>
          </div>
          <div className={styles.notch} />
          <div className={styles.statusIconsArea}>
            <div className={styles.signalBars}>
              <div className={styles.bar1} />
              <div className={styles.bar2} />
              <div className={styles.bar3} />
              <div className={styles.bar4} />
            </div>
            <img src="/assets/mq0689ib-akxbqfc.svg" className={styles.wifiIcon} alt="" />
          </div>
        </div>
        <div className={styles.titleSection}>
          <p className={styles.subtitle}>Music DNA Report</p>
          <p className={styles.reportTitle}>
            {nickname} 的<br />
            音乐基因检测报告
          </p>
        </div>
      </div>
      <div className={styles.autoWrapper5}>
        <div className={styles.container26}>
          <img src="/assets/mq0689ib-9fcufpl.svg" className={styles.icon17} alt="" />
          <div className={styles.autoWrapper4}>

            <div className={styles.container17}>
              <div className={styles.autoWrapper3}>
                <div className={styles.resultCard}>
                  <div className={styles.container13}>
                    <div className={styles.text3}>
                      <p className={styles.a2}>💰</p>
                    </div>
                    <div className={styles.text5}>
                      <p className={styles.text4}>财富曲线</p>
                    </div>
                  </div>
                  <div className={styles.container14}>
                    <p className={styles.a3}>?</p>
                  </div>
                </div>
                <p className={styles.text6}>未来一年赚的钱</p>
                <div className={styles.resultCard2} />
              </div>
              <div className={styles.placeholderForAppMar}>
                <div className={styles.container15}>
                  <p className={styles.a27500}>{incomeText || '--'}</p>
                </div>
              </div>
              <div className={styles.collapseText}>
                <div
                  className={styles.container16}
                  style={expandedWealth ? { height: 'auto', overflow: 'visible' } : {}}
                >
                  <p className={styles.text9}>
                    {descWithSongs.filledIncomeDesc || '根据你的答题结果，你的财富曲线已经生成。展开查看更多分析...'}
                  </p>
                </div>
                <div className={styles.buttonMargin}>
                  <div
                    className={styles.button}
                    onClick={() => setExpandedWealth(!expandedWealth)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p className={styles.text10}>{expandedWealth ? '收起' : '展开全部'}</p>
                    <div className={styles.text11}>
                      <p className={styles.a4}>{expandedWealth ? '▴' : '▾'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.container22}
              style={expandedCrash ? { height: 'auto', overflow: 'visible' } : {}}
            >
              <div className={styles.resultCard3}>
                <div className={styles.container13}>
                  <div className={styles.text3}>
                    <p className={styles.a2}>⛈️</p>
                  </div>
                  <div className={styles.text5}>
                    <p className={styles.text4}>崩溃预警</p>
                  </div>
                </div>
                <div className={styles.container14}>
                  <p className={styles.a3}>?</p>
                </div>
              </div>
              <p className={styles.text12}>下一次崩溃的时间</p>
              <div className={styles.container19}>
                <div className={styles.container18}>
                  <p className={styles.text13}>{crashText || '--'}</p>
                </div>
                <p className={styles.text14}>基于你的听歌习惯预测</p>
              </div>
              <div className={styles.collapseText2}>
                <div
                  className={styles.container20}
                  style={expandedCrash ? { height: 'auto', overflow: 'visible' } : {}}
                >
                  <p className={styles.text15}>
                    {descWithSongs.filledCrashDesc || '根据你的答题模式，你的情绪波动与听歌习惯高度相关。'}
                  </p>
                </div>
                <div className={styles.buttonMargin}>
                  <div
                    className={styles.button}
                    onClick={() => setExpandedCrash(!expandedCrash)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p className={styles.text10}>{expandedCrash ? '收起' : '展开全部'}</p>
                    <div className={styles.text11}>
                      <p className={styles.a4}>{expandedCrash ? '▴' : '▾'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.inlineContent}>
                <div className={styles.container21}>
                  <p className={styles.a5}>🎵</p>
                  <div className={styles.text19}>
                    <p className={styles.text18}>
                      <span className={styles.text16}>播放&nbsp;</span>
                      <span className={styles.text17}>《{randomSong}》</span>
                      <span className={styles.text16}>&nbsp;18 分钟后自愈</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.resultCard4} />
            </div>

            <div className={styles.container25}>
              <div className={styles.resultCard3}>
                <div className={styles.container13}>
                  <div className={styles.text3}>
                    <p className={styles.a2}>💕</p>
                  </div>
                  <div className={styles.text5}>
                    <p className={styles.text4}>恋爱节奏</p>
                  </div>
                </div>
                <div className={styles.container14}>
                  <p className={styles.a3}>?</p>
                </div>
              </div>
              <p className={styles.text12}>恋爱进展</p>
              <div className={styles.container23}>
                <p className={styles.text21}>{loveText || '暂无数据'}</p>
              </div>
              <div className={styles.collapseText3}>
                <div
                  className={styles.container24}
                  style={expandedLove ? { height: 'auto', overflow: 'visible' } : {}}
                >
                  <p className={styles.text24}>
                    {descWithSongs.filledLoveDesc || '你的恋爱节奏由你的音乐品味决定。'}
                  </p>
                </div>
                <div className={styles.buttonMargin}>
                  <div
                    className={styles.button}
                    onClick={() => setExpandedLove(!expandedLove)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p className={styles.text10}>{expandedLove ? '收起' : '展开全部'}</p>
                    <div className={styles.text11}>
                      <p className={styles.a4}>{expandedLove ? '▴' : '▾'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.resultCard5} />
            </div>

          </div>
        </div>
        <div className={styles.container28}>
          <div className={styles.button2} onClick={() => setShowShare(true)} style={{ cursor: 'pointer' }}>
            <p className={styles.text25}>分享卡片</p>
          </div>
          <p className={styles.text26} onClick={() => navigate('/')}>重新测试</p>
          <div className={styles.container27} />
        </div>
      </div>
      {showShare && (
        <ShareModal
          nickname={nickname}
          incomeText={incomeText}
          crashText={crashText}
          loveText={loveText}
          incomeDesc={descWithSongs.filledIncomeDesc}
          crashDesc={descWithSongs.filledCrashDesc}
          loveDesc={descWithSongs.filledLoveDesc}
          finalQuote={finalQuote}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
};

export default Report;