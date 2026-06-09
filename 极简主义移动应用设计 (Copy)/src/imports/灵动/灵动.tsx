/* iPhone 15 Pro Max Dynamic Island — 灵动岛 */
export default function DynamicIslandComponent() {
  return (
    <svg width="125" height="37" viewBox="0 0 125 37" fill="none">
      {/* Dynamic Island pill shape */}
      <rect
        x="0"
        y="0"
        width="125"
        height="37"
        rx="18.5"
        fill="#000000"
      />

      {/* Subtle inner glow */}
      <rect
        x="1"
        y="1"
        width="123"
        height="35"
        rx="17.5"
        fill="url(#island-glow)"
        opacity="0.15"
      />

      {/* Camera lens */}
      <circle cx="35" cy="18.5" r="5.5" fill="#0A1020" />
      <circle cx="35" cy="18.5" r="4" fill="#0F1828" />
      <circle cx="36" cy="17.5" r="1.2" fill="rgba(77,217,208,0.3)" />

      {/* Face ID sensor area */}
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
