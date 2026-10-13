import manifestJson from "./image-manifest.json";
import type { ImageId } from "./images";

export type ManifestEntry = {
  file: string;
  /** Widths available for the native aspect (16:9 or 4:3). */
  widths: number[];
  width: number;
  height: number;
  /** 4:3 card crop widths (only for 16:9 images). */
  cardWidths?: number[];
  /** 1200×630 social image exists at /images/og/<file>.jpg. */
  og?: boolean;
  /** Average color, used as the loading background. */
  color?: string;
};

export type ClientPhotoEntry = {
  /** 4:5 crops at /images/client/<name>-<w>.(webp|jpg) */
  widths: number[];
  color?: string;
};

type Manifest = {
  images: Partial<Record<ImageId, ManifestEntry>>;
  clientPhotos: Record<string, ClientPhotoEntry>;
};

const data = manifestJson as unknown as Manifest;

export const manifest = data.images;
export const clientPhotos = data.clientPhotos;
