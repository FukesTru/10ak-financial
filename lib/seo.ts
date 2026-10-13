import type { Metadata } from "next";
import { firm } from "@/config/firm";
import { absoluteUrl } from "@/lib/site";
import { images, type ImageId } from "@/lib/images";
import { manifest } from "@/lib/image-manifest";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  imageId?: ImageId;
  noindex?: boolean;
};

export function ogImageFor(imageId?: ImageId): { url: string; alt: string } {
  if (imageId && manifest[imageId]?.og) {
    return { url: `/images/og/${images[imageId].file}.jpg`, alt: images[imageId].alt || firm.name };
  }
  return { url: "/og/default.jpg", alt: `${firm.name} logo` };
}

export function pageMetadata({ title, description, path, imageId, noindex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const og = ogImageFor(imageId);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: firm.name,
      title,
      description,
      locale: "en_US",
      images: [{ url: absoluteUrl(og.url), width: 1200, height: 630, alt: og.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(og.url)],
    },
  };
}
