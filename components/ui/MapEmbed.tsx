import { firm, fullAddress, mapsEmbedUrl, mapsLinkUrl } from "@/config/firm";

/** Lazy-loaded Google Map of the Monrovia office. */
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-mist bg-white shadow-card ${className}`}>
      <iframe
        title={`Map showing the ${firm.name} office at ${fullAddress}`}
        src={mapsEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[340px] w-full border-0 sm:h-[400px]"
      />
      <p className="px-5 py-3 text-sm text-slate">
        {fullAddress} ·{" "}
        <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer" className="link-body">
          Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
