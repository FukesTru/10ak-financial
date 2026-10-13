import { detail, type LicenseKey } from "@/config/firm";

const LABELS: Record<LicenseKey, string> = {
  taxCredential: "Tax credential",
  insuranceLicense: "Insurance license",
  mortgageLicense: "Mortgage licensing",
  securitiesRegistration: "Securities / advisory registration",
};

/** Config-driven licensing lines. Renders nothing until at least one value is confirmed in /config/firm.ts. */
export function LicenseDisclosure({ keys, dark }: { keys: LicenseKey[]; dark?: boolean }) {
  const items = keys.map((k) => ({ key: k, value: detail(k) })).filter((i) => i.value);
  if (!items.length) return null;
  const mortgage = items.some((i) => i.key === "mortgageLicense");
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${dark ? "border-white/15 text-white/70" : "border-mist bg-white text-slate"}`}>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.key}>
            <span className="font-semibold">{LABELS[i.key]}:</span> {i.value}
          </li>
        ))}
      </ul>
      {mortgage && <p className="mt-2">Equal Housing Opportunity.</p>}
    </div>
  );
}
