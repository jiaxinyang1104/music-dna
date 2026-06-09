/* Vinyl record component — 黑胶 */
export default function VinylHejiao() {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
      {/* Outer rim */}
      <circle cx="55" cy="55" r="54" fill="#1A1C28" stroke="#2A2D3A" strokeWidth="0.5" />

      {/* Grooves */}
      <circle cx="55" cy="55" r="48" fill="none" stroke="#0F1118" strokeWidth="0.6" opacity="0.5" />
      <circle cx="55" cy="55" r="44" fill="none" stroke="#0F1118" strokeWidth="0.5" opacity="0.4" />
      <circle cx="55" cy="55" r="40" fill="none" stroke="#0F1118" strokeWidth="0.5" opacity="0.4" />
      <circle cx="55" cy="55" r="36" fill="none" stroke="#0F1118" strokeWidth="0.4" opacity="0.3" />
      <circle cx="55" cy="55" r="32" fill="none" stroke="#0F1118" strokeWidth="0.4" opacity="0.3" />

      {/* Label area */}
      <circle cx="55" cy="55" r="22" fill="#0A0B14" />
      <circle cx="55" cy="55" r="22" fill="none" stroke="rgba(77,217,208,0.15)" strokeWidth="0.5" />

      {/* Center hole */}
      <circle cx="55" cy="55" r="8" fill="#060710" />
      <circle cx="55" cy="55" r="8" fill="none" stroke="rgba(77,217,208,0.3)" strokeWidth="0.8" />

      {/* Subtle highlight arc */}
      <path
        d="M 75 30 A 30 30 0 0 1 85 55"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
