import Link from "next/link";

/** Short plain-English general-information line shown near every service CTA. */
export function Disclaimer({ topic, dark }: { topic?: string; dark?: boolean }) {
  return (
    <p className={`text-sm leading-relaxed ${dark ? "text-white/65" : "text-slate"}`}>
      {topic ? `This page is general information about ${topic}` : "This is general information"}, not tax, legal or
      investment advice, and no particular result is promised. Advice depends on your full situation and begins only under a
      signed engagement.{" "}
      <Link href="/privacy-disclosures#disclosures" className={dark ? "underline hover:text-white" : "link-body"}>
        Read our disclosures
      </Link>
      .
    </p>
  );
}
