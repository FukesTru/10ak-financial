import { firm, telHref } from "@/config/firm";
import { Icon } from "@/components/ui/Icon";

/** Floating "Call Now" button on mobile and tablet (every page). */
export function FloatingCall() {
  return (
    <a
      href={telHref}
      data-call-location="floating-button"
      aria-label={`Call ${firm.name} at ${firm.phone.display}`}
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-champagne bg-burgundy px-5 font-semibold text-white shadow-[0_10px_30px_-8px_rgb(10_22_51/0.6)] hover:bg-burgundy-dark lg:hidden"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <Icon name="phone" size={20} />
      Call Now
    </a>
  );
}
