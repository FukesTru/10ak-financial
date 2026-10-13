import Link from "next/link";
import type { Service } from "@/config/services";
import { servicePath } from "@/config/services";
import { Icon } from "./Icon";
import { Picture } from "./Picture";

/** Service card: 4:3 image crop, icon, title, one-line benefit, "Learn more →". The whole card is one link. */
export function ServiceCard({ service, image = true, headingLevel = "h3" }: { service: Service; image?: boolean; headingLevel?: "h3" | "h4" }) {
  const H = headingLevel;
  return (
    <Link
      href={servicePath(service.slug)}
      className="lift group flex h-full flex-col overflow-hidden rounded-2xl border border-mist bg-white shadow-card"
    >
      {image && (
        <Picture
          id={service.imageId}
          variant="card"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="block aspect-[4/3] w-full overflow-hidden"
          imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          alt=""
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-burgundy ring-1 ring-champagne/60">
          <Icon name={service.icon} size={22} />
        </span>
        <H className="text-xl leading-snug text-midnight">{service.name}</H>
        <p className="mt-2 flex-1 text-[0.98rem] text-slate">{service.benefit}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-burgundy">
          Learn more <span className="sr-only">about {service.name}</span>
          <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </span>
      </div>
    </Link>
  );
}
