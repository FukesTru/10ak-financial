import type { SVGProps } from "react";
import type { IconName } from "@/config/services";

/** 24×24 line icons drawn for this site (1.6 stroke, round caps). */
const PATHS: Record<IconName | UiIconName, string> = {
  // Services
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.6 5.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1ZM12 3v2M12 19v2M3 12h2M19 12h2",
  document: "M7 3h7l4 4v14H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v4h4M9.5 12h6M9.5 15.5h6M9.5 8.5h2.5",
  ledger: "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm0 13a3 3 0 0 1 3-3h11M9 7.5h6M9 10.5h4",
  gauge: "M4 17a8 8 0 1 1 16 0M12 17l3.5-5M8 17h8M6.6 11.4l1 .8M12 8.6V10M17.4 11.4l-1 .8",
  building: "M4 21V8l8-5 8 5v13M4 21h16M9 21v-5h6v5M8 10.5h1.5M14.5 10.5H16M8 13.5h1.5M14.5 13.5H16",
  pillar: "M4 9h16M5 9l7-5 7 5M6 9v9M10 9v9M14 9v9M18 9v9M4 18h16M3 21h18",
  ratio: "M4 20 20 4M7 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm10 10a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
  shield: "M12 3 5 6v5.5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6l-7-3Zm-3 9 2.2 2.2L15.5 10",
  income: "M3 17c3 0 3-2 6-2s3 2 6 2 3-2 6-2M3 21c3 0 3-2 6-2s3 2 6 2 3-2 6-2M12 3v9M9 6.5c0-1.4 1.3-2 3-2s3 .6 3 2-1.3 1.8-3 2.2-3 .8-3 2.2 1.3 2 3 2 3-.6 3-2",
  umbrella: "M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Zm0 9v6.5a2.5 2.5 0 0 1-5 0M12 3v-.5",
  sprout: "M12 21v-9M12 12c0-4 2.5-6.5 7-6.5 0 4.5-2.5 6.5-7 6.5ZM12 14.5C12 11 10 9 5.5 9c0 4 2 5.5 6.5 5.5ZM7 21h10",
  home: "M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5M10 20v-5.5h4V20",
  keys: "M8.5 14a4.5 4.5 0 1 1 4.3-5.9L21 8v3.5h-2.5V14H16v-2.5h-3.2A4.5 4.5 0 0 1 8.5 14Zm-1-4.5h.01",
  cap: "M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9ZM6.5 11v4.5c1.6 1.6 3.6 2.4 5.5 2.4s3.9-.8 5.5-2.4V11M21.5 9v5",
  // UI
  phone: "M5 4h3.2l1.6 4.2-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2L20 15.8V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z",
  mail: "M3.5 6h17v12h-17zM3.5 6.5 12 13l8.5-6.5",
  pin: "M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5V12l3 2",
  arrow: "M4 12h15M13.5 6.5 19 12l-5.5 5.5",
  chevron: "m6 9 6 6 6-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  check: "m5 12.5 4.5 4.5L19 7.5",
  plus: "M12 5v14M5 12h14",
  info: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 8v5.5M12 7.6v.4",
  calendar: "M4.5 6h15v14h-15zM4.5 10h15M8.5 3.5V7M15.5 3.5V7",
  video: "M3.5 7h11v10h-11zM14.5 10.5l6-3.5v10l-6-3.5",
  lock: "M6 11h12v9.5H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
};

export type UiIconName =
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "arrow"
  | "chevron"
  | "menu"
  | "close"
  | "check"
  | "plus"
  | "info"
  | "calendar"
  | "video"
  | "lock";

type Props = SVGProps<SVGSVGElement> & { name: IconName | UiIconName; size?: number };

export function Icon({ name, size = 24, strokeWidth = 1.6, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
