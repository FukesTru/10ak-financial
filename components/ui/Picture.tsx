import { preload } from "react-dom";
import { images, type ImageId } from "@/lib/images";
import { manifest } from "@/lib/image-manifest";

type Props = {
  id: ImageId;
  /** "native" uses the image's own aspect; "card" uses the 4:3 crop of a 16:9 hero. */
  variant?: "native" | "card";
  sizes: string;
  /** Above-the-fold hero: eager + high fetch priority + preload. Everything else lazy-loads. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  alt?: string;
};

const src = (file: string, w: number, ext: "webp" | "jpg", suffix = "") => `/images/${file}${suffix}-${w}.${ext}`;

/**
 * WebP with JPEG fallback, responsive widths, lazy by default.
 * When an image has not been generated yet it renders a navy-gradient placeholder
 * flagged with data-todo="IMG-XX" (listed in PRELAUNCH_CHECKLIST.md).
 */
export function Picture({ id, variant = "native", sizes, priority, className = "", imgClassName = "", alt }: Props) {
  const entry = manifest[id];
  const meta = images[id];
  const altText = alt ?? meta.alt;
  const useCard = variant === "card" && meta.aspect === "16:9";
  const widths = entry ? (useCard ? entry.cardWidths : entry.widths) : undefined;

  if (!entry || !widths?.length) {
    return (
      <div
        data-todo={id}
        role={altText ? "img" : undefined}
        aria-label={altText || undefined}
        aria-hidden={altText ? undefined : true}
        className={`img-placeholder ${className}`}
      />
    );
  }

  const suffix = useCard ? "-card" : "";
  const largest = widths[widths.length - 1];
  const ratio = useCard || meta.aspect === "4:3" ? 3 / 4 : 9 / 16;
  const webpSet = widths.map((w) => `${src(entry.file, w, "webp", suffix)} ${w}w`).join(", ");
  const jpgSet = widths.map((w) => `${src(entry.file, w, "jpg", suffix)} ${w}w`).join(", ");

  if (priority) {
    preload(src(entry.file, widths[Math.min(1, widths.length - 1)], "webp", suffix), {
      as: "image",
      imageSrcSet: webpSet,
      imageSizes: sizes,
      fetchPriority: "high",
      type: "image/webp",
    });
  }

  return (
    <picture className={className} style={entry.color ? { backgroundColor: entry.color } : undefined}>
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      <img
        src={src(entry.file, largest, "jpg", suffix)}
        srcSet={jpgSet}
        sizes={sizes}
        width={largest}
        height={Math.round(largest * ratio)}
        alt={altText}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={imgClassName}
      />
    </picture>
  );
}
