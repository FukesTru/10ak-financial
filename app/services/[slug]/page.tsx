import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceBySlug, serviceSlugs, type ServiceSlug } from "@/config/services";
import { serviceContent } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/service/ServicePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const content = serviceContent[slug as ServiceSlug];
  if (!content) return {};
  return pageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: `/services/${slug}`,
    imageId: serviceBySlug[slug as ServiceSlug].imageId,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const content = serviceContent[slug as ServiceSlug];
  if (!content) notFound();
  return <ServicePage content={content} />;
}
