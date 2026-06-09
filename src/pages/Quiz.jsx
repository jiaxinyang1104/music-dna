import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { analyzePlaylistStyle, computeScores, getResultTexts, getRandomQuote } from '../utils/scoreUtils';
import styles from './Quiz.module.scss';

const questions = [
  {
    id: 1,
    type: 'multi',
    question: '你最近三个月听得最多的歌是下面哪些类型？',
    hint: '可多选，选出你的心头好',
    options: [
      { label: '华语流行', scores: { wealth: 2, breakdown: 1, love: 2 } },
      { label: '欧美热单', scores: { wealth: 2, breakdown: 2, love: 2 } },
      { label: '国内独立摇滚/土摇', scores: { wealth: 1, breakdown: 3, love: 1 } },
      { label: '日系ACG/二次元', scores: { wealth: 1, breakdown: 0, love: 3 } },
      { label: '韩流男团/女团', scores: { wealth: 2, breakdown: 1, love: 2 } },
      { label: '爵士/布鲁斯', scores: { wealth: 3, breakdown: 1, love: 2 } },
      { label: '古典/交响乐', scores: { wealth: 3, breakdown: 1, love: 1 } },
      { label: 'DJ/电音（土嗨上头）', scores: { wealth: 1, breakdown: 2, love: 1 } },
      { label: '说唱/嘻哈（押韵狂魔）', scores: { wealth: 2, breakdown: 2, love: 1 } },
      { label: '随机大杂烩（啥都有，看心情）', scores: { wealth: 2, breakdown: 3, love: 2 } },
    ],
  },
  {
    id: 2,
    type: 'multi',
    question: '你听歌时最常出现的场景是？',
    hint: '可多选，选出你的日常',
    options: [
      { label: '通勤地铁/公交上（边挤边听）', scores: { wealth: 2, breakdown: 2, love: 1 } },
      { label: '加班/写作业时（当背景音）', scores: { wealth: 3, breakdown: 2, love: 1 } },
      { label: '深夜躺床上（关灯戴耳机）', scores: { wealth: 1, breakdown: 3, love: 3 } },
      { label: '洗澡时（花洒当麦克风）', scores: { wealth: 1, breakdown: 1, love: 2 } },
      { label: '跑步/健身时（假装燃脂主角）', scores: { wealth: 2, breakdown: 1, love: 1 } },
      { label: '做饭/洗碗时（厨房夜店）', scores: { wealth: 1, breakdown: 1, love: 2 } },
      { label: '蹲坑时（手机外放）', scores: { wealth: 0, breakdown: 2, love: 0 } },
    ],
  },
  {
    id: 3,
    type: 'multi',
    question: '你在什么情况下会把耳机音量调到最大？',
    hint: '可多选，你的耳朵还好吗',
    options: [
      { label: '写周报/PPT时（战歌起）', scores: { wealth: 3, breakdown: 2, love: 1 } },
      { label: '挤地铁被踩时（压制杀意）', scores: { wealth: 1, breakdown: 3, love: 0 } },
      { label: '深夜emo（震聋自己）', scores: { wealth: 0, breakdown: 3, love: 3 } },
      { label: '听到神级前奏（身体自动旋转）', scores: { wealth: 1, breakdown: 1, love: 2 } },
      { label: '跑步最后一公里（虚假肾上腺素）', scores: { wealth: 2, breakdown: 1, love: 1 } },
      { label: '永远不会调最大（惜命）', scores: { wealth: 2, breakdown: 0, love: 1 } },
      { label: '调最大是因为耳机太烂', scores: { wealth: 1, breakdown: 2, love: 1 } },
    ],
  },
  {
    id: 4,
    type: 'single',
    question: '你在一家咖啡馆听到背景音乐突然放了一首你"红心"过的歌，你的第一反应是？',
    hint: '单选，选出你最真实的反应',
    options: [
      { label: '手机识曲，给咖啡馆五星好评', scores: { wealth: 2, breakdown: 1, love: 2 } },
      { label: '联想到前任/暗恋，当场呆住', scores: { wealth: 1, breakdown: 3, love: 3 } },
      { label: '小声哼唱，期待邻座接唱', scores: { wealth: 1, breakdown: 1, love: 2 } },
      { label: '拍咖啡杯发朋友圈"懂的都懂"', scores: { wealth: 2, breakdown: 2, love: 2 } },
      { label: '内心狂喜，结账时问店员歌单', scores: { wealth: 2, breakdown: 1, love: 2 } },
      { label: '觉得俗，切到自己耳机冷门版', scores: { wealth: 1, breakdown: 2, love: 1 } },
      { label: '录环境音，准备做采样', scores: { wealth: 3, breakdown: 1, love: 1 } },
      { label: '没反应（耳机里放着别的歌）', scores: { wealth: 1, breakdown: 1, love: 0 } },
      { label: '站起来大喊"谁放的！"（被请出去）', scores: { wealth: 0, breakdown: 3, love: 2 } },
    ],
  },
  {
    id: 5,
    type: 'multi',
    question: '哪些情况会导致你把同一首歌连续听50遍以上？',
    hint: '可多选，你的循环播放DNA',
    options: [
      { label: '刚分手/暗恋失败（歌词像自传）', scores: { wealth: 1, breakdown: 3, love: 3 } },
      { label: '考试/工作压力大（精神麻醉剂）', scores: { wealth: 3, breakdown: 2, love: 1 } },
      { label: '发现冷门神曲（全世界只有我懂）', scores: { wealth: 2, breakdown: 1, love: 2 } },
      { label: '土味上头hook（脑子被绑架）', scores: { wealth: 1, breakdown: 2, love: 1 } },
      { label: '根本不会听50遍（两遍就腻）', scores: { wealth: 2, breakdown: 0, love: 1 } },
      { label: '正在学这首歌准备表演', scores: { wealth: 2, breakdown: 1, love: 2 } },
      { label: '喝多了醒来发现已循环200遍', scores: { wealth: 1, breakdown: 3, love: 2 } },
    ],
  },
];

const roasts = [
  '你的歌单像一锅乱炖——啥都有，但火候全看心情。',
  '听歌品味这么多元化，小心人格分裂哦～',
  '从你的选项来看，你是个被工作耽误的DJ。',
  '你的音乐人格测试结果：表面冷静，内心早已蹦迪。',
  '建议你把歌单投稿给网易云官方，标题就叫《精神状态不稳定实录》。',
  '听歌场景横跨厕所到健身房，你的生活比你的歌单还精彩。',
  '从你选的歌曲类型来看，你大概率是个"我什么都能听，但都有点嫌弃"的人。',
];

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const songs = location.state?.songs || [];
  const nickname = location.state?.nickname || '';
  const playlistText = location.state?.playlistText || '';

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[current];
  const selected = answers[current] || (question.type === 'multi' ? [] : '');

  const toggleMulti = (idx) => {
    setAnswers((prev) => {
      const list = [...(prev[current] || [])];
      const i = list.indexOf(idx);
      i === -1 ? list.push(idx) : list.splice(i, 1);
      return { ...prev, [current]: list };
    });
  };

  const selectSingle = (idx) => {
    setAnswers((prev) => ({ ...prev, [current]: idx }));
  };

  const isSelected = (idx) => {
    if (question.type === 'multi') return selected.includes(idx);
    return selected === idx;
  };

  const canNext = question.type === 'multi' ? selected.length > 0 : selected !== '';

  const handleNext = () => {
    if (!canNext) return;
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      const q2 = (answers[1] || []).map(i => String.fromCharCode(65 + i));
      const q5 = (answers[4] || []).map(i => String.fromCharCode(65 + i));
      const q4Idx = answers[3];
      const q4 = q4Idx !== undefined ? String.fromCharCode(65 + q4Idx) : '';

      const style = analyzePlaylistStyle(playlistText);
      const scores = computeScores(q2, q5, q4, {
        incomeOffset: style.incomeOffset,
        crashOffset: style.crashOffset,
        loveOffset: style.loveOffset,
      });
      const { incomeText, crashText, loveText, incomeDesc, crashDesc, loveDesc } = getResultTexts(scores.income, scores.crash, scores.love);
      const finalQuote = getRandomQuote(style.comment);

      navigate('/analysis', { state: { incomeText, crashText, loveText, incomeDesc, crashDesc, loveDesc, finalQuote, songs, nickname, playlistText } });
    }
  };

  const progressPercent = ((current + 1) / questions.length) * 100;

  return (
    <div className={styles.frame6}>
      <div className={styles.container} />
      <div className={styles.frame2}>
        <div className={styles.aStatusBarTime}>
          <p className={styles.aTime}>9:41</p>
        </div>
        <div className={styles.signalWifiBattery}>
          <img src="/assets/mq0689hc-adnnwdo.svg" className={styles.iconMobileSignal} alt="" />
          <img src="/assets/mq0689hc-pjxumio.svg" className={styles.wifi} alt="" />
          <img src="/assets/mq0689hc-qss037y.svg" className={styles.aStatusBarBattery} alt="" />
        </div>
        <div className={styles.frame} />
      </div>
      <div className={styles.container9}>
        <div className={styles.button} onClick={() => navigate('/import', { state: { songs, nickname } })}>
          <img src="/assets/mq0689hc-5ffylaq.svg" className={styles.icon} alt="" />
        </div>
        <div className={styles.progressBar}>
          <div className={styles.container2}>
            <div className={styles.text}>
              <p className={styles.questionnaire}>Questionnaire</p>
            </div>
            <div className={styles.text5}>
              <p className={styles.text4}>
                <span className={styles.text2}>第&nbsp;</span>
                <span className={styles.text3}>{current + 1}</span>
                <span className={styles.text2}>&nbsp;/ {questions.length} 题</span>
              </p>
            </div>
          </div>
          <div className={styles.containerMargin}>
            <div className={styles.container4}>
              <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
        <div className={styles.container8}>
          <div className={styles.container7}>
            <div className={styles.inlineContent}>
              <div className={styles.container6}>
                <div className={styles.container5} />
                <div className={styles.text6}>
                  <p className={styles.q1}>Q{current + 1}</p>
                </div>
              </div>
            </div>
            <p className={styles.text7}>{question.question}</p>
            <p className={styles.text8}>{question.hint}</p>
            <div className={styles.chipOptions}>
              {question.options.map((opt, idx) => (
                <div
                  key={idx}
                  className={`${styles.optionChip} ${isSelected(idx) ? styles.optionSelected : ''}`}
                  onClick={() => question.type === 'multi' ? toggleMulti(idx) : selectSingle(idx)}
                >
                  <p className={styles.text9}>{opt.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.frame3}>
        <div className={styles.container10}>
          <img src="/assets/mq0689hc-tjnd61u.png" className={styles.icon2} alt="" />
        </div>
        <div className={styles.icon3}>
          <div className={styles.vector} />
        </div>
        <div className={styles.icon4}>
          <div className={styles.vector2} />
        </div>
        <img src="/assets/mq0689hc-e0mc9bj.png" className={styles.icon5} alt="" />
        <img src="/assets/mq0689hc-542xei3.png" className={styles.icon6} alt="" />
        <img src="/assets/mq0689hc-hw83dud.png" className={styles.icon7} alt="" />
        <div className={styles.vector5}>
          <div className={styles.vector3} />
          <div className={styles.vector4} />
        </div>
        <div className={styles.icon8}>
          <div className={styles.vector6} />
        </div>
        <img src="/assets/mq0689hc-0jcapk9.png" className={styles.icon9} alt="" />
        <img src="/assets/mq0689hc-gsyv9ah.png" className={styles.icon10} alt="" />
      </div>
      <div className={styles.container11}>
        <div
          className={`${styles.button5} ${current === 0 ? styles.buttonHidden : ''}`}
          onClick={() => current > 0 && setCurrent((c) => c - 1)}
        >
          <img src="/assets/mq0689hc-ginssxr.svg" className={styles.icon11} alt="" />
          <p className={styles.text10}>上一题</p>
        </div>
        <div
          className={`${styles.button6} ${canNext ? styles.buttonEnabled : styles.buttonDisabled}`}
          onClick={handleNext}
        >
          <p className={styles.text11}>{current < questions.length - 1 ? '下一题' : '查看结果'}</p>
          <img src="/assets/mq0689hc-ti9zvy8.svg" className={styles.icon11} alt="" />
        </div>
      </div>
      <div className={styles.frame4} />
      <div className={styles.frame5} />
      <div className={styles.group1}>
        <img src="/assets/mq0689hc-2ht4lkz.svg" className={styles.icon12} alt="" />
        <img src="/assets/mq0689hc-clugmdq.svg" className={styles.icon13} alt="" />
        <img src="/assets/mq0689hc-ori44u8.svg" className={styles.icon14} alt="" />
        <img src="/assets/mq0689hc-91ctes0.svg" className={styles.icon15} alt="" />
        <img src="/assets/mq0689hc-gbj9msg.svg" className={styles.icon16} alt="" />
      </div>
    </div>
  );
};

export default Quiz;