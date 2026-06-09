import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.aStatusBarTime}>
        <p className={styles.aTime}>9:41</p>
      </div>
      <div className={styles.signalWifiBattery}>
        <img
          src="../image/mq06jguv-yyds98h.svg"
          className={styles.iconMobileSignal}
        />
        <img src="../image/mq06jguv-dg1lrsc.svg" className={styles.wifi} />
        <img
          src="../image/mq06jguv-2axtvnx.svg"
          className={styles.aStatusBarBattery}
        />
      </div>
    </div>
  );
}

export default Component;
