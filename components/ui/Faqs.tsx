import type { Faq } from "@/content/types";
import { renderRich, resolveConditional } from "@/lib/rich-text";
import { FaqAccordion } from "./FaqAccordion";

/** Server wrapper: resolves rich text and config-driven appends, then renders the accordion. */
export function Faqs({ faqs, dark }: { faqs: Faq[]; dark?: boolean }) {
  const items = faqs.map((f) => {
    const extra = resolveConditional(f.append);
    return {
      q: f.q,
      a: (
        <p>
          {renderRich(f.a)}
          {extra && <> {renderRich(extra)}</>}
        </p>
      ),
    };
  });
  return <FaqAccordion items={items} dark={dark} />;
}
