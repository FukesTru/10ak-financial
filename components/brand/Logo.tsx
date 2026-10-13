import { LEAF_PATHS, LOGO_HORIZONTAL } from "./logo-data";

type Props = {
  /** "dark" = white wordmark + champagne leaf for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
  title?: string;
};

/** Horizontal logo, inlined as outlines so it renders instantly without font loading. */
export function Logo({ tone = "dark", className, title = "1Oak Financial Group" }: Props) {
  const c =
    tone === "dark"
      ? { mark: "var(--champagne)", word: "#fff", tag: "var(--champagne)" }
      : { mark: "var(--burgundy)", word: "var(--midnight)", tag: "var(--burgundy)" };
  const { width, height, mark, word, tag } = LOGO_HORIZONTAL;
  const s = mark.size / 32;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform={`translate(${mark.x} ${mark.y}) scale(${s})`}
        fill="none"
        stroke={c.mark}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={LEAF_PATHS.outline} />
        <path d={LEAF_PATHS.midrib} />
        <path d={LEAF_PATHS.veins} strokeWidth={1.3} />
      </g>
      <path fill={c.word} d={word} />
      <path fill={c.tag} d={tag} />
    </svg>
  );
}

/** Leaf mark alone, used as a small decorative accent. */
export function LeafMark({ className, strokeWidth = 1.7 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d={LEAF_PATHS.outline} />
        <path d={LEAF_PATHS.midrib} />
        <path d={LEAF_PATHS.veins} strokeWidth={strokeWidth * 0.75} />
      </g>
    </svg>
  );
}
