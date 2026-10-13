import type { ReactNode } from "react";
import { firm, telHref } from "@/config/firm";

/** Click-to-call link. Clicks are tracked globally as `click_to_call` (see ClickTracker). */
export function PhoneLink({
  location,
  className,
  children,
}: {
  /** Where the link sits, sent with the analytics event (e.g. "header", "footer", "hero"). */
  location: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={telHref} data-call-location={location} className={className}>
      {children ?? firm.phone.display}
    </a>
  );
}
