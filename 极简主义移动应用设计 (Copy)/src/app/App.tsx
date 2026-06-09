import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import VinylHejiao from "../imports/黑胶/黑胶";
import StatusBarComponent from "../imports/状态-1/状态-13-516";
import DynamicIslandComponent from "../imports/灵动/灵动";

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif";
const BG = "#0A0B14";
const TEAL = "#4DD9D0";
const PINK = "#FF3B7A";  // neon pink — accent & carousel text

const MESSAGES = [
  "正在分析你的崩溃阈值…",
  "计算财富旋律…",
  "匹配恋爱节奏…",
  "加密你的歌单基因…",
  "校准你的玄学音区…",
  "解码你的情绪半衰期…",
];

/* ─── Floating background note ─── */
function BgNote({ x, y, size = 1, color = TEAL, delay = 0, opacity = 0.22 }: {
  x: number; y: number; size?: number; color?: string; delay?: number; opacity?: number;
}) {
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

/* ─── Orbiting ring ─── */
function OrbitRing({ r, duration, color, dash, width = 1.2, reverse = false }: {
  r: number; duration: number; color: string; dash?: string; width?: number; reverse?: boolean;
}) {
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

/* ─── Pulsing glow under the vinyl ─── */
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

/* ─── Bouncing ♪ note ─── */
function BounceNote({ delay, color = TEAL, char = "♪" }: {
  delay: number; color?: string; char?: string;
}) {
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

/* ─── Done state ─── */
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

/* ─── Main App ─── */
export default function App() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  /* Message carousel */
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

  /* Auto-complete */
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 5600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="size-full flex items-center justify-center"
      style={{ background: "#060710", fontFamily: FF }}>

      {/* Phone shell */}
      <div style={{
        width: 393, height: 852, borderRadius: 55, background: BG,
        position: "relative", overflow: "hidden",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 0 0 10px #13141F, 0 0 0 11px rgba(255,255,255,0.04), 0 60px 120px rgba(0,0,0,0.9)",
      }}>

        {/* ── Ambient glows ── */}
        <div style={{
          position: "absolute", top: -120, left: -80, width: 480, height: 420,
          background: "radial-gradient(ellipse at 45% 10%, rgba(25,55,200,0.42) 0%, rgba(10,20,80,0.18) 50%, transparent 75%)",
          filter: "blur(65px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 200, left: "50%", marginLeft: -200,
          width: 400, height: 400,
          background: `radial-gradient(circle, rgba(77,217,208,0.08) 0%, transparent 65%)`,
          filter: "blur(40px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: -40, width: 260, height: 240,
          background: "radial-gradient(ellipse, rgba(255,59,122,0.07) 0%, transparent 70%)",
          filter: "blur(35px)", pointerEvents: "none",
        }} />

        {/* ── Floating background notes ── */}
        <BgNote x={18}  y={180} size={0.8}  color={TEAL}    delay={0}   opacity={0.22} />
        <BgNote x={340} y={200} size={0.6}  color="#5B8DEF" delay={1.4} opacity={0.2}  />
        <BgNote x={24}  y={650} size={0.65} color={TEAL}    delay={2.5} opacity={0.18} />
        <BgNote x={340} y={620} size={0.55} color={PINK}    delay={0.9} opacity={0.18} />
        <BgNote x={55}  y={740} size={0.5}  color="#5B8DEF" delay={3.2} opacity={0.16} />

        {/* ── Status bar — 状态 component ── */}
        <div style={{ height: 59, position: "relative" }}>
          <StatusBarComponent />

          {/* Dynamic Island — 灵动 component overlaid on the center pill area */}
          <div style={{
            position: "absolute",
            top: 11,
            left: "50%",
            transform: "translateX(-50%)",
            width: 125,
            height: 37,
          }}>
            <DynamicIslandComponent />
          </div>
        </div>

        {/* ── Top label ── */}
        <div style={{ textAlign: "center", paddingTop: 24 }}>
          <div style={{
            color: "rgba(255,255,255,0.3)", fontSize: 10.5,
            letterSpacing: 2.4, textTransform: "uppercase",
            fontWeight: 600, fontFamily: FF,
          }}>
            Music DNA Analysis
          </div>
          <div style={{
            color: "rgba(255,255,255,0.22)", fontSize: 11,
            letterSpacing: 1.8, fontWeight: 400,
            marginTop: 4, fontFamily: FF,
          }}>
            音乐 DNA 分析
          </div>
        </div>

        {/* ── Central zone (vertically centered in remaining space) ── */}
        <div style={{
          position: "absolute",
          top: 59 + 55,
          bottom: 120,
          left: 0, right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
                {/* ── Orbital ring system + 黑胶 vinyl ── */}
                <div style={{ position: "relative", width: 220, height: 220, marginBottom: 40 }}>
                  <GlowPulse />

                  {/* Orbit rings — all solid */}
                  <OrbitRing r={104} duration={22} color="rgba(77,217,208,0.12)" width={1} />
                  <OrbitRing r={90}  duration={16} color="rgba(77,217,208,0.2)"  width={1.2} reverse />
                  <OrbitRing r={74}  duration={11} color="rgba(77,217,208,0.35)" width={1.5} />
                  <OrbitRing r={58}  duration={8}  color="rgba(255,59,122,0.25)" width={1} reverse />

                  {/* Glow border ring */}
                  <div style={{
                    position: "absolute", width: 148, height: 148,
                    top: "50%", left: "50%", marginTop: -74, marginLeft: -74,
                    borderRadius: "50%",
                    boxShadow: `0 0 0 1.5px rgba(77,217,208,0.45), 0 0 24px rgba(77,217,208,0.25)`,
                    pointerEvents: "none",
                  }} />

                  {/* 黑胶 vinyl — 110×110, spinning */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: "absolute",
                      top: "50%", left: "50%",
                      marginTop: -55, marginLeft: -55,
                      width: 110, height: 110,
                    }}
                  >
                    <VinylHejiao />
                  </motion.div>

                  {/* Teal orbiting dot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
                  >
                    <div style={{
                      position: "absolute", top: 4, left: "50%", marginLeft: -4,
                      width: 8, height: 8, borderRadius: 4, background: TEAL,
                      boxShadow: `0 0 10px ${TEAL}, 0 0 20px rgba(77,217,208,0.5)`,
                    }} />
                  </motion.div>

                  {/* Pink orbiting dot (reverse) */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: "absolute", width: 148, height: 148,
                      top: "50%", left: "50%", marginTop: -74, marginLeft: -74,
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 0, left: "50%", marginLeft: -3.5,
                      width: 7, height: 7, borderRadius: 3.5, background: PINK,
                      boxShadow: `0 0 10px ${PINK}, 0 0 18px rgba(255,59,122,0.5)`,
                    }} />
                  </motion.div>
                </div>

                {/* ── Three bouncing ♪ notes ── */}
                <div style={{ display: "flex", gap: 24, alignItems: "flex-end", marginBottom: 36, height: 50 }}>
                  <BounceNote delay={0}    color={TEAL}  char="♪" />
                  <BounceNote delay={0.15} color="white" char="♫" />
                  <BounceNote delay={0.3}  color={PINK}  char="♪" />
                </div>

                {/* ── Main heading ── */}
                <div style={{ textAlign: "center", marginBottom: 18 }}>
                  <div style={{ color: "white", fontSize: 20, fontWeight: 700, letterSpacing: -0.4, marginBottom: 4 }}>
                    正在分析你的音乐 DNA
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
                    请稍候，马上就好…
                  </div>
                </div>

                {/* ── Message carousel ── */}
                <div style={{ height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AnimatePresence mode="wait">
                    {visible && (
                      <motion.span
                        key={msgIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        style={{
                          color: PINK, fontSize: 14, letterSpacing: 0.1,
                          fontWeight: 500,
                          filter: `drop-shadow(0 0 8px rgba(255,59,122,0.65))`,
                        }}
                      >
                        {MESSAGES[msgIdx]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Progress dots ── */}
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

        {/* ── Bottom privacy note ── */}
        <div style={{
          position: "absolute", bottom: 46, left: 0, right: 0,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
            <rect x="1" y="5" width="10" height="8" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
            <path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11.5 }}>
            歌单仅在本地分析，不上传服务器
          </span>
        </div>

        {/* Home indicator */}
        <div style={{
          position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
          width: 134, height: 5, background: "rgba(255,255,255,0.22)", borderRadius: 3,
        }} />
      </div>
    </div>
  );
}
