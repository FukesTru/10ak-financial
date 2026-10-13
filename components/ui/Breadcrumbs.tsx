import Link from "next/link";

export type Crumb = { name: string; path: string };

/** Visual breadcrumb trail (BreadcrumbList schema is emitted by each page). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/75">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-white">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="underline-offset-4 hover:text-white hover:underline">
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-champagne">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
