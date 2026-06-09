import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import styles from './ShareModal.module.scss';

const ShareModal = ({ nickname, incomeText, crashText, loveText, incomeDesc, crashDesc, loveDesc, finalQuote, onClose }) => {
  const cardRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#080a1a',
        allowTaint: false,
      });
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('截图生成失败');

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${nickname}的音乐基因检测报告.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('保存失败', e);
    } finally {
      setSaving(false);
    }
  };

  const shortDesc = (text) => {
    if (!text) return text;
    const match = text.match(/^.*?[。！？]/);
    if (match) return match[0];
    if (text.length <= 30) return text;
    return text.slice(0, 30) + '…';
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.cardWrapper} ref={cardRef}>
          <div className={styles.cardBg} />

          <div className={styles.cardContent}>
            <p className={styles.cardLabel}>Music DNA Report</p>
            <p className={styles.cardTitle}>{nickname} 的音乐基因检测报告</p>

            <div className={styles.divider} />

            <div className={styles.results}>
              <div className={styles.resultItem}>
                <p className={styles.resultIcon}>💰</p>
                <p className={styles.resultLabel}>财富曲线</p>
                <p className={styles.resultValue}>{incomeText}</p>
                <p className={styles.resultDesc}>{shortDesc(incomeDesc)}</p>
              </div>

              <div className={styles.resultItem}>
                <p className={styles.resultIcon}>⛈️</p>
                <p className={styles.resultLabel}>崩溃预警</p>
                <p className={styles.resultValue}>{crashText}</p>
                <p className={styles.resultDesc}>{shortDesc(crashDesc)}</p>
              </div>

              <div className={styles.resultItem}>
                <p className={styles.resultIcon}>💕</p>
                <p className={styles.resultLabel}>恋爱节奏</p>
                <p className={styles.resultValue}>{loveText}</p>
                <p className={styles.resultDesc}>{shortDesc(loveDesc)}</p>
              </div>
            </div>

            <div className={styles.divider} />

            <p className={styles.cardFooter}>歌单仅在本地分析，不上传服务器</p>
          </div>

          <div className={styles.deco1} />
          <div className={styles.deco2} />
          <div className={styles.deco3}>♪</div>
          <div className={styles.deco4}>♫</div>
        </div>

        <button
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? '生成中…' : '保存到相册'}
        </button>
      </div>
    </div>
  );
};

export default ShareModal;