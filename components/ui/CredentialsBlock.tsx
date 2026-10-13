import { detail, firm, confirmed, type LicenseKey } from "@/config/firm";

const LICENSE_LABELS: Record<LicenseKey, string> = {
  taxCredential: "Tax credential",
  insuranceLicense: "Insurance (life & annuities)",
  mortgageLicense: "Mortgage lending",
  securitiesRegistration: "Securities / investment advisory",
};

/** Lists confirmed credentials and licenses from config; returns null when nothing is confirmed. */
export function credentialItems(): { label: string; value: string }[] {
  const owner = [
    { label: "Professional designations", value: confirmed(firm.owner.credentials) },
    { label: "Experience", value: confirmed(firm.owner.yearsExperience) },
    { label: "Education", value: confirmed(firm.owner.education) },
  ];
  const licenses = (Object.keys(firm.licenses) as LicenseKey[]).map((k) => ({ label: LICENSE_LABELS[k], value: detail(k) }));
  return [...owner, ...licenses].filter((i): i is { label: string; value: string } => Boolean(i.value));
}

export function CredentialsList({ dark }: { dark?: boolean }) {
  const items = credentialItems();
  if (!items.length) return null;
  return (
    <dl className="mt-8 grid gap-4 sm:grid-cols-2">
      {items.map((i) => (
        <div key={i.label} className={`rounded-xl border p-5 ${dark ? "border-white/15 bg-white/5" : "border-mist bg-white"}`}>
          <dt className={`eyebrow ${dark ? "text-champagne" : "text-burgundy"}`}>{i.label}</dt>
          <dd className={`mt-2 ${dark ? "text-white" : "text-ink"}`}>{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
