/**
 * SandwormMark — the Sandworm design-system brand mark.
 * Worm breaching the dune horizon, warm-hero gradient (sand-300 -> red-400 -> violet-600).
 * Source asset: scratch/design-lab/san-juan-library/assets/sandworm-mark.svg
 */
export function SandwormMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Sandworm"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sandworm-mark-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#ffb370" />
          <stop offset="0.5" stopColor="#f9808a" />
          <stop offset="1" stopColor="#6242e0" />
        </linearGradient>
      </defs>
      <path
        d="M2 22.5h28"
        fill="none"
        stroke="#ffb370"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 22.5C8 9.5 24 9.5 24 22.5"
        fill="none"
        stroke="url(#sandworm-mark-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
