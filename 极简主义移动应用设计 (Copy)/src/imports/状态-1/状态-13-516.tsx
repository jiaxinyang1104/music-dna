/* iPhone 15 Pro Max Status Bar — 状态 */
export default function StatusBarComponent() {
  const fontFamily = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif";

  return (
    <svg width="393" height="59" viewBox="0 0 393 59" fill="none" style={{ fontFamily }}>
      {/* Time — left side */}
      <text
        x="33"
        y="35"
        fill="white"
        fontSize="17"
        fontWeight="600"
        letterSpacing="-0.4"
        style={{ fontFamily }}
      >
        9:41
      </text>

      {/* Right side status icons */}
      <g transform="translate(276, 20)">
        {/* Cellular signal */}
        <rect x="0" y="9" width="2.5" height="4" rx="0.5" fill="white" opacity="0.9" />
        <rect x="4" y="7" width="2.5" height="6" rx="0.5" fill="white" opacity="0.9" />
        <rect x="8" y="4" width="2.5" height="9" rx="0.5" fill="white" opacity="0.9" />
        <rect x="12" y="2" width="2.5" height="11" rx="0.5" fill="white" opacity="0.9" />

        {/* WiFi */}
        <g transform="translate(25, 3)">
          <path
            d="M 7 10 Q 7 6, 10.5 3.5 Q 14 1, 17.5 3.5 Q 21 6, 21 10"
            stroke="white"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 10 10 Q 10 8, 12 7 Q 14 6, 16 7 Q 18 8, 18 10"
            stroke="white"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle cx="14" cy="11.5" r="1.5" fill="white" opacity="0.9" />
        </g>

        {/* Battery */}
        <g transform="translate(56, 3)">
          {/* Battery body */}
          <rect x="0" y="2" width="27" height="12" rx="3" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" />
          {/* Battery cap */}
          <rect x="27.5" y="5" width="1.5" height="6" rx="0.5" fill="white" opacity="0.5" />
          {/* Battery fill */}
          <rect x="2" y="4" width="21" height="8" rx="1.5" fill="white" opacity="0.95" />
        </g>
      </g>
    </svg>
  );
}
