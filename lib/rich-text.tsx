import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { detail, type DetailKey } from "@/config/firm";
import type { ConditionalText, RichText as RichTextString } from "@/content/types";

const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

/** Renders the two supported inline markups: [text](/path) and **bold**. */
export function renderRich(text: RichTextString, linkClass = "link-body"): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <Link key={i} href={link[2]} className={linkClass}>
          {link[1]}
        </Link>
      );
    }
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={i} className="font-semibold">{bold[1]}</strong>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Rich({ text, className }: { text: RichTextString; className?: string }) {
  return <span className={className}>{renderRich(text)}</span>;
}

/** Returns the conditional sentence with {value} filled in, or null if the config value is not confirmed. */
export function resolveConditional(c?: ConditionalText | null): string | null {
  if (!c) return null;
  const value = detail(c.requires as DetailKey);
  if (!value) return null;
  return c.text.replaceAll("{value}", value);
}

/** Plain text (markup stripped) for schema and meta. */
export function plain(text: RichTextString): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
}
