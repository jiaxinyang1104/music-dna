import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Analysis.module.scss';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif";
const BG = "#0A0B14";
const TEAL = "#4DD9D0";
const PINK = "#FF3B7A";

const MESSAGES = [
  "正在分析你的崩溃阈值…",
  "计算财富旋律…",
  "匹配恋爱节奏…",
  "加密你的歌单基因…",
  "校准你的玄学音区…",
  "解码你的情绪半衰期…",
];

function BgNote({ x, y, size = 1, color = TEAL, delay = 0, opacity = 0.22 }) {
  return (
    <motion.svg
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}
      width={22 * size} height={27 * size} viewBox="0 0 22 27" fill="none"
      animate={{ opacity: [opacity * 0.5, opacity, opacity * 0.5], y: [0, -10, 0] }}
      transition={{ duration: 4 + delay * 0.6, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <path d="M7 22C7 24.5 4.5 26 2.5 25C0.5 24 0.5 21 2.5 20C4.5 19 7 20.5 7 22Z"
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="7" y1="22" x2="7" y2="5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 5L20 2L20 13" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20C20 22.5 17.5 24 15.5 23C13.5 22 13.5 19 15.5 18C17.5 17 20 18.5 20 20Z"
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

function OrbitRing({ r, duration, color, dash, width = 1.2, reverse = false }) {
  const size = r * 2 + 4;
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      style={{
        position: "absolute", width: size, height: size,
        top: "50%", left: "50%", marginTop: -size / 2, marginLeft: -size / 2,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={width} strokeDasharray={dash} />
      </svg>
    </motion.div>
  );
}

function GlowPulse() {
  return (
    <motion.div
      animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.12, 0.35] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", width: 210, height: 210, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(77,217,208,0.28) 0%, transparent 70%)`,
        top: "50%", left: "50%", marginTop: -105, marginLeft: -105,
        pointerEvents: "none",
      }}
    />
  );
}

function BounceNote({ delay, color = TEAL, char = "♪" }) {
  return (
    <motion.span
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, delay, ease: [0.33, 1, 0.68, 1], repeatDelay: 0.15 }}
      style={{
        fontSize: 28, color, display: "inline-block",
        filter: `drop-shadow(0 0 8px ${color}99)`, lineHeight: 1,
      }}
    >
      {char}
    </motion.span>
  );
}

function VinylRecord() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
      <circle cx="55" cy="55" r="54" fill="#1A1C28" stroke="#2A2D3A" strokeWidth="0.5" />
      <circle cx="55" cy="55" r="48" fill="none" stroke="#0F1118" strokeWidth="0.6" opacity="0.5" />
      <circle cx="55" cy="55" r="44" fill="none" stroke="#0F1118" strokeWidth="0.5" opacity="0.4" />
      <circle cx="55" cy="55" r="40" fill="none" stroke="#0F1118" strokeWidth="0.5" opacity="0.4" />
      <circle cx="55" cy="55" r="36" fill="none" stroke="#0F1118" strokeWidth="0.4" opacity="0.3" />
      <circle cx="55" cy="55" r="32" fill="none" stroke="#0F1118" strokeWidth="0.4" opacity="0.3" />
      <circle cx="55" cy="55" r="22" fill="#0A0B14" />
      <circle cx="55" cy="55" r="22" fill="none" stroke="rgba(77,217,208,0.15)" strokeWidth="0.5" />
      <circle cx="55" cy="55" r="8" fill="#060710" />
      <circle cx="55" cy="55" r="8" fill="none" stroke="rgba(77,217,208,0.3)" strokeWidth="0.8" />
      <path d="M 75 30 A 30 30 0 0 1 85 55" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StatusBar({ time }) {
  return (
    <svg width="393" height="59" viewBox="0 0 393 59" fill="none" style={{ fontFamily: FF }}>
      <text x="33" y="35" fill="white" fontSize="17" fontWeight="600" letterSpacing="-0.4" style={{ fontFamily: FF }}>{time}</text>
      <g transform="translate(276, 20)">
        <rect x="0" y="9" width="2.5" height="4" rx="0.5" fill="white" opacity="0.9" />
        <rect x="4" y="7" width="2.5" height="6" rx="0.5" fill="white" opacity="0.9" />
        <rect x="8" y="4" width="2.5" height="9" rx="0.5" fill="white" opacity="0.9" />
        <rect x="12" y="2" width="2.5" height="11" rx="0.5" fill="white" opacity="0.9" />
        <g transform="translate(25, 3)">
          <path d="M 7 10 Q 7 6, 10.5 3.5 Q 14 1, 17.5 3.5 Q 21 6, 21 10" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M 10 10 Q 10 8, 12 7 Q 14 6, 16 7 Q 18 8, 18 10" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.9" />
          <circle cx="14" cy="11.5" r="1.5" fill="white" opacity="0.9" />
        </g>
        <g transform="translate(56, 3)">
          <rect x="0" y="2" width="27" height="12" rx="3" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" />
          <rect x="27.5" y="5" width="1.5" height="6" rx="0.5" fill="white" opacity="0.5" />
          <rect x="2" y="4" width="21" height="8" rx="1.5" fill="white" opacity="0.95" />
        </g>
      </g>
    </svg>
  );
}

function DynamicIsland() {
  return (
    <svg width="125" height="37" viewBox="0 0 125 37" fill="none">
      <rect x="0" y="0" width="125" height="37" rx="18.5" fill="#000000" />
      <rect x="1" y="1" width="123" height="35" rx="17.5" fill="url(#island-glow)" opacity="0.15" />
      <circle cx="35" cy="18.5" r="5.5" fill="#0A1020" />
      <circle cx="35" cy="18.5" r="4" fill="#0F1828" />
      <circle cx="36" cy="17.5" r="1.2" fill="rgba(77,217,208,0.3)" />
      <rect x="52" y="14" width="26" height="9" rx="4.5" fill="#0A0F1C" opacity="0.6" />
      <rect x="54" y="16" width="3" height="5" rx="1.5" fill="#1A2030" opacity="0.8" />
      <rect x="59" y="16" width="3" height="5" rx="1.5" fill="#1A2030" opacity="0.8" />
      <rect x="64" y="16" width="3" height="5" rx="1.5" fill="#1A2030" opacity="0.8" />
      <rect x="69" y="16" width="3" height="5" rx="1.5" fill="#1A2030" opacity="0.8" />
      <rect x="74" y="16" width="2" height="5" rx="1" fill="#1A2030" opacity="0.7" />
      <defs>
        <radialGradient id="island-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#4DD9D0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function DoneState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 72, height: 72, borderRadius: 24,
          background: "rgba(77,217,208,0.12)",
          border: `1.5px solid ${TEAL}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 28px rgba(77,217,208,0.4)`,
        }}
      >
        <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
          <path d="M2 13L11 22L30 2" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "white", fontSize: 20, fontWeight: 700, letterSpacing: -0.4, marginBottom: 6 }}>
          分析完成！
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
          正在跳转至你的音乐人格…
        </div>
      </div>
    </motion.div>
  );
}

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultState = location.state || {};

  useEffect(() => {
    if (!location.state?.incomeText) {
      navigate('/', { replace: true });
    }
  }, []);

  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  const currentTime = useCurrentTime();

  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIdx(i => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 350);
    }, 1400);
    return () => clearInterval(interval);
  }, [done]);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 5600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => {
        navigate('/report', { state: resultState });
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [done, navigate, resultState]);

  return (
    <div className={styles.frame}>
      <div style={{ width: '100%', maxWidth: 393, minHeight: '100dvh', height: 'auto', borderRadius: 55, background: BG, position: "relative", overflow: "hidden", paddingBottom: 10 }}>

        <div style={{ position: "absolute", top: -120, left: -80, width: 480, height: 420,
          background: "radial-gradient(ellipse at 45% 10%, rgba(25,55,200,0.42) 0%, rgba(10,20,80,0.18) 50%, transparent 75%)",
          filter: "blur(65px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 200, left: "50%", marginLeft: -200,
          width: 400, height: 400,
          background: `radial-gradient(circle, rgba(77,217,208,0.08) 0%, transparent 65%)`,
          filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: -40, width: 260, height: 240,
          background: "radial-gradient(ellipse, rgba(255,59,122,0.07) 0%, transparent 70%)",
          filter: "blur(35px)", pointerEvents: "none" }} />

        <BgNote x={18}  y={180} size={0.8}  color={TEAL}    delay={0}   opacity={0.22} />
        <BgNote x={340} y={200} size={0.6}  color="#5B8DEF" delay={1.4} opacity={0.2}  />
        <BgNote x={24}  y={650} size={0.65} color={TEAL}    delay={2.5} opacity={0.18} />
        <BgNote x={340} y={620} size={0.55} color={PINK}    delay={0.9} opacity={0.18} />
        <BgNote x={55}  y={740} size={0.5}  color="#5B8DEF" delay={3.2} opacity={0.16} />

        <div style={{ height: 59, position: "relative" }}>
          <StatusBar time={currentTime} />
          <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 125, height: 37 }}>
            <DynamicIsland />
          </div>
        </div>

        <div style={{ textAlign: "center", paddingTop: 24 }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10.5, letterSpacing: 2.4, textTransform: "uppercase", fontWeight: 600, fontFamily: FF }}>
            Music DNA Analysis
          </div>
          <div style={{ color: "rgba(255,255,255,0.22)", fontSize: 11, letterSpacing: 1.8, fontWeight: 400, marginTop: 4, fontFamily: FF }}>
            音乐 DNA 分析
          </div>
        </div>

        <div style={{
          position: "absolute", top: 59 + 55, bottom: 120, left: 0, right: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div style={{ position: "relative", width: 220, height: 220, marginBottom: 40 }}>
                  <GlowPulse />
                  <OrbitRing r={104} duration={22} color="rgba(77,217,208,0.12)" width={1} />
                  <OrbitRing r={90}  duration={16} color="rgba(77,217,208,0.2)"  width={1.2} reverse />
                  <OrbitRing r={74}  duration={11} color="rgba(77,217,208,0.35)" width={1.5} />
                  <OrbitRing r={58}  duration={8}  color="rgba(255,59,122,0.25)" width={1} reverse />
                  <div style={{ position: "absolute", width: 148, height: 148, top: "50%", left: "50%", marginTop: -74, marginLeft: -74, borderRadius: "50%", boxShadow: `0 0 0 1.5px rgba(77,217,208,0.45), 0 0 24px rgba(77,217,208,0.25)`, pointerEvents: "none" }} />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", top: "50%", left: "50%", marginTop: -55, marginLeft: -55, width: 110, height: 110 }}
                  >
                    <VinylRecord />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
                  >
                    <div style={{ position: "absolute", top: 4, left: "50%", marginLeft: -4, width: 8, height: 8, borderRadius: 4, background: TEAL, boxShadow: `0 0 10px ${TEAL}, 0 0 20px rgba(77,217,208,0.5)` }} />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", width: 148, height: 148, top: "50%", left: "50%", marginTop: -74, marginLeft: -74 }}
                  >
                    <div style={{ position: "absolute", top: 0, left: "50%", marginLeft: -3.5, width: 7, height: 7, borderRadius: 3.5, background: PINK, boxShadow: `0 0 10px ${PINK}, 0 0 18px rgba(255,59,122,0.5)` }} />
                  </motion.div>
                </div>

                <div style={{ display: "flex", gap: 24, alignItems: "flex-end", marginBottom: 36, height: 50 }}>
                  <BounceNote delay={0}    color={TEAL}  char="♪" />
                  <BounceNote delay={0.15} color="white" char="♫" />
                  <BounceNote delay={0.3}  color={PINK}  char="♪" />
                </div>

                <div style={{ textAlign: "center", marginBottom: 18 }}>
                  <div style={{ color: "white", fontSize: 20, fontWeight: 700, letterSpacing: -0.4, marginBottom: 4 }}>
                    正在分析你的音乐 DNA
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
                    请稍候，马上就好…
                  </div>
                </div>

                <div style={{ height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AnimatePresence mode="wait">
                    {visible && (
                      <motion.span
                        key={msgIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        style={{ color: PINK, fontSize: 14, letterSpacing: 0.1, fontWeight: 500, filter: `drop-shadow(0 0 8px rgba(255,59,122,0.65))` }}
                      >
                        {MESSAGES[msgIdx]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div style={{ display: "flex", gap: 7, marginTop: 32 }}>
                  {MESSAGES.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={i === msgIdx
                        ? { width: 20, background: TEAL, opacity: 1 }
                        : { width: 6, background: "rgba(255,255,255,0.2)", opacity: 0.6 }
                      }
                      transition={{ duration: 0.3 }}
                      style={{ height: 6, borderRadius: 3 }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="done">
                <DoneState />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ position: "absolute", bottom: 46, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
            <rect x="1" y="5" width="10" height="8" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
            <path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11.5, fontFamily: FF }}>
            歌单仅在本地分析，不上传服务器
          </span>
        </div>

        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, background: "rgba(255,255,255,0.22)", borderRadius: 3 }} />
      </div>
    </div>
  );
};

export default Analysis;