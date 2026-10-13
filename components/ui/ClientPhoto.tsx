import { clientPhotos } from "@/lib/image-manifest";
import { LeafMark } from "@/components/brand/Logo";

/**
 * A client-supplied photo from /public/client-photos (processed by `npm run images`).
 * Until it is uploaded, a branded 4:5 placeholder renders with data-todo="CLIENT-PHOTO:<name>".
 */
export function ClientPhoto({
  name,
  alt,
  sizes = "(min-width: 1024px) 420px, 90vw",
  className = "",
  caption,
}: {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  /** Shown inside the placeholder only (e.g. the person's name and title). */
  caption?: string;
}) {
  const entry = clientPhotos[name];
  if (!entry) {
    return (
      <div
        data-todo={`CLIENT-PHOTO:${name}`}
        role="img"
        aria-label={alt}
        className={`img-placeholder relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-2xl text-champagne ${className}`}
      >
        <LeafMark className="h-24 w-24 opacity-90" strokeWidth={1.2} />
        {caption && <p className="mt-5 px-6 text-center font-display text-xl text-white/90">{caption}</p>}
      </div>
    );
  }
  const largest = entry.widths[entry.widths.length - 1];
  const set = (ext: string) => entry.widths.map((w) => `/images/client/${name}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture className={`block overflow-hidden rounded-2xl ${className}`} style={entry.color ? { backgroundColor: entry.color } : undefined}>
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/images/client/${name}-${largest}.jpg`}
        srcSet={set("jpg")}
        sizes={sizes}
        width={largest}
        height={Math.round((largest * 5) / 4)}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] h-full w-full object-cover"
      />
    </picture>
  );
}
